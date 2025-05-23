import React, { useState } from 'react';
import { Alert } from '../types/weather';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface WeatherAlertsProps {
  alerts?: Alert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set());
  
  if (!alerts || alerts.length === 0) {
    return null;
  }
  
  // Toggle alert expansion
  const toggleAlert = (index: number) => {
    const newExpanded = new Set(expandedAlerts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedAlerts(newExpanded);
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Weather Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div 
            key={index}
            className="bg-red-500 bg-opacity-20 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300"
          >
            <div 
              className="px-4 py-3 flex justify-between items-center cursor-pointer"
              onClick={() => toggleAlert(index)}
            >
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <h3 className="font-semibold text-white">{alert.event}</h3>
                  <p className="text-xs text-white opacity-80">
                    {formatDate(alert.start)} - {formatDate(alert.end)}
                  </p>
                </div>
              </div>
              {expandedAlerts.has(index) ? (
                <ChevronUp className="h-5 w-5 text-white" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white" />
              )}
            </div>
            
            {expandedAlerts.has(index) && (
              <div className="px-4 py-3 border-t border-white border-opacity-20">
                <p className="text-sm text-white">{alert.description}</p>
                <p className="text-xs text-white opacity-80 mt-2">Source: {alert.sender_name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
