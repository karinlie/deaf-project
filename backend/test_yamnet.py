import tensorflow as tf
import numpy as np
import librosa

print("🚀 Laster inn YAMNet for testing...")
try:
    model_path = "C:/Users/Karin/alarm-detector/models"
    yamnet_model = tf.saved_model.load(model_path)
    yamnet_model = yamnet_model.signatures["serving_default"]
    print("✅ YAMNet-modellen er lastet inn!")
except Exception as e:
    print(f"❌ Feil ved lasting av YAMNet-modellen: {e}")
    exit()

def test_yamnet(filepath):
    # 🛠️ Les lydfil
    audio, sr = librosa.load(filepath, sr=16000, mono=True)
    print(f"🔍 Testlyd: {filepath}, Samplerate: {sr}, Shape: {audio.shape}")

    # 🎧 Konverter til TensorFlow tensor
    waveform = tf.convert_to_tensor(np.expand_dims(audio, axis=0), dtype=tf.float32)

    # 🔍 Kjør YAMNet
    output_dict = yamnet_model(waveform)
    scores = output_dict["predictions"]

    predicted_class = tf.argmax(scores, axis=-1).numpy()[0]
    confidence = tf.reduce_max(scores).numpy()

    print(f"🎯 Testresultat: Klasse {predicted_class}, Sannsynlighet: {confidence:.2f}")

test_yamnet("test_received.wav")
