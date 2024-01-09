import { useState, useEffect } from 'react';

const TimeCounter = ({ createdAt }: { createdAt: string }) => {
  const calculateTimeDifference = () => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();

    // Calculate the local timezone offset and adjust the createdAtDate
    const timezoneOffsetInMs = now.getTimezoneOffset() * 60 * 1000;
    const adjustedCreatedAtDate = new Date(createdAtDate.getTime() - timezoneOffsetInMs);

    return new Date(now.getTime() - adjustedCreatedAtDate.getTime());
  };

  const [timeDifference, setTimeDifference] = useState(calculateTimeDifference());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(calculateTimeDifference());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>{ timeDifference.getDate() < 2 ? timeDifference.toLocaleTimeString() : 'over 1 day' }</>
  );
};

export default TimeCounter;