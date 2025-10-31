
import React from 'react';
import type { Birthday } from '../types';

interface BirthdayItemProps {
  birthday: Birthday;
  daysUntil: number;
  onDelete: (id: string) => void;
}

const CakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
    <path d="M2 11a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" />
    <path d="M5 15a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
    <path d="M6 3.5a.5.5 0 01.5-.5h.5a.5.5 0 010 1H6.5a.5.5 0 01-.5-.5zM12 3.5a.5.5 0 01.5-.5h.5a.5.5 0 010 1h-.5a.5.5 0 01-.5-.5z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);


const BirthdayItem: React.FC<BirthdayItemProps> = ({ birthday, daysUntil, onDelete }) => {
  const formattedDate = new Date(birthday.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  const getDaysUntilText = () => {
    if (daysUntil === 0) {
      return <span className="font-bold text-indigo-600">Today! 🎉</span>;
    }
    if (daysUntil === 1) {
      return 'Tomorrow';
    }
    return `${daysUntil} days`;
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <CakeIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-md font-semibold text-slate-900">{birthday.name}</p>
          <p className="text-sm text-slate-500">{formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-sm text-slate-600 text-right">{getDaysUntilText()}</p>
        <button
          onClick={() => onDelete(birthday.id)}
          className="text-slate-400 hover:text-red-500 focus:outline-none focus:text-red-500 transition-colors"
          aria-label={`Delete ${birthday.name}'s birthday`}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
};

export default BirthdayItem;
