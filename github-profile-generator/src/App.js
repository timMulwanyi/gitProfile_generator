import React, { useState } from 'react';
import './App.css';
import Search from './Search'; 
import Profile from './Profile';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null); // Define error state

  const fetchUserProfile = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Unable to fetch user data: ${error.message}`);
    }
  };

  const handleUserSearch = (username) => {
    // Clear any previous errors
    setError(null);

    // Call the fetchUserProfile function to fetch user data
    fetchUserProfile(username)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        setError(error.message);
        setUserData(null);
      });
  };

  return (
    <div className="App">
      <h1>Github Profile Generator</h1>
      <Search onSearch={handleUserSearch} />
      {error && <p className='error'>{error}</p>}
      <Profile userData={userData} />
    </div>
  );
}

export default App;
