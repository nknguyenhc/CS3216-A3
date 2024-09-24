/*
import { GoogleLogout } from 'react-google-login';

const clientId: string = '577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com';

const GoogleLogoutButton: React.FC = () => {

    const onSuccess = () => {
        console.log("Logout successfull!")
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default GoogleLogoutButton;
*/

import { googleLogout } from '@react-oauth/google';
import { useAuth } from './AuthenticationContext';
import { useNavigate } from 'react-router-dom';

const GoogleLogoutButton: React.FC = () => {
    const { setCurrentUser, setLoggedInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        setCurrentUser(false);
        setLoggedInWithGoogle(false);
        navigate("/");
        console.log("Logout successful!");
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