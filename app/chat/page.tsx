'use client';

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SafeImage } from '@/components/ui/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ApiResponse {
  role: 'assistant';
  content: string;
  error?: string;
  details?: string;
  loading?: boolean;
  estimatedTime?: string;
  loadingState?: {
    status: string;
    startTime: number;
    endTime: number;
    message: string;
    steps: {
      name: string;
      duration: number;
      status: string;
    }[];
  };
}

function LoadingIndicator({ loadingState }: { loadingState: ApiResponse['loadingState'] }) {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (!loadingState) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [loadingState]);

  if (!loadingState) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-blue-600 font-medium">Processing your quotes...</span>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Time Remaining:</span>
          <span className="text-blue-600 font-medium">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
        
        <div className="space-y-3">
          {loadingState.steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-2">
              {step.status === 'completed' ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : step.status === 'in_progress' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
              )}
              <span className={`text-sm ${
                step.status === 'completed' ? 'text-green-600' :
                step.status === 'in_progress' ? 'text-blue-600' :
                'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<ApiResponse['loadingState']>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    {
      text: '🛡️ Learn about our insurance options',
      query: 'What types of insurance do you offer?'
    },
    {
      text: '💰 Get pricing information',
      query: 'How much does final expense insurance cost?'
    },
    {
      text: '📝 Understand the application process',
      query: 'What is the application process like?'
    },
    {
      text: '🏥 Learn about medical requirements',
      query: 'Do you require a medical exam?'
    }
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.details || data.error || 'Failed to get response');
      }

      setLoadingState(data.loadingState);
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to get response');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

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
        <Card className="w-full h-[600px] p-6 flex flex-col bg-white shadow-lg">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-4"
          >
            {error && (
              <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
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
                  {quickQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(item.query)}
                      className="p-4 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="chat-avatar chat-avatar-assistant">
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
                      className={`chat-message ${
                        message.role === 'user'
                          ? 'chat-message-user'
                          : 'chat-message-assistant'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === 'user' && (
                      <div className="chat-avatar chat-avatar-user">
                        <span className="text-gray-600">You</span>
                      </div>
                    )}
                  </div>
                ))}
                {loadingState && <LoadingIndicator loadingState={loadingState} />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading || loadingState !== null}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading || loadingState !== null}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </Card>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="badge-container">
            <SafeImage src="/images/badges/secure.svg" alt="Secure Chat" width={24} height={24} />
            <span>Secure Chat</span>
          </div>
          <div className="badge-container">
            <SafeImage src="/images/badges/privacy.svg" alt="Privacy Protected" width={24} height={24} />
            <span>Privacy Protected</span>
          </div>
          <div className="badge-container">
            <SafeImage src="/images/badges/guarantee.svg" alt="Expert Assistance" width={24} height={24} />
            <span>Expert Assistance</span>
          </div>
        </div>
      </div>
    </main>
  );
} 