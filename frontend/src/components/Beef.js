
import { useState, useEffect } from 'react';

const Beef = ({ beef_info }) => {
  const { title, description, user1, user2, votesForUser1, votesForUser2, createdAt } = beef_info;
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response1 = await fetch(`http://localhost:4000/api/user/${user1}`); 
        const response2 = await fetch(`http://localhost:4000/api/user/${user2}`);
        if (!response1.ok || !response2.ok) {
            throw new Error('Failed to fetch usernames');
        }
        const user1Data = await response1.json(); 
        const user2Data = await response2.json(); 
        setUsernames({ user1: user1Data.username, user2: user2Data.username });
      }
      catch (error) {
        console.error("Error fetching usernames:", error); 
      }
    }

    fetchUsernames(); 
  }, [])

  const handleVoteButtonClick = (button) => {
    console.log(button, " clicked");
  }

  return (
    <div className="beef">
      <h1>{title}</h1>
      <p>{description}</p>
      <h2>{usernames.user1} VS {usernames.user2}</h2>
      <div className="vote-buttons">
        <button onClick={() => handleVoteButtonClick('Button1')}>{votesForUser1}</button>
        <button onClick={() => handleVoteButtonClick('Button2')}>{votesForUser2}</button>
      </div>
      <p>Beef started on {new Date(createdAt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short'})}</p>
    </div>
  )
}

export default Beef