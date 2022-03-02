import React, {FC, useEffect, useState} from 'react';
import './ExpiryCounter.css';

interface ExpiryCounterProps {
    timerExpired: () => void
}

const ExpiryCounter: FC<ExpiryCounterProps> = (props) => {

    let [time, setTime] = useState(10);

    useEffect(() => {
        if (time <= 0) {
            props.timerExpired();
            return;
        }

        const timeout = setTimeout(() => {
            setTime(prevTimeLeft => prevTimeLeft - 1);
        }, 1000);

        return () => { clearTimeout(timeout); }
    }, [time]);

    return <div className="ExpiryCounter" data-testid="ExpiryCounter">
        <div className="ExpiryCounter_Title">Expires in</div>
        <div className="ExpiryCounter_Minutes">{Math.floor(time / 60)}</div>
        <div className="ExpiryCounter_Seconds">{time % 60}</div>
    </div>
};

export default ExpiryCounter;
