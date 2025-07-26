import React from "react";
import { FileText } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          :root {
            --mono-black: #1a1a1a;
            --mono-dark-gray: #404040;
            --mono-medium-gray: #737373;
            --mono-light-gray: #a3a3a3;
            --mono-pale-gray: #e5e5e5;
            --mono-white: #ffffff;
            --mono-cream: #fafafa;
          }
          
          .handwriting-font {
            font-family: 'Comic Sans MS', cursive, sans-serif;
          }
          
          .warm-shadow {
            box-shadow: 0 4px 12px rgba(26, 26, 26, 0.1);
          }
          
          .paper-texture {
            background-image: 
              repeating-linear-gradient(
                transparent,
                transparent 24px,
                rgba(64, 64, 64, 0.1) 25px
              );
          }
        `}
      </style>
      
      {/* Human-centered Header */}
      <header className="bg-white warm-shadow border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center warm-shadow transform rotate-3">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Your Notes, Alive
                </h1>
                <p className="text-gray-600 font-medium">
                  Transform handwriting into conversations
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Subtle Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            Your handwritten thoughts deserve to be heard and understood
          </p>
        </div>
      </footer>
    </div>
  );
}
