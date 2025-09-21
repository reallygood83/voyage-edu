'use client';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

const DatePicker = ({ value, onChange, min, max }: DatePickerProps) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      max={max}
      className="input-field w-full"
    />
  );
};

export default DatePicker;