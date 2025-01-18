'use client';

import React, { useState, FormEvent, useEffect, useRef } from 'react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  quickReplies?: string[];
}

interface ChatInterfaceProps {
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  preQualAnswers: Record<string, string>;
}

export default function ChatInterface({ userProfile, preQualAnswers }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: `Hi ${userProfile.firstName}! To help you find the best coverage, I'll need some information. Let's start with your state of residence.`,
      quickReplies: [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [collectedInfo, setCollectedInfo] = useState({
    state: '',
    gender: '',
    dob: '',
    height: '',
    weight: '',
    tobacco: '',
    coverageAmount: '',
    healthInfo: {
      nicotine: '',
      medications: '',
      heartConditions: '',
      lungConditions: '',
      bloodPressure: '',
      cancer: '',
      diabetes: '',
      stroke: '',
      hospitalStays: ''
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleMessage(inputMessage);
  };

  const handleMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;
    
    const newUserMessage = { type: 'user' as const, content: message };
    setInputMessage('');
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          userProfile,
          preQualAnswers,
          messageHistory: messages.map(m => ({
            role: m.type,
            content: m.content
          })),
          collectedInfo
        })
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.collectedInfo) {
        setCollectedInfo(prev => ({
          ...prev,
          ...data.collectedInfo
        }));
      }

      const responseContent = messages.length > 1 
        ? data.response.replace(/Hi.*?Grace\.?\s*/i, '').trim()
        : data.response;

      setMessages(prev => [...prev, { 
        type: 'assistant' as const, 
        content: responseContent,
        quickReplies: data.quickReplies
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    if (isLoading) return;
    handleMessage(reply);
  };

  return (
    <div className="h-[600px] flex flex-col bg-white rounded-lg shadow-lg p-6">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.map((message, index) => (
          <div key={index} className="space-y-2">
            <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-sm">G</span>
                </div>
              )}
              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.content}
              </div>
            </div>
            {message.type === 'assistant' && message.quickReplies && (
              <div className="flex flex-wrap gap-2 ml-10">
                {message.quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors text-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-600 text-sm">GS</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
} 