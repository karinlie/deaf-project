from ultralytics import YOLO
import cv2
import threading
import time
import math


aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_4X4_50)
aruco_params = cv2.aruco.DetectorParameters()
ARUCO_WORKER_ID = 0  # <- change if you use another id


model = YOLO('yolo11m.pt')


latest_detections = {"detections": [], "timestamp": "", "worker_x": None}


locked_worker_center = None
worker_locked = False


def get_center(bbox):
    x1, y1, x2, y2 = bbox
    return ((x1 + x2) / 2, (y1 + y2) / 2)


def object_function():
    global locked_worker_center, worker_locked

    print("Starting YOLO11 object_function()...")
    cap = cv2.VideoCapture("http://10.22.111.227:8080/video_feed") #getting the stream from the other computer

    if not cap.isOpened():
        print("OpenCV could NOT open MJPEG-stream.")
        return
    else:
        print("OpenCV opened MJPEG-stream!")

    while True:
        success, frame = cap.read()
        if not success:
            print("Could not read from camera!!")
            break

        results = model(frame, conf=0.3)
        detections = []
        person_boxes = []

        for result in results:
            for box in result.boxes:
                class_id = int(box.cls)
                confidence = float(box.conf)
                bbox = box.xyxy.tolist()

                if class_id == 0:  # human
                    detections.append({
                        "object": "human",
                        "confidence": confidence,
                        "bbox": bbox
                    })
                    person_boxes.append(bbox[0])

                elif class_id == 15:  # robot
                    detections.append({
                        "object": "robot",
                        "confidence": confidence,
                        "bbox": bbox
                    })

        #finding the worker
        worker_x = None
        corners, ids, _ = cv2.aruco.detectMarkers(frame, aruco_dict, parameters=aruco_params)

        if ids is not None and ARUCO_WORKER_ID in ids:
            idx = list(ids.flatten()).index(ARUCO_WORKER_ID)
            aruco_corners = corners[idx][0]
            marker_center = (
                int(aruco_corners[:, 0].mean()),
                int(aruco_corners[:, 1].mean())
            )

            if not worker_locked:
                min_dist = float("inf")
                for box in person_boxes:
                    center = get_center(box)
                    dist = math.dist(center, marker_center)
                    if dist < min_dist:
                        min_dist = dist
                        locked_worker_center = center

                if locked_worker_center:
                    worker_locked = True
                    print("Worker found and locked!")

            if worker_locked:
                worker_x = locked_worker_center[0]

        #updating the results
        latest_detections["detections"] = detections
        latest_detections["timestamp"] = time.strftime("%Y-%m-%d %H:%M:%S")
        latest_detections["worker_x"] = worker_x

    cap.release()

#threading for easier collection
yolo_thread = threading.Thread(target=object_function, daemon=True)
yolo_thread.start()


# helping function for api
def get_latest_detections():
    return latest_detections