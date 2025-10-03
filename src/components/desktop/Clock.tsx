'use client';

import { useState, useEffect } from 'react';

const Clock = () => {
  const [dateTime, setDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setDateTime(new Date());
    const timerId = setInterval(() => {
      setDateTime(new Date());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(timerId);
  }, []);

  if (!dateTime) {
    return <div className="text-sm font-medium w-36 text-right">&nbsp;</div>;
  }
  
  const timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateString = dateTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="text-sm font-medium w-36 text-right px-2">
      <div>{timeString}</div>
      <div className='text-xs text-muted-foreground'>{dateString}</div>
    </div>
  );
};

export default Clock;
