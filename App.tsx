
import React, { useState, useEffect } from 'react';
import AddBirthdayForm from './components/AddBirthdayForm';
import BirthdayList from './components/BirthdayList';
import type { Birthday } from './types';

const App: React.FC = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>(() => {
    try {
      const storedBirthdays = localStorage.getItem('birthdays');
      return storedBirthdays ? JSON.parse(storedBirthdays) : [];
    } catch (error) {
      console.error("Failed to parse birthdays from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('birthdays', JSON.stringify(birthdays));
    } catch (error) {
      console.error("Failed to save birthdays to localStorage", error);
    }
  }, [birthdays]);

  const handleAddBirthday = (name: string, date: string) => {
    const newBirthday: Birthday = {
      id: new Date().toISOString() + Math.random(), // simple unique id
      name,
      date,
    };
    setBirthdays(prevBirthdays => [...prevBirthdays, newBirthday]);
  };

  const handleDeleteBirthday = (id: string) => {
    setBirthdays(prevBirthdays => prevBirthdays.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex items-center justify-center p-4">
      <main className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <header className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Birthday Reminder</h1>
            <p className="mt-1 opacity-90">{birthdays.length} upcoming {birthdays.length === 1 ? 'birthday' : 'birthdays'}</p>
          </header>
          
          <div className="bg-slate-50">
            <BirthdayList birthdays={birthdays} onDelete={handleDeleteBirthday} />
          </div>

          <AddBirthdayForm onAddBirthday={handleAddBirthday} />
        </div>
        <footer className="text-center mt-6 text-sm text-slate-500">
          <p>All data is stored securely in your browser.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
