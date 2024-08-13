import { useState, useEffect, useRef } from 'react';

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
       
        <div className="flex flex-col items-center border-4 border-black rounded-full bg-white p-6 mt-24 mx-5 sm:mx-20">
            <div className="text-5xl font-mono font-bold text-gray-800 mb-6">
                {formatTime()}
            </div>
            <div className="flex space-x-4 ">
                <button onClick={start} className="bg-green-500 text-white text-[14px] sm:text-[20px] font-bold py-2 sm:py-4 px-4 rounded hover:bg-green-400">
                    Start
                </button>
                <button onClick={stop} className="bg-red-500 text-white text-[14px] sm:text-[20px] font-bold py-2 sm:py-4 px-4 rounded hover:bg-red-400">
                    Stop
                </button>
                <button onClick={reset} className="bg-blue-500 text-white text-[14px] sm:text-[20px] font-bold py-2 sm:py-4 px-4 rounded hover:bg-blue-400">
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Stopwatch;
