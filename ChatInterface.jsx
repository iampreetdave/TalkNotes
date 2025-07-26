
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, Bot, User, Heart, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/entities/ChatMessage";
import { InvokeLLM } from "@/integrations/Core";

export default function ChatInterface({ note }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (note?.id) {
      loadChatHistory();
    }
  }, [note?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatHistory = async () => {
    if (!note?.id) return;
    try {
      const history = await ChatMessage.filter({ note_id: note.id }, 'created_date');
      setMessages(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !note?.extracted_text || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to UI immediately
    const tempUserMessage = {
      id: Date.now(),
      message: userMessage,
      is_user_message: true,
      created_date: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMessage]);

    try {
      // Save user message to database
      await ChatMessage.create({
        note_id: note.id,
        message: userMessage,
        is_user_message: true
      });

      // Get AI response with more human-like prompting
      const response = await InvokeLLM({
        prompt: `You are a friendly, thoughtful assistant having a conversation about someone's handwritten notes. Be warm, conversational, and helpful - like a good friend who's genuinely interested in understanding their thoughts.

Here are the handwritten notes we're discussing:
"${note.extracted_text}"

The person is asking: "${userMessage}"

Please respond in a natural, conversational way. Be specific when referencing their notes, ask follow-up questions when appropriate, and show genuine interest in their thoughts. If you can't find the answer in their notes, acknowledge that warmly and offer to help in other ways.`,
      });

      // Add AI response to UI
      const aiMessage = {
        id: Date.now() + 1,
        message: response,
        is_user_message: false,
        created_date: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Save AI response to database
      await ChatMessage.create({
        note_id: note.id,
        message: response,
        is_user_message: false
      });

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        message: "Oops! I got a bit tongue-tied there. Mind asking that again? I'm all ears! 😊",
        is_user_message: false,
        created_date: new Date().toISOString()
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!note || note.processing_status !== 'completed') {
    return (
      <Card className="warm-shadow border-2 border-gray-200 bg-white">
        <CardContent className="p-12 text-center">
          <div className="mb-6">
            <Coffee className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto -mt-8 ml-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            Coffee's Ready, Waiting for Your Notes
          </h3>
          <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
            Upload your handwritten thoughts first, and we'll have a wonderful conversation about them!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="warm-shadow border-2 border-gray-200 h-full flex flex-col bg-white">
        <CardHeader className="bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-xl border border-gray-200 warm-shadow">
                <MessageCircle className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 block">
                  Let's Chat About Your Notes
                </span>
                <span className="text-sm text-gray-500 font-normal">
                  I'm here to help you understand
                </span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-96">
            <AnimatePresence>
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto border-2 border-gray-200">
                      <Bot className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      <Coffee className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ready to Dive Into Your Thoughts!
                  </h3>
                  <p className="text-gray-600 font-medium max-w-sm mx-auto">
                    Ask me anything about what you wrote. I've read through everything carefully.
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex ${msg.is_user_message ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-4xl ${
                      msg.is_user_message ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center warm-shadow ${
                        msg.is_user_message 
                          ? 'bg-gray-900' 
                          : 'bg-gray-100 border-2 border-gray-200'
                      }`}>
                        {msg.is_user_message ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-gray-700" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-5 py-4 warm-shadow border-2 max-w-sm ${
                        msg.is_user_message
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-800 border-gray-200'
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed font-medium">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center warm-shadow">
                    <Bot className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="bg-white rounded-2xl px-5 py-4 warm-shadow border-2 border-gray-200">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      <span className="text-gray-600 font-medium ml-2">thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-lg">
            <div className="flex space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What would you like to know about your notes?"
                disabled={isLoading}
                className="flex-1 border-2 border-gray-300 focus:border-gray-900 rounded-2xl px-5 py-3 text-lg font-medium bg-white"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-6 py-3 warm-shadow hover:shadow-lg transition-all duration-300 border-2 border-gray-900 disabled:bg-gray-400"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
