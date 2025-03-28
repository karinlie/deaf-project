from ultralytics import YOLO
import cv2

# Last inn YOLOv8-modellen
model = YOLO('yolo11m.pt')

# Bytt til `1` eller et annet nummer hvis `0` ikke fungerer
cap = cv2.VideoCapture(1)


if not cap.isOpened():
    print("Feil: Kunne ikke åpne kameraet. Prøv en annen index.")
    exit()

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("Feil: Kunne ikke lese fra kameraet")
        break

    # Kjør YOLO-modellen på bildet
    results = model(frame, conf=0.3)
    print(results)
    # Tegn resultatene på bildet
    annotated_frame = results[0].plot()

    # Vis bildet i et OpenCV-vindu
    cv2.imshow("YOLOv8 Live Detection", annotated_frame)

    # Trykk 'q' for å avslutte
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Lukk kamera og vinduer
cap.release()
cv2.destroyAllWindows()
