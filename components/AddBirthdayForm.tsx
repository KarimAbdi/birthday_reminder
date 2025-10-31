
import React, { useState } from 'react';

interface AddBirthdayFormProps {
  onAddBirthday: (name: string, date: string) => void;
}

const AddBirthdayForm: React.FC<AddBirthdayFormProps> = ({ onAddBirthday }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) {
      setError('Both name and date are required.');
      return;
    }
    setError('');
    onAddBirthday(name, date);
    setName('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-slate-50 rounded-b-xl border-t border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Add a new birthday</h3>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
      >
        Add Birthday
      </button>
    </form>
  );
};

export default AddBirthdayForm;
