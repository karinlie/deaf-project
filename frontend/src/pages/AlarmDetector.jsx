import React, { useEffect, useState } from "react";
import RecordRTC from "recordrtc";

export default function AlarmDetector() {
    const [alarmDetected, setAlarmDetected] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        startRecording();
    }, []);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const recorder = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/wav",
            sampleRate: 44000, // ✅ Sikrer 16kHz
            recorderType: RecordRTC.StereoAudioRecorder,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, // ✅ Sikrer mono
        });

        recorder.startRecording();

        setInterval(async () => {
            recorder.stopRecording(() => {
                let blob = recorder.getBlob();
            
                // 🎧 Spiller av lydfilen for å sjekke om det er lyd
                let audioURL = URL.createObjectURL(blob);
                let audio = new Audio(audioURL);
                audio.play();
            
                console.log("📂 Opptakets format:", blob.type);
                console.log("📏 Størrelse:", blob.size);
            
                // 🚨 Sjekker om opptaket er tomt
                if (blob.size <= 44) {
                    console.error("❌ Opptaket er tomt! WAV-filen inneholder ingen lyd.");
                    return;
                }
            
                // 🔄 Sender filen til backend
                uploadAudio(blob);
                recorder.startRecording();
            });
            
        }, 10000); // Sender lyd hvert 5. sekund
    }

    // ✅ Konverterer lyd til 16kHz mono
    async function convertTo16kHzMono(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
    
            reader.onloadend = async () => {
                const audioContext = new AudioContext();
                const audioBuffer = await audioContext.decodeAudioData(reader.result);
    
                // ✅ Bruker OfflineAudioContext for å sikre 16kHz mono
                const offlineContext = new OfflineAudioContext(
                    1, // Mono
                    audioBuffer.duration * 16000, // Antall samples
                    16000 // Sample rate
                );
    
                const source = offlineContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(offlineContext.destination);
                source.start();
    
                // 🎵 Konverter lyden
                offlineContext.startRendering().then((renderedBuffer) => {
                    const wavBlob = bufferToWav(renderedBuffer);
                    resolve(wavBlob);
                });
            };
        });
    }
    

    // ✅ Konverterer buffer til WAV-fil
    function bufferToWav(audioBuffer) {
        const numOfChan = 1; // Tving til mono
        const length = audioBuffer.length * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        let pos = 0;
    
        const writeString = (s) => { for (let i = 0; i < s.length; i++) view.setUint8(pos++, s.charCodeAt(i)); };
        const floatTo16BitPCM = (output, offset, input) => {
            for (let i = 0; i < input.length; i++, offset += 2) {
                const s = Math.max(-1, Math.min(1, input[i]));
                output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
        };
    
        writeString('RIFF'); 
        view.setUint32(pos, 36 + length, true); pos += 4;
        writeString('WAVE');
        writeString('fmt '); 
        view.setUint32(pos, 16, true); pos += 4;
        view.setUint16(pos, 1, true); pos += 2;
        view.setUint16(pos, 1, true); pos += 2; // Tving til mono
        view.setUint32(pos, 16000, true); pos += 4; // 16kHz sample rate
        view.setUint32(pos, 16000 * 2, true); pos += 4;
        view.setUint16(pos, 2, true); pos += 2;
        view.setUint16(pos, 16, true); pos += 2;
        writeString('data');
        view.setUint32(pos, length - pos + 8, true); pos += 4;
    
        // 🚀 Sørger for at vi bruker bare én kanal (mono)
        const channelData = audioBuffer.getChannelData(0);
        floatTo16BitPCM(view, 44, channelData);
    
        return new Blob([buffer], { type: 'audio/wav' });
    }
    

    async function uploadAudio(audioBlob) {
        console.log("📂 Opptak sendes til backend:");
        console.log("🔊 Lydformat:", audioBlob.type);
        console.log("📏 Størrelse:", audioBlob.size);
        let formData = new FormData();
        formData.append("file", audioBlob, "audio.wav");

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/predict/", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("🔊 Lydklasse:", data.class_id, "📊 Sannsynlighet:", data.confidence);

            if (data.class_id === 400 || data.class_id === 401) { // Justér ID-er for alarm
                console.log("🚨 ALARM OPPDAGET!");
                setAlarmDetected(true);
                setTimeout(() => setAlarmDetected(false), 3000);
            }
        } catch (error) {
            console.error("❌ Feil ved sending av lyd:", error);
        }
        setLoading(false);
    }

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Alarm Detector</h1>
            {loading && <p>⏳ Sender lyd til serveren...</p>}
            <div
                style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    backgroundColor: alarmDetected ? "red" : "green",
                    margin: "20px auto",
                    transition: "background-color 0.5s ease",
                }}
            />
            {alarmDetected && <h2 style={{ color: "yellow", fontSize: "24px" }}>⚠️ ALARM DETECTED! ⚠️</h2>}
        </div>
    );
}
