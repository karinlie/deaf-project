import React, { useState } from "react";
import RecordRTC from "recordrtc";

export default function Transcription() {
    const [recorder, setRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [loading, setLoading] = useState(false);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const newRecorder = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/wav",
            sampleRate: 44000,
            recorderType: RecordRTC.StereoAudioRecorder,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
        });

        newRecorder.startRecording();
        setRecorder(newRecorder);
    }

    function stopRecording() {
        if (recorder) {
            recorder.stopRecording(() => {
                let blob = recorder.getBlob();
                console.log("Format:", blob.type);
                console.log("Size", blob.size);

                if (blob.size <= 44) {
                    console.error("WAV-file is empty.");
                    return;
                }

                setAudioBlob(blob);
            });
        }
    }

    async function transcribeAudio() {
        if (!audioBlob) {
            console.error("Did not find audiofile");
            return;
        }

        let formData = new FormData();
        formData.append("file", audioBlob, "audio.wav");

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/transcribe/", { 
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("Transcribed text", data.text);
            setTranscription(data.text); 
        } catch (error) {
            console.error("Error trouble sending audio:", error);
        }
        setLoading(false);
    }

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>🎙️ Audio Transcription</h1>

            <button onClick={startRecording} style={{ padding: "10px", margin: "10px" }}>
                🔴 Start recording
            </button>
            <button onClick={stopRecording} style={{ padding: "10px", margin: "10px" }}>
                ⏹️ Stop recording
            </button>
            <button onClick={transcribeAudio} style={{ padding: "10px", margin: "10px" }} disabled={!audioBlob}>
                🎤 Transcribe the sound
            </button>

            {loading && <p>⏳ Transcribing sound...</p>}

            {transcription && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray", borderRadius: "5px" }}>
                    <h3>📝 Transcribed Text:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
}
