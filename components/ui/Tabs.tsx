'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'pills' | 'underline';
  className?: string;
  onChange?: (tabId: string) => void;
}

export function Tabs({
  tabs,
  defaultTab,
  variant = 'pills',
  className,
  onChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={className}>
      <div
        className={cn('flex', {
          'space-x-2': variant === 'pills',
          'border-b border-gray-200': variant === 'underline',
        })}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const textColorClass = isActive
            ? variant === 'pills'
              ? 'text-white'
              : 'text-blue-600'
            : 'text-gray-600 hover:text-gray-900';

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'relative px-4 py-2 text-sm font-medium transition-colors',
                textColorClass
              )}
            >
              {variant === 'pills' && isActive && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 bg-blue-600 rounded-full"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn('', {
              hidden: activeTab !== tab.id,
            })}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
} 
