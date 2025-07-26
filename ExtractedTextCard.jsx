
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Clock, AlertCircle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function ExtractedTextCard({ note }) {
  const getStatusIcon = () => {
    switch (note.processing_status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-gray-900" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-gray-600 animate-pulse" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-gray-700" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (note.processing_status) {
      case 'completed':
        return 'bg-gray-900 text-white border-gray-900';
      case 'processing':
        return 'bg-gray-200 text-gray-700 border-gray-300';
      case 'failed':
        return 'bg-gray-600 text-white border-gray-600';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusMessage = () => {
    switch (note.processing_status) {
      case 'completed':
        return 'Ready to chat';
      case 'processing':
        return 'Reading...';
      case 'failed':
        return 'Need help';
      default:
        return 'Waiting';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="warm-shadow border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 bg-white">
        <CardHeader className="bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-xl border border-gray-200 warm-shadow">
                <BookOpen className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block">
                  {note.title}
                </span>
                <span className="text-sm text-gray-500 font-normal">
                  Your handwritten thoughts
                </span>
              </div>
            </CardTitle>
            <Badge className={`${getStatusColor()} border-2 font-bold px-4 py-2 rounded-full`}>
              {getStatusIcon()}
              <span className="ml-2">{getStatusMessage()}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {note.processing_status === 'completed' && note.extracted_text ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-gray-200">
                <FileText className="w-5 h-5 text-gray-600" />
                <h4 className="font-bold text-lg text-gray-900">
                  What I Found in Your Notes
                </h4>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 paper-texture h-96 lg:h-[32rem] overflow-y-auto">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg font-medium">
                  {note.extracted_text}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-96 lg:h-[32rem] flex flex-col items-center justify-center">
              {note.processing_status === 'processing' ? (
                <div className="text-center py-12">
                  <div className="relative mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-gray-900 mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Reading Your Handwriting
                  </h3>
                  <p className="text-gray-600 font-medium max-w-sm mx-auto">
                    Taking my time to understand every word you wrote...
                  </p>
                </div>
              ) : note.processing_status === 'failed' ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Couldn't Read This One
                  </h3>
                  <p className="text-gray-600 font-medium max-w-sm mx-auto">
                    Sometimes handwriting is tricky! Try uploading again or with better lighting.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
