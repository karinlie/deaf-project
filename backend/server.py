from fastapi import FastAPI, UploadFile, File
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

from serialData import movement_alert

print("🚀 Laster inn Whisper-modellen...")
whisper_model = whisper.load_model("base")  # Velg "tiny", "small", "medium" eller "large"
print("✅ Whisper-modellen er lastet!")


app = FastAPI()
router = APIRouter()

# ✅ Aktiver CORS slik at frontend (localhost:5173) kan snakke med backend (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Eller ["http://localhost:5173"] for mer sikkerhet
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/esp32/")
async def serial_data():
    """ Returns the latest movement alert instantly. """
    result = movement_alert()
    print("🚨 Movement alert response:", result)  # ✅ Debugging
    return result  # ✅ Returns the latest reading instantly
    

def yamnet_predict(audio):
        
    model_path = "C:/Users/Karin/alarm-detector/models"  # Sjekk at stien er riktig
    try:
        yamnet_model = tf.saved_model.load(model_path)
        print("✅  yamnet Modellen er lastet inn!")
    except Exception as e:
        print(f"❌ Feil ved lasting av modellen: {e}")
    yamnet_predict_fn = yamnet_model.signatures["serving_default"]  # Bruk riktig signatur
    return yamnet_predict_fn

# ✅ Funksjon for å forberede lydfilen
def preprocess_audio(audio_bytes):
    """Konverterer en lydfil til 16kHz mono og returnerer en normalisert waveform."""
    try:
        print("🚀 Starter lydprosessering...")
        print(f"📂 Mottatt lydstørrelse: {len(audio_bytes)} bytes")

        # 🎵 Lagre filen for debugging
        test_file = "test_received.wav"
        with open(test_file, "wb") as f:
            f.write(audio_bytes)
        print(f"✅ Lydfil lagret som {test_file}")

        # 🎵 Konverter fra WEBM til WAV med pydub
        audio = AudioSegment.from_file(io.BytesIO(audio_bytes), format="webm")
        audio = audio.set_frame_rate(16000).set_channels(1)  # Konverter til 16kHz mono

        # 🔍 Konverter til NumPy-array for librosa
        audio_array = np.array(audio.get_array_of_samples()).astype(np.float32) / 32768.0  # Normalisering [-1, 1]

        # 🚀 Konverter til TensorFlow-format
        waveform = tf.convert_to_tensor(np.expand_dims(audio_array, axis=0), dtype=tf.float32)

        print(f"✅ Lyd konvertert: {waveform.shape}")  # Debugging
        return waveform

    except Exception as e:
        print(f"❌ Feil under lydprosessering: {str(e)}")
        return None

# ✅ API-endepunkt for å gjøre prediksjon på lydfiler
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # 🎵 Les lydfilen
        audio_bytes = await file.read()
        print(f"📂 Lydfil mottatt: {len(audio_bytes)} bytes")  # Sjekk at vi mottar lydfilen

        # 🎵 Lagre filen for testing
        with open("test_received.wav", "wb") as f:
            f.write(audio_bytes)

        print("✅ Lydfil lagret som 'test_received.wav' – Sjekk om den kan spilles av!")

        waveform = preprocess_audio(audio_bytes)
        print(f"🔄 Prosessert lyd - Shape: {waveform.shape}")  # Sjekk at waveform er riktig

        # 🔍 Kjør YAMNet-modellen
        yamnet_model = yamnet_predict
        output_dict = yamnet_model(waveform)
        scores = output_dict["predictions"]

        predicted_class = tf.argmax(scores, axis=-1).numpy()[0]
        confidence = tf.reduce_max(scores).numpy()

        print(f"🎯 Predikert klasse: {predicted_class} (Sannsynlighet: {confidence:.2f})")  # Logg resultat

        return {"class_id": int(predicted_class), "confidence": float(confidence)}

    except Exception as e:
        print(f"⚠️ FEIL: {str(e)}")
        return {"error": str(e)}

@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # 🚀 Opprett "temp/" mappe hvis den ikke finnes
        os.makedirs("temp", exist_ok=True)

        file_location = f"temp/{file.filename}"
        
        # 🎵 Lagre filen
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())

        print(f"📂 Fil lagret: {file_location}")

        # 🔍 Kjør Whisper-modellen
        result = whisper_model.transcribe(file_location)
        transcription = result["text"]

        print(f"📝 Transkribert tekst: {transcription}")

        return {"text": transcription}

    except Exception as e:
        print(f"⚠️ FEIL: {str(e)}")
        return {"error": str(e)}


@app.post("/detect/")
async def detect_alarm(file: UploadFile = File(...)):
    try:
        # 🎵 Les lydfilen
        audio_bytes = await file.read()
        print(f"📂 Lydfil mottatt: {len(audio_bytes)} bytes")  # Sjekk at vi mottar lydfilen

        waveform = preprocess_audio(audio_bytes)
        print(f"🔄 Prosessert lyd - Shape: {waveform.shape}")  # Sjekk at waveform er riktig

        # 🔍 Kjør YAMNet-modellen
        output_dict = yamnet_model(waveform)
        scores = output_dict["predictions"]

        predicted_class = tf.argmax(scores, axis=-1).numpy()[0]
        confidence = tf.reduce_max(scores).numpy()

        print(f"🎯 Predikert klasse: {predicted_class} (Sannsynlighet: {confidence:.2f})")  # Logg resultat

        return {"class_id": int(predicted_class), "confidence": float(confidence)}

    except Exception as e:
        print(f"⚠️ FEIL: {str(e)}")
        return {"error": str(e)}