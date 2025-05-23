import React from 'react';
import { WeatherData, Units } from '../types/weather';
import { ForecastDay } from './ForecastDay';

interface ForecastProps {
  data: WeatherData;
  units: Units;
}

export function Forecast({ data, units }: ForecastProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.forecast.map((day, index) => (
          <ForecastDay key={day.dt} day={day} units={units} />
        ))}
      </div>
    </div>
  );
}
