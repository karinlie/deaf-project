## 📁 Project Structure

This project consists of both **backend** and **frontend** parts:



- **Backend**: Python (FastAPI, OpenCV, YOLO)
- **Frontend**: React + Vite

---

## 🚀 Getting Started
To use the vibration feature, connect your Arduino Uno with the vibration motors attached and upload the final.ino sketch to it

### ⚙️ Backend Setup



1. **Activate virtual environment (Windows)**  
   From the `backend/` directory:
   if you do not have environment
 

   ```bash
   python -m venv venv
   venv\Scripts\activate


Otherwise just: venv\Scripts\activate

Then you need pip install -r requirements.txt

Run FastAPI server
uvicorn server:app --host 0.0.0.0 --port 8000 --reload


If using YOLO video streaming
On the computer with a webcam, run: uvicorn stream:app --host 0.0.0.0 --port 8080

### 📷 Camera Streaming Setup (on separate machine)

If you're running the camera on a separate PC (used for human detection via YOLO):

1. Navigate to the `backend/` folder.
2. Start the video stream server:

   ```bash
   uvicorn stream:app --host 0.0.0.0 --port 8080
3. On the main machine (running yolo_backend.py), edit the stream URL: VIDEO_STREAM_URL = "http://<streaming-pc-ip>:8080/video"
4. To find the IP of the streaming PC:

    On Windows, run ipconfig in Command Prompt.

    Use the IPv4 Address (e.g. 192.168.1.42).
5. Test it by visiting: http://<streaming-pc-ip>:8080/video
You should see a live video feed from the webcam.


Remember to check what the https are with the pc that is streaming to correctly connect you do this by checking ipconfig and then see whats after ipv4. And then use the correct http in the yolo_backend.py


### Frontend Setup
From the frontend/ folder:
npm install
npm run dev

This will start the frontend on http://localhost:5173 by default.


### Backend overview
server.py – FastAPI app that handles API requests

yolo_backend.py – YOLO-based video detection logic

test.py / testcenter.py – Scripts for debugging and simulation. testcenter is to test wether the cv finds the worker. 

plot.py – Plots movement from detections

/temp/ – Stores temporary audio .wav files for transcription

__pycache__/ – Python cache files (can be ignored)


### Frontend overview

public/ and data/ – Static assets and JSON files for step-by-step assembly instructions

components/ – Reusable UI components (e.g., transcription popup, human detection alerts)

AlertHuman has two versions: A and B. Only one should be active at a time (prototype/testing mode) the other one should be commented out.

pages/ – Main page views (like training steps, welcome pages)

routes/ – Handles navigation between views

Root React component, includes layout, theme, routes, and persistent UI (e.g., mic/transcription)

main.jsx – React app entry point (wraps App with ReactDOM and connects to HTML)

style/Theme.js – Custom MUI theme (e.g. color palette, typography overrides)

.gitignore, eslint.config.js – Project configuration and tooling




---

#### 🛠 Tips for Development

```markdown
### 🛠 Tips

- If you're running both frontend and backend on different machines, make sure to adjust CORS in `server.py`.
- When using the transcription feature, ensure microphone access is granted in the browser.
- Components like `TranscriptionPopup`, `AlertHuman`, and `PopupAlert` are always-on utilities for real-time feedback.
- Some components may include debug prints — disable or log them properly for production.
- Ensure you are on the same internett when using `stream.py`.  
- Ensure you have an arduino Uno and run the final.ino on this
