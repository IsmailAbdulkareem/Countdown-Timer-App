"use client"; // Enables client-side rendering for this component

import { useState, useRef, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component

export default function Countdown() {
  // State to manage the duration input
  const [duration, setDuration] = useState<number | string>("");
  // State to manage the countdown timer value
  const [timeLeft, setTimeLeft] = useState<number>(0);
  // State to track if the timer is active
  const [isActive, setIsActive] = useState<boolean>(false);
  // State to track if the timer is paused
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // Reference to store the timer ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // State to manage the selected theme mode (light or dark)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // default to dark mode

  // Function to handle setting the duration of the countdown
  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration); // Set the countdown timer
      setIsActive(false); // Reset active state
      setIsPaused(false); // Reset paused state
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to start the countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true); // Set the timer as active
      setIsPaused(false); // Unpause the timer if it was paused
    }
  };

  // Function to pause the countdown timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true); // Set the timer as paused
      setIsActive(false); // Set the timer as inactive
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to reset the countdown timer
  const handleReset = (): void => {
    setIsActive(false); // Set the timer as inactive
    setIsPaused(false); // Set the timer as not paused
    setTimeLeft(typeof duration === "number" ? duration : 0); // Reset the timer to the original duration
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Function to clear the duration and the countdown timer
  const handleClear = (): void => {
    setDuration(""); // Clear the duration input
    setTimeLeft(0); // Reset the time left to 0
    setIsActive(false); // Set the timer as inactive
    setIsPaused(false); // Set the timer as not paused
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // useEffect hook to manage the countdown interval
  useEffect(() => {
    // If the timer is active and not paused
    if (isActive && !isPaused) {
      // Set an interval to decrease the time left
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          // If time is up, clear the interval
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          // Decrease the time left by one second
          return prevTime - 1;
        });
      }, 1000); // Interval of 1 second
    }
    // Cleanup function to clear the interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]); // Dependencies array to rerun the effect

  // Function to format the time left into mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds
    // Return the formatted string
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to handle changes in the duration input field
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || ""); // Update the duration state
  };

  // Function to toggle between light and dark mode
  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode); // Toggle the theme between light and dark
  };

  // JSX return statement rendering the Countdown UI
  return (
    // Container div for centering the content with dynamic theme class
    <div
      className={`flex items-center justify-center h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Timer box container */}
      <div
        className={`shadow-lg rounded-xl p-8 w-full max-w-md ${
          isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className={`flex-1 mr-4 rounded-md ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-gray-200"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, reset, and clear the timer */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={handleStart}
            variant="outline"
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Reset
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Clear
          </Button>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex justify-center  mb-4">
          <Button
            onClick={toggleTheme}
            variant="outline"
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
