import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [level, setLevel] = useState(1); // Start with level 1

  useEffect(() => {
    // Function to handle messages from the iframe
    const handleMessage = (event) => {
      // Check for the specific 'captcha-completed' message from neal.fun
      if (event.data.type === "captcha-completed") {
        // Log for debugging
        console.log(`CAPTCHA for level ${level} completed!`);

        // Increment the level to load the next captcha
        setLevel(prevLevel => prevLevel + 1);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("message", handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [level]); // Re-run effect if level changes to update the console log

  return (
    <div className="App">
      <h1>My Robot Game</h1>
      <div className="game-container">
        <iframe
          // Dynamically set the src attribute using the current level state
          src={`https://embed.neal.fun/not-a-robot/level${level}`}
          width="100%"
          height="600"
          frameBorder="0"
          title={`Neal.fun CAPTCHA Level ${level}`}
        ></iframe>
      </div>
      <p>
        You are currently playing level **{level}**.
      </p>
    </div>
  );
}

export default App;