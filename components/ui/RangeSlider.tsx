'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface RangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
  leftLabel?: string;
  rightLabel?: string;
}

const RangeSlider = forwardRef<HTMLInputElement, RangeSliderProps>(
  ({ className, value, min, max, step, formatValue, leftLabel, rightLabel, onChange, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const formattedValue = formatValue ? formatValue(value) : value.toString();

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">
            {leftLabel || formattedValue}
          </label>
          {rightLabel && (
            <span className="text-sm text-gray-500">{rightLabel}</span>
          )}
        </div>
        <div className="relative">
          <input
            type="range"
            ref={ref}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
            className={cn(
              'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'range-slider',
              className
            )}
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
            }}
            {...props}
          />
          <style jsx global>{`
            .range-slider {
              -webkit-appearance: none;
              appearance: none;
            }
            
            .range-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              background: white;
              border: 2px solid #3B82F6;
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.15s ease-in-out;
            }
            
            .range-slider::-webkit-slider-thumb:hover {
              background: #3B82F6;
              transform: scale(1.1);
            }
            
            .range-slider::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background: white;
              border: 2px solid #3B82F6;
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.15s ease-in-out;
            }
            
            .range-slider::-moz-range-thumb:hover {
              background: #3B82F6;
              transform: scale(1.1);
            }
          `}</style>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';

export { RangeSlider }; 