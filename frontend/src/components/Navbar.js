import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate('/');
        dispatch({ type: 'LOG_OUT' });
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleHomeClick = () => {
        navigate('/home');
    };

    return (
        <header>
            {isLoggedIn ? (
                <div className="container">
                    <button onClick={handleProfileClick}>Profile Page</button>
                    <button onClick={handleHomeClick}>Beefreal</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="container">
                    <h1>Welcome to BeefRank, the Best Platform for Settling Public Disputes</h1>
                </div>
            )}
        </header>
    );
};

export default Navbar;