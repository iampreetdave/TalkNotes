
import React, { useState, useEffect } from 'react';
import { Note } from "@/entities/Note";
import { UploadFile, InvokeLLM } from "@/integrations/Core";
import FileUploadCard from "../components/upload/FileUploadCard";
import ExtractedTextCard from "../components/notes/ExtractedTextCard";
import ChatInterface from "../components/chat/ChatInterface";
import { motion } from "framer-motion"; // Added framer-motion import
import { Heart, Coffee, MessageCircle } from "lucide-react"; // Added lucide-react icons import

export default function NotesUpload() {
  const [currentNote, setCurrentNote] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadLatestNote();
  }, []);

  const loadLatestNote = async () => {
    try {
      const notes = await Note.list('-created_date', 1);
      if (notes.length > 0) {
        setCurrentNote(notes[0]);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleFileSelect = async (file) => {
    setIsProcessing(true);
    
    try {
      // Upload the file
      const { file_url } = await UploadFile({ file });
      
      // Create note record
      const noteData = {
        title: file.name,
        original_file_url: file_url,
        file_type: file.type.startsWith('image/') ? 'image' : 'pdf',
        processing_status: 'processing'
      };
      
      const newNote = await Note.create(noteData);
      setCurrentNote(newNote);
      
      // Extract text using AI
      try {
        const extractionPrompt = `
Please extract all the text from this handwritten note or document. 
Focus on accuracy and preserve the structure and meaning of the content.
If there are any unclear parts, make your best interpretation but note any uncertainty.
Return only the extracted text without any additional commentary.
`;

        const extractedText = await InvokeLLM({
          prompt: extractionPrompt,
          file_urls: [file_url]
        });

        // Update note with extracted text
        const updatedNote = await Note.update(newNote.id, {
          extracted_text: extractedText,
          processing_status: 'completed'
        });
        
        setCurrentNote(updatedNote);
        
      } catch (extractionError) {
        console.error('Error extracting text:', extractionError);
        await Note.update(newNote.id, {
          processing_status: 'failed'
        });
        setCurrentNote(prev => ({ ...prev, processing_status: 'failed' }));
      }
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Your Handwriting Has Stories to Tell
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your handwritten notes into meaningful conversations. 
              Upload, understand, and explore your thoughts like never before.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Left Column - Upload and Text */}
          <div className="space-y-12">
            <FileUploadCard 
              onFileSelect={handleFileSelect} 
              isProcessing={isProcessing}
            />
            
            {currentNote && (
              <ExtractedTextCard note={currentNote} />
            )}
          </div>

          {/* Right Column - Chat */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <ChatInterface note={currentNote} />
          </div>
        </div>

        {/* Human Touch Section */}
        {!currentNote && (
          <div className="mt-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Your Handwriting Matters
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 warm-shadow">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Touch</h3>
                  <p className="text-gray-600">Every curve and line carries your unique thoughts and emotions</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 warm-shadow">
                    <Coffee className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Thoughtful Process</h3>
                  <p className="text-gray-600">Handwriting slows down thinking, creating more meaningful content</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 warm-shadow">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Living Conversations</h3>
                  <p className="text-gray-600">Your notes become interactive, answering questions you didn't know you had</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
