# ✍️ Talk to Your Notes — AI-Powered Handwritten Notes Assistant

Transform your handwritten notes into **interactive conversations**.  
This project leverages OCR + LLM to **read**, **analyze**, and **chat** about your handwritten documents in a warm and human-centered way.

---

## 🚀 Live Prototype
🔗 [Try the Live App](https://app--talk-to-pdf-df6016e7.base44.app/)

---

## 📸 Features

- 📂 Upload handwritten **PDFs or Images**
- 🧠 Automatically **extract text** using AI (TrOCR-based model)
- 💬 Ask **chat-style questions** based on your uploaded content
- 🎨 Friendly, minimal UI with a personal touch
- ✨ Beautiful animations with **Framer Motion**
- 🧾 Modular design with cards for upload, text, and chat

---

## 🧱 Tech Stack

- **Frontend**: React + TailwindCSS
- **Styling**: Custom styles with warm shadows, paper texture, Comic Sans
- **Animations**: Framer Motion
- **Icons**: Lucide-react
- **OCR**: [TrOCR Model](https://github.com/rsommerfeld/trocr)
- **LLM Integration**: InvokeLLM API (configurable)
- **Component-Based Design**:
  - `FileUploadCard`
  - `ExtractedTextCard`
  - `ChatInterface`
  - `Layout`

---

## 🗂️ Project Structure

/pages
└── NotesUpload.jsx # Main upload + chat page

/components
/upload
└── FileUploadCard.jsx # Upload UI with drag-drop
/notes
└── ExtractedTextCard.jsx# Shows extracted text
/chat
└── ChatInterface.jsx # Interactive AI chat

/entities
└── Note.js, ChatMessage.js# Handles note & message APIs

Layout.js # Global page layout
launch.html # Static team intro page

yaml
Copy
Edit
