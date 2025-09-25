import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [level, setLevel] = useState(1); // Start with level 1

  useEffect(() => {
    const handleMessage = (event) => {
      // Keep the origin check for security
      // Note: When proxied, the origin seen by the browser in the iframe *might* still be neal.fun
      // or it might be null/your domain depending on strictness and browser.
      // Keep it targeting "https://embed.neal.fun" for robustness if neal.fun is the source of message events.
      if (event.origin !== "https://embed.neal.fun") {
        console.log("Message received from unknown origin:", event.origin);
        return;
      }
      if (event.data.type === "captcha-completed") {
        console.log(`CAPTCHA for level ${level} completed!`);
        setLevel(prevLevel => prevLevel + 1);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [level]);

  // Use the proxied URL for the iframe src
  const iframeSrc = `/neal-proxy/not-a-robot/${level}`;

  // Debugging log remains useful
  console.log('DEBUG: iframe src being used (via proxy):', iframeSrc);

  return (
    <div className="App">
      <h1>My Robot Game</h1>
      <div className="game-container">
        <iframe
          src={iframeSrc} // Proxied source
          width="100%"
          height="600"
          frameBorder="0"
          title={`Neal.fun CAPTCHA Level ${level}`}
        ></iframe>
      </div>
      <p>
        You are currently playing level {level}.
      </p>
    </div>
  );
}

export default App;
