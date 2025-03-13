import React, { useState } from "react";
import RecordRTC from "recordrtc";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import CloseIcon from "@mui/icons-material/Close";

export default function TranscriptionPopup() {
    const [isOpen, setIsOpen] = useState(false);
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
                console.log("📂 Opptak format:", blob.type);
                console.log("📏 Størrelse:", blob.size);

                if (blob.size <= 44) {
                    console.error("❌ Opptaket er tomt! WAV-filen inneholder ingen lyd.");
                    return;
                }

                setAudioBlob(blob);
            });
        }
    }

    function emptyRecording() {
        setRecorder(null);
        setAudioBlob(null);
        setTranscription("");
        console.log("🗑️ Recording cleared!");
    }

    async function transcribeAudio() {
        if (!audioBlob) {
            console.error("❌ Ingen lydfil funnet!");
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
            console.log("📜 Transkribert tekst:", data.text);
            setTranscription(data.text); 
        } catch (error) {
            console.error("❌ Feil ved sending av lyd:", error);
        }
        setLoading(false);
    }

    return (
        <>
            {/* Floating microphone button */}
            {!isOpen && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setIsOpen(true)} 
                    sx={{ 
                        position: "fixed", 
                        bottom: 20, 
                        right: 20, 
                        borderRadius: "50%",
                        width: 60,
                        height: 60,
                        minWidth: "unset",
                        boxShadow: 3
                    }}
                >
                    <MicIcon />
                </Button>
            )}

            {/* Popup window */}
            {isOpen && (
                <Paper 
                    sx={{
                        position: "fixed",
                        bottom: 80,
                        right: 20,
                        width: 380,
                        height: 500,
                        boxShadow: 5,
                        borderRadius: 2,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6"><MicIcon /> Transcription</Typography>
                        <Button onClick={() => setIsOpen(false)} size="small">
                            <CloseIcon />
                        </Button>
                    </Box>

                    {/* Status message */}
                    {loading && (
                        <Box sx={{ textAlign: "center", my: 2 }}>
                            <CircularProgress />
                            <Typography variant="body2">Transcribing...</Typography>
                        </Box>
                    )}

                    {/* Transcription Content */}
                    <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                        {transcription ? (
                            <Typography variant="body1">{transcription}</Typography>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Click "Start Recording" to begin transcribing.
                            </Typography>
                        )}
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                        <Button variant="contained" color="error" onClick={startRecording}>
                            🔴 Start
                        </Button>
                        <Button variant="contained" color="primary" onClick={stopRecording} disabled={!recorder}>
                            ⏹ Stop
                        </Button>
                        <Button variant="contained" color="secondary" onClick={transcribeAudio} disabled={!audioBlob}>
                            🎤 Transcribe
                        </Button>
                        <Button variant="contained" color="warning" onClick={emptyRecording} disabled={!audioBlob}>
                            🗑️ Empty Recording
                        </Button>
                    </Box>
                </Paper>
            )}
        </>
    );
}
