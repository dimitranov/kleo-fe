// import { useState, useEffect, useRef } from "react";

// export default function useLongPress(ms = 300) {
//   const [startLongPress, setStartLongPress] = useState(false);
//   const callbackRef = useRef<() => void>(() => {});

//   useEffect(() => {
//     let timerId: any;
//     if (startLongPress) {
//       timerId = setTimeout(callbackRef.current, ms);
//     } else {
//       clearTimeout(timerId);
//     }

//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [ms, startLongPress]);

//   return (callback: () => void) => ({
//     onMouseDown: () => {
//       callbackRef.current = callback;
//       setStartLongPress(true);
//     },
//     onMouseUp: () => setStartLongPress(false),
//     onMouseLeave: () => setStartLongPress(false),
//     onTouchStart: () => {
//       callbackRef.current = callback;
//       setStartLongPress(true);
//     },
//     onTouchEnd: () => setStartLongPress(false),
//   });
// }
import { useEffect, useState } from "react";

function useLongPress(callback: () => void, timeout: number) {
  const [isPressed, setIsPressed] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    let timer: number | null = null;

    function startTimer() {
      timer = window.setTimeout(() => {
        callback();
      }, timeout);
    }

    function clearTimer() {
      if (timer) {
        window.clearTimeout(timer);
      }
    }

    if (isPressed) {
      startTimer();
    } else {
      clearTimer();
    }

    return () => {
      clearTimer();
    };
  }, [isPressed, callback, timeout]);

  function handleMouseDown() {
    setIsPressed(true);
    setStartTime(Date.now());
  }

  function handleMouseUp() {
    setIsPressed(false);
  }

  function handleTouchStart() {
    setIsPressed(true);
    setStartTime(Date.now());
  }

  function handleTouchEnd() {
    setIsPressed(false);
  }

  return {
    onMouseUp: () => handleMouseUp(),
    onMouseDown: () => handleMouseDown(),
    onTouchStart: () => handleTouchStart(),
    onTouchEnd: () => handleTouchEnd(),
  };
}

export default useLongPress;
