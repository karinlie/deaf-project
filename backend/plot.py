import pandas as pd
import matplotlib.pyplot as plt

# Load the CSV file
df = pd.read_csv("detection_log.csv")

# Convert timestamp to datetime
df["timestamp"] = pd.to_datetime(df["timestamp"])

# Split triggered vs ignored
triggered = df[df["note"].str.contains("triggered")]
ignored = df[df["note"].str.contains("ignored")]

# Plot
plt.figure(figsize=(12, 6))

# Plot triggered
plt.scatter(triggered["timestamp"], triggered["center_x"], color="red", label="Triggered")

# Plot ignored (worker)
plt.scatter(ignored["timestamp"], ignored["center_x"], color="green", label="Worker (ignored)")

plt.plot(df["timestamp"], df["center_x"], color="red", label="Detected Person (center_x)", linewidth=2)


# Plot worker_x as horizontal line
plt.plot(df["timestamp"], df["worker_x"], color="blue", linestyle="--", label="Worker X Position")

plt.xlabel("Time")
plt.ylabel("Center X Position")
plt.title("YOLO Detections vs Worker Line")
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
