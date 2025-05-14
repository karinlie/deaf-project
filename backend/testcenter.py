import cv2
import math
from ultralytics import YOLO

#getting the stream from the external camera
cap = cv2.VideoCapture("http://10.22.111.227:8080/video_feed")
model = YOLO('yolo11m.pt')


aruco_dict = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_4X4_50)
aruco_params = cv2.aruco.DetectorParameters()
ARUCO_WORKER_ID = 0  #change to the correct aruco code

worker_center = None
worker_bbox = None
DISTANCE_THRESHOLD = 60

def get_center(bbox):
    x1, y1, x2, y2 = bbox
    return ((x1 + x2) / 2, (y1 + y2) / 2)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)[0]
    persons = []

   
    for box in results.boxes:
        cls_id = int(box.cls)
        label = model.names[cls_id]
        if label == "person":
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            persons.append({"bbox": (x1, y1, x2, y2)})

   
    corners, ids, _ = cv2.aruco.detectMarkers(frame, aruco_dict, parameters=aruco_params)

    if ids is not None and ARUCO_WORKER_ID in ids:
        index = list(ids.flatten()).index(ARUCO_WORKER_ID)
        aruco_corners = corners[index][0]  # (4, 2)

        #find aruco
        cX = int(aruco_corners[:, 0].mean())
        cY = int(aruco_corners[:, 1].mean())
        marker_center = (cX, cY)
        cv2.circle(frame, marker_center, 6, (0, 255, 255), -1)
        cv2.putText(frame, f"WORKER MARKER ({ARUCO_WORKER_ID})", (cX - 40, cY - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)

        # 🔎 Finn nærmeste person til ArUco
        min_dist = float("inf")
        for person in persons:
            center = get_center(person["bbox"])
            dist = math.dist(center, marker_center)
            if dist < min_dist:
                min_dist = dist
                worker_center = center
                worker_bbox = person["bbox"]

    #draw the middle line where worker was found
    if worker_center:
        midline_x = int(worker_center[0])
        cv2.line(frame, (midline_x, 0), (midline_x, frame.shape[0]), (0, 0, 255), 2)

        #draw a box around the worker
        x1, y1, x2, y2 = worker_bbox
        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 255), 2)
        cv2.putText(frame, "WORKER", (int(x1), int(y1) - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)

    #mark every other person that is not the worker
    for person in persons:
        center = get_center(person["bbox"])
        if worker_center and math.dist(center, worker_center) < DISTANCE_THRESHOLD:
            continue  

        x1, y1, x2, y2 = person["bbox"]
        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        cv2.putText(frame, "person", (int(x1), int(y1) - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    
    cv2.imshow("YOLO + ArUco Worker Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
