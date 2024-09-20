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