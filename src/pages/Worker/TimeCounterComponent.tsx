import { useState, useEffect } from 'react';

const TimeCounter = ({ createdAt }: {createdAt: string}) => {
  const [currentTime, setCurrentTime] = useState(new Date(Date.now() - new Date(createdAt).getTime()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>{ currentTime.getDate() < 1 ? currentTime.toLocaleTimeString() : 'over 1 day' }</>
  );
};

export default TimeCounter;