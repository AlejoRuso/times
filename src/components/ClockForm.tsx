import { useState, type FormEvent } from 'react';
import type { ClockData } from '../types';

interface ClockFormProps {
  onAdd: (clock: ClockData) => void;
}

const ClockForm: React.FC<ClockFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('0');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Введите название города');
      return;
    }

    const timezoneNum = parseFloat(timezone);
    if (isNaN(timezoneNum) || timezoneNum < -12 || timezoneNum > 14) {
      alert('Временная зона должна быть от -12 до +14 часов');
      return;
    }

    const newClock: ClockData = {
      id: Date.now().toString(),
      name: name.trim(),
      timezone: timezoneNum,
    };

    onAdd(newClock);
    setName('');
    setTimezone('0');
  };

  return (
    <form onSubmit={handleSubmit} className="clock-form">
      <div className="form-group">
        <label htmlFor="name">Название города:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например: Москва"
          maxLength={20}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="timezone">Часовой пояс (от UTC):</label>
        <input
          type="number"
          id="timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          min="-12"
          max="14"
          step="0.5"
        />
        <span className="timezone-help">Часов (-12 до +14)</span>
      </div>
      
      <button type="submit" className="add-button">
        Добавить часы
      </button>
    </form>
  );
};

export default ClockForm;