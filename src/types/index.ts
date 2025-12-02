export interface ClockData {
  id: string;
  name: string;
  timezone: number;
}

export interface ClockProps {
  clock: ClockData;
  onRemove: (id: string) => void;
}