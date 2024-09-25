import { googleLogout } from '@react-oauth/google';
import { useAuth } from './AuthenticationContext';
import { useNavigate } from 'react-router-dom';

const GoogleLogoutButton: React.FC = () => {
    const { setCurrentUser, setLoggedInWithGoogle, setToken, setCurrEmail, setCurrUsername } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        setCurrentUser(false);
        setLoggedInWithGoogle(false);
        setToken(null);
        setCurrEmail(null);
        setCurrUsername(null);
        localStorage.removeItem('authToken');
        navigate('/');
        console.log('Logout successful!');
    };

    const handleLogout = () => {
        googleLogout();
        onLogout();
    };

    return (
        <div id="signOutButton">
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default GoogleLogoutButton;
