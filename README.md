# TalkNotes

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)

> Upload handwritten notes, extract text with AI, and have intelligent conversations about your writing.

## About

TalkNotes transforms handwritten notes into interactive conversations. Upload a photo or PDF of your handwriting, and the app uses AI (LLM) to extract the text, then lets you chat with an AI assistant that has full context of your notes. Built with React and a clean, warm UI — designed to make your handwritten thoughts come alive digitally.

## Tech Stack

- **Frontend:** React, JSX
- **Styling:** Tailwind CSS, shadcn/ui components
- **Animations:** Framer Motion
- **AI Integration:** LLM-powered text extraction and conversational chat
- **Icons:** Lucide React

## Features

- **Handwriting extraction** — upload images (PNG, JPG) or PDFs of handwritten notes
- **AI-powered OCR** — uses an LLM to accurately extract text from handwriting
- **Conversational chat** — ask questions about your notes with full context awareness
- **Chat history** — persisted per note for ongoing conversations
- **Drag & drop upload** — intuitive file upload with drag-and-drop support
- **Processing states** — real-time status indicators (processing, completed, failed)
- **Responsive layout** — side-by-side notes and chat on desktop, stacked on mobile
- **Smooth animations** — polished transitions and loading states

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/iampreetdave/TalkNotes.git
cd TalkNotes
npm install
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Upload:** User uploads a handwritten note (image or PDF) via drag-and-drop or file picker
2. **Extract:** The file is sent to an LLM with a prompt to extract all handwritten text accurately
3. **Display:** Extracted text is shown in a styled card with a paper-texture background
4. **Chat:** User can ask questions about the extracted text; the AI responds with full context of the notes
5. **Persist:** Chat messages and note data are stored in a database for retrieval across sessions

## Project Structure

```
TalkNotes/
├── ChatInterface.jsx      # AI chat component with message history
├── FileUploadCard.jsx     # Drag-and-drop file upload component
├── ExtractedTextCard.jsx  # Displays extracted handwriting text
├── NotesUpload.jsx        # Main page orchestrating upload + chat
├── Layout.js              # App layout with header and footer
├── launch.html            # Landing page
└── README.md
```

## License

This project is licensed under the [MIT License](LICENSE).
