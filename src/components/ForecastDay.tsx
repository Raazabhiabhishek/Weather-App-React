interface ForecastDayProps {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

export default function ForecastDay({ date, temp, description, icon }: ForecastDayProps) {
  return (
    <div className="bg-white/20 p-4 rounded-2xl shadow-md flex flex-col items-center">
      <p className="font-medium">{date}</p>
      <img src={icon} alt={description} className="w-12 h-12" />
      <p className="text-lg font-bold">{Math.round(temp)}°C</p>
      <p className="text-sm capitalize">{description}</p>
    </div>
  );
}
