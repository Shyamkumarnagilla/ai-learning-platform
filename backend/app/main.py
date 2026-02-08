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

@app.post("/generate-mcqs")
def generate_mcqs(payload: dict):
    text = payload.get("text")
    # A simple but effective way to generate MCQs from text
    # In a production app, we'd use a fine-tuned T5 or GPT model
    # For now, let's extract key sentences and create questions
    
    sentences = [s.strip() for s in text.split('.') if len(s.strip()) > 20]
    mcqs = []
    
    # Take up to 5 sentences to generate questions
    for i, sent in enumerate(sentences[:5]):
        words = sent.split()
        if len(words) < 10: continue
        
        # Pick a significant word as the answer (usually a noun/longer word)
        # For simplicity, we'll pick a middle word or a common AI keyword
        keywords = ["AI", "Artificial Intelligence", "Machine Learning", "Neural", "Intelligence", "Data", "Network", "Algorithm"]
        answer = None
        for kw in keywords:
            if kw.lower() in sent.lower():
                answer = kw
                break
        
        if not answer:
            # Fallback: pick the longest word that's not too common
            words_sorted = sorted([w.strip(',.()').lower() for w in words if len(w) > 5], key=len, reverse=True)
            if words_sorted:
                answer = words_sorted[0].capitalize()
            else:
                continue

        question = sent.replace(answer, "__________").replace(answer.lower(), "__________")
        
        # Generate some fake options
        options = [answer]
        distractors = ["Innovation", "Technology", "Automation", "Processing", "Framework", "System", "Cloud", "Robotics"]
        import random
        random.shuffle(distractors)
        
        for d in distractors:
            if d.lower() != answer.lower() and len(options) < 4:
                options.append(d)
        
        random.shuffle(options)
        correct_index = options.index(answer)
        
        mcqs.append({
            "question": f"{question}?",
            "options": options,
            "correctAnswer": correct_index
        })

    return {"questions": mcqs}
