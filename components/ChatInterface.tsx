'use client';

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import ClientOnly from '@/components/ClientOnly';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  quickReplies?: string[];
  quotes?: Array<{
    coverageAmount: number;
    monthlyRate: number;
    tier: 'Bronze' | 'Silver' | 'Gold';
  }>;
  quoteError?: {
    message: string;
    code: string;
    isRetryable: boolean;
  };
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

function ChatInterfaceContent({ userProfile, preQualAnswers }: ChatInterfaceProps) {
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
        quickReplies: data.quickReplies,
        quotes: data.quotes,
        quoteError: data.quoteError
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
    <div className="h-[600px] flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
        {messages.map((message, index) => (
          <div key={index} className="space-y-2">
            <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                  <span className="text-blue-600 dark:text-blue-300 text-sm">G</span>
                </div>
              )}
              <div className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                {message.content}
                {message.quotes && (
                  <div className="mt-4 space-y-4">
                    {message.quotes.map((quote, i) => (
                      <div key={i} className={`p-4 rounded-lg ${
                        quote.tier === 'Gold' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700' :
                        quote.tier === 'Silver' ? 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600' :
                        'bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-700'
                      }`}>
                        <div className="font-semibold text-lg mb-1">{quote.tier} Protection</div>
                        <div className="text-lg">Coverage: ${quote.coverageAmount.toLocaleString()}</div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">Monthly Rate: ${quote.monthlyRate.toFixed(2)}</div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          ✓ 24-hour claims processing<br/>
                          ✓ Locked-in rates<br/>
                          ✓ No medical exam required<br/>
                          ✓ Coverage never expires
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {message.quoteError && (
                  <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700">
                    <div className="font-semibold text-red-600 dark:text-red-400 mb-1">Quote Generation Error</div>
                    <div className="text-gray-700 dark:text-gray-300">{message.quoteError.message}</div>
                    {message.quoteError.isRetryable && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Don't worry! We can try again with the same information.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {message.type === 'assistant' && message.quickReplies && (
              <div className="flex flex-wrap gap-2 ml-10">
                {message.quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-white dark:bg-gray-800 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm"
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
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
              <span className="text-blue-600 dark:text-blue-300 text-sm">G</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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

const LoadingChat = () => (
  <div className="h-[600px] flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div className="flex-1 mb-4 space-y-4">
      <div className="animate-pulse space-y-4">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-2/3 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg"></div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex gap-2">
      <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="w-20 h-10 bg-blue-200 dark:bg-blue-900 rounded-lg"></div>
    </div>
  </div>
);

export default function ChatInterface(props: ChatInterfaceProps) {
  return (
    <ClientOnly fallback={<LoadingChat />}>
      <ChatInterfaceContent {...props} />
    </ClientOnly>
  );
} 