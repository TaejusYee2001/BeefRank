import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const username = useSelector(state => state.username); 
  const password = useSelector(state => state.password);
  const userID = useSelector(state => state.userID);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStartBeefFormOpen, setIsStartBeefFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [otheruser, setOtherUser] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsStartBeefFormOpen(false);
  };

  const handleMenuItemClick = (item) => {
    // Handle menu item click based on the selected item
    console.log('Clicked on:', item);
    // You can implement logic here to navigate to different pages or perform other actions
    if (item === 'Start Beef') {
      setIsStartBeefFormOpen(!isStartBeefFormOpen); 
    }
    else {
      setIsStartBeefFormOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1>{username}!</h1>
      <div className="menu">
        <button className="menu-icon" onClick={toggleMenu}>
          Menu
        </button>
        {isMenuOpen && (
          <div className="menu-items">
            <button onClick={() => handleMenuItemClick('Start Beef')}>Start Beef</button>
            <button onClick={() => handleMenuItemClick('Messages')}>Messages</button>
            <button onClick={() => handleMenuItemClick('Add Friend')}>Add Friend</button>
            <button onClick={() => handleMenuItemClick('Settings')}>Settings</button>
          </div>
        )}
      </div>
      {isStartBeefFormOpen && (
        <div className="create-beef-form-container">
          <h2>Enter A Title and Description For Your Beef</h2>
          <form className="beef-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter the beef title"
              id="title"
              name="title"
            />
            <label htmlFor="description">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter the description"
              id="description"
              name="description"
            />
            <label htmlFor="description">Who are you beefing with?</label>
            <input
              value={otheruser}
              onChange={(e) => setOtherUser(e.target.value)}
              type="text"
              placeholder="Enter the username"
              id="user2"
              name="user2"
            />
            <button type="submit">Create Beef</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;