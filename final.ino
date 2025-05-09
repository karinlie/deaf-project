const int leftVibrationPin = 9;
const int rightVibrationPin = 5;

void setup() {
  pinMode(leftVibrationPin, OUTPUT);
  pinMode(rightVibrationPin, OUTPUT);
  digitalWrite(leftVibrationPin, LOW);
  digitalWrite(rightVibrationPin, LOW);
  
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read();

    if (command == '1') {
      digitalWrite(leftVibrationPin, HIGH);
      delay(300);
      digitalWrite(leftVibrationPin, LOW);
    } else if (command == '2') {
      digitalWrite(rightVibrationPin, HIGH);
      delay(300);
      digitalWrite(rightVibrationPin, LOW);
    }
  }
}
