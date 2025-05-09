const int leftVibrationPin = 9;
const int rightVibrationPin = 5;

void setup() {
  pinMode(leftMotorPin, OUTPUT);
  pinMode(rightMotorPin, OUTPUT);
  digitalWrite(leftMotorPin, LOW);
  digitalWrite(rightMotorPin, LOW);
  
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim(); 

    if (command == "V1") {
      digitalWrite(leftMotorPin, HIGH);
      delay(300); 
      digitalWrite(leftMotorPin, LOW);
    } else if (command == "V2") {
      digitalWrite(rightMotorPin, HIGH);
      delay(300);
      digitalWrite(rightMotorPin, LOW);
    }
  }
}

