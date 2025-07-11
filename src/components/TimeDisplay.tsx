import React, { useEffect, useState } from "react";

const TimeDisplay: React.FC = () => {
  const [time, setTime] = useState("");
  const [DMY, setDMY] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
      setDMY(
        new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="self-center">
      <h3 className="text-xl font-semibold text-secondary mb-1 text-right">{DMY}</h3>
      <p className="text-base text-right">{time}</p>
    </div>
  );
};

export default TimeDisplay;
