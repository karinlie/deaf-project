from fastapi import FastAPI, UploadFile, File, Request
import tensorflow as tf
import numpy as np
import io
import librosa
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment
import whisper
import os
import whisper
import serial
import time
from fastapi import APIRouter
# from backend.yolo_backend_old import object_function, get_latest_detections
from yolo_backend import object_function, get_latest_detections

from fastapi.responses import JSONResponse
import json


print("Downloading Whisper-model...")
whisper_model = whisper.load_model("base")  
print("Whisper-model is loaded")


app = FastAPI()
router = APIRouter()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Eller ["http://localhost:5173"] for mer sikkerhet
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#writing to a csv file to save data
import csv
import os


log_file = "detection_log.csv"
if not os.path.exists(log_file):
    with open(log_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["timestamp", "worker_x", "center_x", "confidence", "note"])



arduino_port = "COM4"  #the port arduino is connected to
baud_rate = 9600  #needs to match the code in arduino

try:
    arduino = serial.Serial(arduino_port, baud_rate, timeout=1)
    time.sleep(2)  
    print("Arduino is connected!")
except Exception as e:
    print(f"Something went wrong with the connection to Arduino: {e}")


@app.post("/vibrate")
async def vibrate(request: Request):
    if not arduino:
        return JSONResponse(status_code=500, content={"message": "Arduino not connected."})

    data = await request.json()
    command = data.get("command")

    if command == "1":
        arduino.write(b'1')
        return {"message": "🔊 Left vibration sent"}
    elif command == "2":
        arduino.write(b'2')
        return {"message": "🔊 Right vibration sent"}
    else:
        return JSONResponse(status_code=400, content={"message": "❌ Invalid command. Use '1' or '2'."})


@app.get("/detection/")
async def detect_objects():
    result = get_latest_detections()
    detections = result.get("detections", [])
    worker_x = result.get("worker_x")
    timestamp = result.get("timestamp")

    print("📸 YOLO Resultat:", detections)

    #ignore if worker does not exist yet
    if worker_x is None:
        return JSONResponse(content={
            "movement_alert": False,
            "status": "Arbeiderposisjon ikke tilgjengelig – ArUco ikke funnet.",
            "timestamp": timestamp
        })

    #how close the worker should be
    WORKER_IGNORE_MARGIN = 10

    for detection in detections:
        if detection["object"] == "human":
            confidence = detection["confidence"]
            bbox = detection["bbox"][0]
            x1, y1, x2, y2 = bbox
            center_x = (x1 + x2) / 2

            print(f"👤 Worker oppdaget midt på x = {worker_x:.2f}, person oppdaget på x ={center_x:.2f} ")

            note = "ignored (worker)" if abs(center_x - worker_x) < WORKER_IGNORE_MARGIN else "triggered"
            with open(log_file, mode='a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([timestamp, round(worker_x, 2), round(center_x, 2), round(confidence, 2), note])

            #ingoring the worker as a human
            if abs(center_x - worker_x) < WORKER_IGNORE_MARGIN:
                print("🙅‍♂️ Ignorerer arbeider (for nær ArUco-posisjon)")
                continue

            #sending vibration for the position
            if int(center_x) < int(worker_x):
                print("🔊 Person til VENSTRE – sender 'V1'")
                arduino.write(b'1')
                position = "left"
            else:
                print("🔊 Person til HØYRE – sender 'V2'")
                arduino.write(b'2')
                position = "right"

            return JSONResponse(content={
                "movement_alert": True,
                "status": "Menneske detektert og vibrasjon sendt!",
                "confidence": confidence,
                "position": position,
                "timestamp": timestamp
            })

    return JSONResponse(content={
        "movement_alert": False,
        "status": "Bare arbeideren detektert – ingen vibrasjon sendt.",
        "timestamp": timestamp
    })

# @app.get("/detection/")
# async def detect_objects():
#     result = get_latest_detections()
#     detections = result.get("detections", [])

#     print("📸 YOLO Resultat:", detections)

#     for detection in detections:
#         if detection["object"] == "human":
#             confidence = detection["confidence"]
#             bbox = detection["bbox"][0]  # Vi tar bare én boks for nå
#             x1, y1, x2, y2 = bbox
#             center_x = (x1 + x2) / 2

#             print(f"👤 Person oppdaget midt på x = {center_x:.2f}")

#             if center_x < 320:
#                 print("🔊 Person til VENSTRE – sender 'V1'")
#                 arduino.write(b'1')  # Venstre vibrasjon
#             else:
#                 print("🔊 Person til HØYRE – sender 'V2'")
#                 arduino.write(b'2')  # Høyre vibrasjon

#             return JSONResponse(content={
#                 "movement_alert": True,
#                 "status": "Menneske detektert og rett vibrasjon aktivert!",
#                 "confidence": confidence,
#                 "position": "left" if center_x < 320 else "right",
#                 "timestamp": result.get("timestamp")
#             })

#     return JSONResponse(content={
#         "movement_alert": False,
#         "status": "Ingen mennesker detektert.",
#         "timestamp": result.get("timestamp")
#     })




@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Make "temp/" folder if it does not exist
        os.makedirs("temp", exist_ok=True)

        file_location = f"temp/{file.filename}"
        
        #save the file
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())

        print(f"File saved: {file_location}")

        
        result = whisper_model.transcribe(file_location)
        transcription = result["text"]

        print(f"Transcribed text: {transcription}")

        return {"text": transcription}

    except Exception as e:
        print(f"⚠️ FEIL: {str(e)}")
        return {"error": str(e)}


