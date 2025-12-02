import type { ClockData } from '../types';
import Clock from './Clock';

interface ClockListProps {
  clocks: ClockData[];
  onRemoveClock: (id: string) => void;
}

const ClockList: React.FC<ClockListProps> = ({ clocks, onRemoveClock }) => {
  if (clocks.length === 0) {
    return (
      <div className="empty-state">
        <p>Добавьте первый часовой пояс</p>
        <p>Используйте форму выше</p>
      </div>
    );
  }

  return (
    <div className="clock-list">
      {clocks.map((clock) => (
        <Clock
          key={clock.id}
          clock={clock}
          onRemove={onRemoveClock}
        />
      ))}
    </div>
  );
};

export default ClockList;