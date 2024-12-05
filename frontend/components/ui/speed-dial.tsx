'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionItem {
  label: string;
  icon: React.ReactNode;
  value: string;
}

interface SpeedDialProps {
  actions: ActionItem[];
  onClick?: (value: string) => void;
}

export default function SpeedDial({ actions, onClick }: SpeedDialProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Speed Dial on hover or click
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div
      className='fixed bottom-8 right-8 z-50'
      onMouseLeave={handleClose}
    >
      {/* Action buttons with tooltips */}
      <div
        className={cn('flex flex-col items-center space-y-4 transition-all duration-300 mb-6', {
          'opacity-100': isOpen,
          'opacity-0 invisible': !isOpen,
        })}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            className='relative flex items-center group'
          >
            {/* Tooltip */}
            <span className='absolute right-14 px-2 py-1 bg-white text-gray-700 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100'>
              {action.label}
            </span>
            {/* Action button */}
            <button
              onClick={() => onClick?.(action.value)}
              className='bg-white text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-200 transition-transform transform active:scale-90'
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Speed Dial Button */}
      <button
        onMouseEnter={handleOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform transform active:scale-90',
          { 'rotate-45': isOpen }
        )}
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
