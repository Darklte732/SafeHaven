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
  loadingState?: LoadingState;
}

interface LoadingState {
  status: string;
  startTime: number;
  endTime: number;
  message: string;
  steps: {
    name: string;
    duration: number;
    status: string;
  }[];
}

function LoadingIndicator({ loadingState }: { loadingState: LoadingState | null }) {
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
  const [loadingState, setLoadingState] = useState<LoadingState | undefined>(undefined);
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
      text: '💰 Get Your Free Quote Now',
      query: 'I would like to get a quote',
      followUpOptions: [
        'Show me rates under $50/month',
        'Get quote for $10,000 coverage',
        'Get quote for $25,000 coverage'
      ]
    },
    {
      text: '🎯 Find My Perfect Coverage',
      query: 'Help me find the right coverage',
      followUpOptions: [
        'Coverage for final expenses',
        'Coverage for my family',
        'Coverage under $1 per day'
      ]
    },
    {
      text: '💎 Special Offers Available',
      query: 'What special offers do you have?',
      followUpOptions: [
        'First month free offer',
        'Senior discount rates',
        'No medical exam options'
      ]
    },
    {
      text: '⚡ Quick & Easy Application',
      query: 'Start my application',
      followUpOptions: [
        'Apply in 5 minutes',
        'No medical exam needed',
        'Instant approval possible'
      ]
    },
    {
      text: '🤝 Talk to an Expert',
      query: 'Connect with an agent',
      followUpOptions: [
        'Get $500 off by talking to agent now',
        'Free consultation available',
        'Speak to licensed advisor'
      ]
    }
  ];

  // Add state for follow-up options
  const [showFollowUps, setShowFollowUps] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAgreement, setShowAgreement] = useState(false);

  // Function to handle follow-up option click
  const handleFollowUpClick = (option: string) => {
    setSelectedOption(option);
    setShowAgreement(true);
  };

  const handleAgree = () => {
    if (selectedOption) {
      setInput(selectedOption);
      handleSubmit(new Event('submit') as any);
      setShowAgreement(false);
      setSelectedOption(null);
      setShowFollowUps(null);
      setLoadingState(undefined); // Reset loading state to enable input
    }
  };

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
                    <div key={index} className="space-y-2">
                      <button
                        onClick={() => {
                          setInput(item.query);
                          setShowFollowUps(showFollowUps === item.query ? null : item.query);
                        }}
                        className="quick-option group"
                      >
                        {item.text}
                        <span className="quick-option-arrow">
                          →
                        </span>
                      </button>
                      {showFollowUps === item.query && (
                        <div className="follow-up-container">
                          {item.followUpOptions.map((option, optIndex) => (
                            <button
                              key={optIndex}
                              onClick={() => handleFollowUpClick(option)}
                              className="follow-up-option"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
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
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 sticky bottom-0 bg-white p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 h-12"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 h-12 text-lg font-medium shadow-lg rounded-md"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Video Section with Arrows */}
        <div className="relative mt-12 mb-12">
          {/* Left Arrow */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 hidden md:block">
            <div className="flex items-center">
              <div className="w-16 h-2 bg-blue-600"></div>
              <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-blue-600"></div>
            </div>
          </div>

          {/* Right Arrow */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 hidden md:block">
            <div className="flex items-center">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-12 border-r-blue-600"></div>
              <div className="w-16 h-2 bg-blue-600"></div>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="w-full aspect-video bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-gray-500 text-lg">Video Coming Soon</span>
          </div>
        </div>

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
      {showAgreement && selectedOption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Your Choice</h3>
            <p className="text-gray-600 mb-6">I agree to receive information about insurance options and rates for: {selectedOption}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAgreement(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAgree}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 