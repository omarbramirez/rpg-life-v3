import { useState, useEffect } from "react";

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Limpiar el intervalo al desmontar el componente
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      };
    }

    return timeLeft;
  }

  const { days, hours } = timeLeft;

  return (
    <div>
      <h3>Deadline</h3>
      {days !== undefined ? (
        <ul>
          <li>
            <p>{days} días</p>
          </li>
          <li>
            <p>{hours} horas</p>
          </li>
        </ul>
      ) : (
        <p>¡La fecha ya ha pasado!</p>
      )}
    </div>
  );
}

export default Countdown;
