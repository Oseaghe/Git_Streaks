import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { fetchStreaks } from './utils/api';
import StreakCard from './components/StreakCard';
import './App.css';

function App() {
  const [usernames, setUsernames] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    const list = usernames.split(',').map(u => u.trim()).filter(Boolean);
    if (list.length === 0) return;
    setLoading(true);
    try {
        console.log(list);
      const data = await fetchStreaks(list);
      setResults(data);

    } catch (error) {
      alert("Error fetching streaks.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="App">
        <h1>🔥 GitHub Streak Tracker</h1>
        <input
            type="text"
            placeholder="Enter usernames (comma separated)"
            value={usernames}
            onChange={e => setUsernames(e.target.value)}
        />
        <button onClick={handleFetch}>Check Streaks</button>

        {loading && <p>Loading...</p>}

        <div className="results">
          {results.map((user, idx) => (
              <StreakCard key={idx} user={user} />
          ))}
        </div>
      </div>
  );
}

export default App;

