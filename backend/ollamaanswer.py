import ollama

def describe_scene(detections: list, worker_x: int = 320) -> str:
    """
    Takes in the detections from YOLO and returns a descriptive summary using a language model.
    """
    prompt = f"""
You are monitoring a scene with a human worker at x={worker_x}. 
Based on these detected objects, describe what is happening. 
Mention whether a person is approaching the worker and from which side.

Detections:
{detections}
"""

    response = ollama.chat(
        model="mistral",  # or use "llama2" or whatever model you've pulled via Ollama
        messages=[{"role": "user", "content": prompt}]
    )

    return response['message']['content']
