
import React, { useMemo } from 'react';
import type { Birthday } from '../types';
import BirthdayItem from './BirthdayItem';

interface BirthdayListProps {
  birthdays: Birthday[];
  onDelete: (id: string) => void;
}

const getDaysUntilNextBirthday = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Parse date string like "YYYY-MM-DD" to avoid timezone issues.
    const [year, month, day] = dateString.split('-').map(Number);
    
    let nextBirthday = new Date(today.getFullYear(), month - 1, day);

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = nextBirthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
};


const BirthdayList: React.FC<BirthdayListProps> = ({ birthdays, onDelete }) => {

  const sortedBirthdays = useMemo(() => {
    return [...birthdays]
      .map(b => ({ ...b, daysUntil: getDaysUntilNextBirthday(b.date) }))
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [birthdays]);


  if (birthdays.length === 0) {
    return (
      <div className="text-center p-12">
        <h3 className="text-lg font-medium text-slate-700">No birthdays yet!</h3>
        <p className="text-slate-500 mt-2">Add a birthday below to get started.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200">
      {sortedBirthdays.map((birthday) => (
        <BirthdayItem
          key={birthday.id}
          birthday={birthday}
          daysUntil={birthday.daysUntil}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default BirthdayList;
