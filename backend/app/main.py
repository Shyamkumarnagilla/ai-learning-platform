from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI(title="AI Learning Platform")

# ✅ CORS FIX (THIS IS THE IMPORTANT PART)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],   # IMPORTANT
    allow_headers=["*"],   # IMPORTANT
)

# Load model once
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.get("/")
def read_root():
    return {"message": "Backend is running successfully"}

@app.post("/summarize")
def summarize_text(payload: dict):
    text = payload.get("text")
    summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return {"summary": summary[0]["summary_text"]}
