import { useState } from 'react';
import type { ClockData } from './types';
import Clock from './components/Clock';
import './App.css';

function App() {
  const [clocks, setClocks] = useState<ClockData[]>([
    { id: '1', name: 'Москва', timezone: 3 },
    { id: '2', name: 'Лондон', timezone: 0 },
  ]);
  
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('0');

  const handleAddClock = () => {
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

    setClocks((prevClocks) => [...prevClocks, newClock]);
    setName('');
    setTimezone('0');
  };

  const handleRemoveClock = (id: string) => {
    setClocks((prevClocks) => prevClocks.filter((clock) => clock.id !== id));
  };

  return (
    <div className="app">
      {/* Панель добавления */}
      <header className="header-panel">
        <div className="input-group">
          <label htmlFor="city-name">Название</label>
          <input
            id="city-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Город"
            maxLength={15}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="city-timezone">Временная зона</label>
          <div className="timezone-input-wrapper">
            <input
              id="city-timezone"
              type="number"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              min="-12"
              max="14"
              step="1"
              placeholder="0"
            />
            <span className="timezone-label">ч</span>
          </div>
        </div>
        
        <button 
          onClick={handleAddClock}
          className="add-button"
        >
          Добавить
        </button>
      </header>

      {/* Сетка часов */}
      <main className="clocks-grid">
        {clocks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🕐</div>
            <p>Нет добавленных часов</p>
            <p className="empty-hint">Добавьте первый город выше</p>
          </div>
        ) : (
          clocks.map((clock) => (
            <Clock
              key={clock.id}
              clock={clock}
              onRemove={handleRemoveClock}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;