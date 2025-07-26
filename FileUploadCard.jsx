
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image } from "lucide-react"; // Removed Smile, Coffee
import { motion } from "framer-motion";

export default function FileUploadCard({ onFileSelect, isProcessing }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );
    
    if (validFile) {
      onFileSelect(validFile);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="warm-shadow border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 bg-white">
        <CardContent className="p-10">
          <div
            className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-500 ${
              dragActive 
                ? 'border-gray-900 bg-gray-50 transform scale-105' 
                : 'border-gray-300 hover:border-gray-500 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileInput}
              className="hidden"
              disabled={isProcessing}
            />
            
            <motion.div
              animate={{ 
                scale: dragActive ? 1.05 : 1,
                rotate: dragActive ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center warm-shadow transform rotate-3">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  {/* Smile icon and its container removed */}
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  Share Your Handwritten Thoughts
                </h3>
                <p className="text-gray-600 text-lg mb-2 leading-relaxed max-w-md mx-auto">
                  Drop your notes here and watch them come to life
                </p>
                {/* Coffee icon and its paragraph removed */}
              </div>

              <div className="flex justify-center space-x-6 mb-10">
                <div className="flex items-center space-x-3 px-5 py-3 bg-gray-100 rounded-2xl border border-gray-200">
                  <FileText className="w-6 h-6 text-gray-700" />
                  <span className="font-medium text-gray-800">PDF Files</span>
                </div>
                <div className="flex items-center space-x-3 px-5 py-3 bg-gray-100 rounded-2xl border border-gray-200">
                  <Image className="w-6 h-6 text-gray-700" />
                  <span className="font-medium text-gray-800">Photos</span>
                </div>
              </div>

              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-2xl warm-shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-900"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Reading your thoughts...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-3" />
                    Choose Your Notes
                  </>
                )}
              </Button>

              {/* Quote paragraph removed */}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
