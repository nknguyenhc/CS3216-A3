import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const clientId: string = '577083967585-ofhpvr34hgknf49vacjpkpth8n2gklub.apps.googleusercontent.com';

const GoogleLoginButton: React.FC = () => {

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('profileObj' in response) {
            console.log("Login success! Current user: ", response.profileObj);
        }
    }

    const onFailure = (response: any) => {
        console.log("Login failed! response: ", response);
    }

    return (
        <div>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default GoogleLoginButton;
