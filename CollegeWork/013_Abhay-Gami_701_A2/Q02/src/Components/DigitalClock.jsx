import { useState, useEffect } from 'react';

export default function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="card p-4 text-center shadow-sm bg-dark text-white">
            <h3>Requirement 5: Digital Clock</h3>
            <div className="display-4 my-2 text-warning">{time.toLocaleTimeString()}</div>
        </div>
    );
}