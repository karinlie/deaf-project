from ultralytics import YOLO
import cv2

#just for testing to see if the camera and the model works
model = YOLO('yolo11m.pt')


cap = cv2.VideoCapture(1)


if not cap.isOpened():
    print("Feil: Kunne ikke åpne kameraet. Prøv en annen index.")
    exit()

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("Feil: Kunne ikke lese fra kameraet")
        break

  
    results = model(frame, conf=0.3)
    print(results)
  
    annotated_frame = results[0].plot()

    cv2.imshow("YOLOv8 Live Detection", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
