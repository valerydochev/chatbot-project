# 🤖 Chatbot Project

This is a small AI-powered chatbot project built with **React**, **Vite**, and a local **LLaMA 3 model** served via **Ollama**.

---

## ✨ Features
- Interactive chat interface (frontend in React)
- Local AI responses using Ollama
- Express.js backend to connect the AI with the frontend
- Clean, minimal design

---

## 🧩 Tech Stack
- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **AI Model:** LLaMA 3 (via Ollama)

---

## ⚙️ How to Run Locally

Follow these steps to start the chatbot on your machine 👇

### 1️⃣ Install dependencies
If you haven’t installed them yet, run:
npm install

### 2️⃣ Start the Ollama AI server
Make sure Ollama is installed and running:
ollama serve

Then, load the model (if you haven’t already):
ollama pull llama3.1

### 3️⃣ Run the backend server
Start your local Node.js API server:
npm run ai  
(you should see: AI server listening on http://localhost:8787)

### 4️⃣ Run the frontend (React app)
Open a new terminal and start the Vite development server:
npm run dev  
(you’ll see: Local: http://localhost:5173/)

### 5️⃣ Chat with your AI 🤖  
Now open http://localhost:5173 in your browser and start chatting!

---

💡 Created by **Valery Dochev** — experimenting with local AI chatbots and React.
