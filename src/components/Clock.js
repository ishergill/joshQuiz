import React, { useState, useEffect } from "react";

const Clock = () => {

    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    useEffect(() => {
        let countDownDate = new Date().getTime() + 30 * 60 * 1000;
        let x = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setMinute(minutes);
            setSecond(seconds);
            if (distance < 3) {
                clearInterval(x);
            }
        }, 1000);
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center pt-3">Time Left: {`${minute}m ${second}s`}</div>
        </>
    );
};

export default Clock;
