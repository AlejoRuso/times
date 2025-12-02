import { useState, useEffect } from 'react';
import type { ClockProps } from '../types';

const Clock: React.FC<ClockProps> = ({ clock, onRemove }) => {
  const [time, setTime] = useState<Date>(new Date());

  const calculateTime = (timezoneOffset: number): Date => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + timezoneOffset * 3600000);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(calculateTime(clock.timezone));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [clock.timezone]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = (minutes * 6) + (seconds * 0.1);
  const secondAngle = seconds * 6;

  return (
    <div className="clock-card">
      <div className="clock-header">
        <h3>{clock.name}</h3>
        <button 
          onClick={() => onRemove(clock.id)}
          className="remove-button"
          aria-label="Удалить"
        >
          ×
        </button>
      </div>
      
      <div className="time-display">
        <div className="digital-clock">
          {formatTime(time)}
        </div>
        
        <div className="analog-clock">
          <div className="clock-face">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <div 
                key={num} 
                className="hour-mark"
                style={{ transform: `rotate(${num * 30}deg)` }}
              >
                <span style={{ transform: `rotate(${-num * 30}deg)` }}>
                  {num}
                </span>
              </div>
            ))}
            
            <div 
              className="hand hour-hand"
              style={{ transform: `rotate(${hourAngle}deg)` }}
            />
            
            <div 
              className="hand minute-hand"
              style={{ transform: `rotate(${minuteAngle}deg)` }}
            />
            
            <div 
              className="hand second-hand"
              style={{ transform: `rotate(${secondAngle}deg)` }}
            />
            
            <div className="center-dot" />
          </div>
        </div>
      </div>
      
      <div className="timezone-info">
        UTC {clock.timezone >= 0 ? '+' : ''}{clock.timezone}
      </div>
    </div>
  );
};

export default Clock;