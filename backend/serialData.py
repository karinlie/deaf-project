import serial
import time
import threading

# 📌 Serial port settings
PORT = "COM3"  # Change this if needed
BAUD_RATE = 115200

# 🔄 Initialize serial connection
try:
    ser = serial.Serial(PORT, BAUD_RATE, timeout=0.1)  # ⏩ Lower timeout for faster reads
    print(f"✅ Connected to {PORT} at {BAUD_RATE} baud.")
except serial.SerialException as e:
    print(f"❌ Error: Could not open serial port: {e}")
    ser = None  # Prevent crashes if serial fails

# 🌟 Store latest sensor data (shared across API calls)
latest_distance = None

def read_serial_data():
    """ Continuously reads data from the serial port and updates latest_distance. """
    global latest_distance, ser

    while True:
        if ser and ser.in_waiting > 0:
            try:
                raw_data = ser.readline().decode("utf-8", errors="ignore").strip()
                if "Distance:" in raw_data:
                    latest_distance = float(raw_data.split(":")[1].strip().split()[0])
            except (ValueError, serial.SerialException) as e:
                print(f"⚠️ Serial Error: {e}")

        time.sleep(0.01)  # 🔄 Small delay to prevent CPU overuse

# 🚀 Start background thread to read serial data continuously
serial_thread = threading.Thread(target=read_serial_data, daemon=True)
serial_thread.start()

def movement_alert():
    """ Returns the latest movement alert instantly. """
    global latest_distance

    if latest_distance is not None:
        return {
            "movement_alert": latest_distance <= 80,
            "distance": latest_distance,
            "time": time.strftime("%Y-%m-%d %H:%M:%S")
        }

    return {"error": "No valid distance data"}

# 🔌 Close serial connection when script stops
import atexit
def close_serial():
    global ser
    if ser:
        ser.close()
        print("🔌 Serial connection closed.")
atexit.register(close_serial)  # Runs on exit
