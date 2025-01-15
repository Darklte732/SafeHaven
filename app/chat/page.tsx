'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SafeImage } from '@/components/ui/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chat with SafeHaven AI Assistant</h1>
          <p className="text-xl text-gray-600">
            Get instant answers about final expense insurance, coverage options, and more.
          </p>
        </div>
        
        {/* Chat Interface */}
        <Card className="w-full min-h-[600px] p-6 flex flex-col bg-white shadow-lg">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8 space-y-4">
                <div className="flex justify-center mb-6">
                  <SafeImage
                    src="/images/logo.svg"
                    alt="SafeHaven Logo"
                    width={60}
                    height={60}
                    className="opacity-50"
                  />
                </div>
                <p className="text-lg">👋 Hi! I'm your SafeHaven Insurance assistant.</p>
                <p>I can help you with:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
                  <button
                    onClick={() => setInput("What types of insurance do you offer?")}
                    className="p-4 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    🛡️ Learn about our insurance options
                  </button>
                  <button
                    onClick={() => setInput("How much does final expense insurance cost?")}
                    className="p-4 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    💰 Get pricing information
                  </button>
                  <button
                    onClick={() => setInput("What is the application process like?")}
                    className="p-4 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    📝 Understand the application process
                  </button>
                  <button
                    onClick={() => setInput("Do you require a medical exam?")}
                    className="p-4 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    🏥 Learn about medical requirements
                  </button>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center mr-2">
                      <SafeImage
                        src="/images/logo.svg"
                        alt="AI"
                        width={20}
                        height={20}
                        className="invert"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white ml-4'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
                      <span className="text-gray-600">You</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </Card>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <SafeImage src="/images/badges/secure.svg" alt="Secure Chat" width={24} height={24} />
            <span className="text-sm">Secure Chat</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <SafeImage src="/images/badges/privacy.svg" alt="Privacy Protected" width={24} height={24} />
            <span className="text-sm">Privacy Protected</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <SafeImage src="/images/badges/guarantee.svg" alt="Expert Assistance" width={24} height={24} />
            <span className="text-sm">Expert Assistance</span>
          </div>
        </div>
      </div>
    </main>
  );
} 