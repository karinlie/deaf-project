import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import {
    Box,
    Button,
    Typography,
    Paper,
    CircularProgress,
    TextField
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import CloseIcon from "@mui/icons-material/Close";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function TranscriptionPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [loading, setLoading] = useState(false);
    const [writtenResponse, setWrittenResponse] = useState("");
    const [messages, setMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const newRecorder = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/wav",
            sampleRate: 44000,
            recorderType: RecordRTC.StereoAudioRecorder,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1
        });
        newRecorder.startRecording();
        setRecorder(newRecorder);
        setAudioBlob(null);
        setIsRecording(true);
    }

    function stopRecording() {
        if (recorder) {
            recorder.stopRecording(() => {
                let blob = recorder.getBlob();
                if (blob.size <= 44) {
                    console.error("❌ Opptaket er tomt! WAV-filen inneholder ingen lyd.");
                    return;
                }
                setAudioBlob(blob);
                setIsRecording(false);
            });
        }
    }

    function emptyRecording() {
        setRecorder(null);
        setAudioBlob(null);
        setIsRecording(false);
    }

    async function transcribeAudio() {
        if (!audioBlob) return;
        let formData = new FormData();
        formData.append("file", audioBlob, "audio.wav");
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/transcribe/", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            setMessages(prev => [...prev, { type: "user", text: data.text, source: "transcribed" }]);
            setAudioBlob(null);
        } catch (error) {
            console.error("❌ Feil ved sending av lyd:", error);
        }
        setLoading(false);
    }

    function sendWrittenResponse() {
        if (writtenResponse.trim() !== "") {
            setMessages(prev => [...prev, { type: "user", text: writtenResponse, source: "written" }]);
            setWrittenResponse("");
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendWrittenResponse();
        }
    }

    return (
        <>
            <style>{`@keyframes blinker { 50% { opacity: 0; } }`}</style>

            {!isOpen && (
                <Box sx={{ position: "fixed", bottom: 20, right: 20, display: "flex", alignItems: "center", gap: 1, zIndex: 1000 }}>
                    <Typography sx={{ backgroundColor: "rgba(216, 126, 126, 0.7)", color: "black", padding: "6px 12px", borderRadius: "6px", fontSize: 16 }}>
                        Activate transcription
                    </Typography>
                    <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ borderRadius: "50%", width: 60, height: 60, backgroundColor: "#CC0033", '&:hover': { backgroundColor: "#A00028" } }}>
                        <MicIcon sx={{ color: "white" }} />
                    </Button>
                </Box>
            )}

            {isOpen && (
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    <Paper sx={{ position: "fixed", bottom: 80, right: 20, width: 400, height: 520, boxShadow: 5, borderRadius: 2, p: 2, display: "flex", flexDirection: "column", zIndex: 1200 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography sx={{ fontSize: 22, display: "flex", alignItems: "center", gap: 1 }}>
                                <MicIcon /> Transcription
                                {isRecording && (
                                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "red", animation: "blinker 1s linear infinite" }} />
                                )}
                            </Typography>
                            <Button onClick={() => setIsOpen(false)} size="small"><CloseIcon /></Button>
                        </Box>

                        {loading && (
                            <Box sx={{ textAlign: "center", my: 2 }}>
                                <CircularProgress />
                                <Typography sx={{ fontSize: 16 }}>Transcribing...</Typography>
                            </Box>
                        )}

                        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1, bgcolor: "#f9f9f9", borderRadius: 1, display: "flex", flexDirection: "column" }}>
                            {messages.length === 0 ? (
                                <Typography sx={{ fontSize: 16, color: "text.secondary" }}>
                                    Start recording or write a response to see messages here.
                                </Typography>
                            ) : (
                                <>
                                    {messages.map((msg, idx) => (
                                        <Box
                                            key={idx}
                                            sx={{
                                                mb: 2,
                                                alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                                                maxWidth: "80%",
                                                bgcolor: msg.source === "written" ? "#cce5ff" : "#d1e7dd",
                                                px: 2,
                                                py: 1.5,
                                                borderRadius: 2,
                                                boxShadow: 1,
                                                position: "relative"
                                            }}
                                        >
                                            <Typography sx={{ fontSize: 18 }}>{msg.text}</Typography>
                                            <Typography sx={{ position: "absolute", bottom: -16, right: 4, color: "gray", fontSize: 12 }}>
                                                {msg.source === "written" ? "Written" : "Transcribed"}
                                            </Typography>
                                        </Box>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: 16, mb: 0.5 }}>Or write your response:</Typography>
                            <TextField
                                fullWidth
                                multiline
                                minRows={2}
                                maxRows={4}
                                placeholder="Write your answer here..."
                                variant="outlined"
                                value={writtenResponse}
                                onChange={(e) => setWrittenResponse(e.target.value)}
                                onKeyDown={handleKeyPress}
                                sx={{
                                    fontSize: 16,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#115293',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                    },
                                    '& textarea': {
                                        fontSize: 16,
                                        lineHeight: "1.5"
                                    }
                                }}
                            />
                            <Button
  onClick={sendWrittenResponse}
  variant="contained"
  sx={{
    mt: 1,
    fontSize: 16,
    backgroundColor: '#1976d2',
    '&:hover': { backgroundColor: '#125ea3' }
  }}
  disabled={!writtenResponse.trim()}
>
  ➤ Send
</Button>
                        </Box>

                        {isRecording && (
                            <Typography sx={{ textAlign: "center", mt: 1, fontSize: 16, color: "error.main" }}>
                                🔴 Recording in progress...
                            </Typography>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button variant="contained" color="error" onClick={startRecording} disabled={isRecording} sx={{ fontSize: 16 }}>🔴 Start</Button>
                            <Button variant="contained" color="primary" onClick={stopRecording} disabled={!isRecording} sx={{ fontSize: 16 }}>⏹ Stop</Button>
                            <Button variant="contained" color="secondary" onClick={transcribeAudio} disabled={!audioBlob} sx={{ fontSize: 16 }}>🎤 Transcribe</Button>
                            <Button variant="contained" color="warning" onClick={emptyRecording} disabled={!audioBlob} sx={{ fontSize: 16 }}>🗑️ Empty</Button>
                        </Box>
                    </Paper>
                </ClickAwayListener>
            )}
        </>
    );
}
