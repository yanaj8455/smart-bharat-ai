from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

SYSTEM_PROMPT = """
You are Smart Bharat AI.
Answer questions about Indian government services in simple Hindi or English.
"""


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    response = model.generate_content(
        SYSTEM_PROMPT + "\nUser: " + user_message
    )

    return jsonify({"reply": response.text})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)