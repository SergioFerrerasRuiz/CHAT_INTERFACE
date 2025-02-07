import os
from flask import Flask, render_template, request, jsonify
from groq_client import apicall  # Importamos el método apicall

# Configuración de las rutas
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, template_folder=os.path.join(BASE_DIR, "../templates"), static_folder=os.path.join(BASE_DIR, "../static"))

# Lista global para el historial de chat
chat_history = []

@app.route('/')
def home():
    return render_template("chat.html")

@app.route('/ask', methods=['POST'])
def ask():
    user_question = request.json.get('question')  # Obtenemos la pregunta
    if not user_question:
        return jsonify({'error': 'No question provided'}), 400

    # Llamamos al servicio de Groq
    answer = apicall(user_question)
    
    # Añadir la pregunta y respuesta al historial
    chat_history.append({
        'user_question': user_question,
        'answer': answer
    })
    
    return jsonify({'answer': answer})

if __name__ == "__main__":
    app.run(debug=False)
