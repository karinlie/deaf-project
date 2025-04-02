
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import cv2
import json
import threading
import time



# ✅ YOLO-modellen
model = YOLO('yolo11m.pt')

# ✅ Variabel for å lagre siste deteksjoner
latest_detections = {"detections": []}

def object_function():
    """🚀 Kjør YOLO på kameraet og oppdater `latest_detections` med JSON-data."""
    print("🔄 Starter YOLO object_function()...")

    # cap = cv2.VideoCapture(0)  # Prøv 1 hvis 0 ikke fungerer

    # if not cap.isOpened():
    #     print("❌ Feil: Kunne ikke åpne kameraet.")
    #     latest_detections["error"] = "Kameraet kunne ikke åpnes"
    #     return

    cap = cv2.VideoCapture("http://10.22.110.129:8080/video_feed")


    if not cap.isOpened():
        print("❌ OpenCV klarte ikke åpne MJPEG-strømmen.")
    else:
        print("✅ OpenCV åpnet MJPEG-strømmen!")

    while True:
        success, frame = cap.read()
        
        if not success:
            print("❌ Feil: Kunne ikke lese fra kameraet")
            break

        # print("📡 Kjører YOLO-modellen på bildet...")
        results = model(frame, conf=0.3)

        detections = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls)
                confidence = float(box.conf)
                bbox = box.xyxy.tolist()

                # print(f"🔍 Oppdaget klasse {class_id} med {confidence:.2f} sikkerhet")

                if class_id == 0:
                    detections.append({"object": "human", "confidence": confidence, "bbox": bbox})
                elif class_id == 15:
                    detections.append({"object": "robot", "confidence": confidence, "bbox": bbox})

        # ✅ Oppdaterer JSON-variabelen som API-en bruker
        latest_detections["detections"] = detections
        latest_detections["timestamp"] = time.strftime("%Y-%m-%d %H:%M:%S")  # ⏳ Legger til tidsstempel
        

        

    cap.release()
    

# ✅ Start YOLO i en egen tråd
yolo_thread = threading.Thread(target=object_function, daemon=True)
yolo_thread.start()

def get_latest_detections():
    return latest_detections