import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthenticationContext';
import { client, getCSRFToken } from '../../AxiosInstance/AxiosInstance';

const GoogleLoginButton: React.FC = () => {
  const { setCurrentUser, setLoggedInWithGoogle, setToken, setCurrEmail, setCurrUsername } = useAuth();
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse: any) => {
    if (credentialResponse && credentialResponse.credential) {
      const googleToken = credentialResponse.credential;
      const csrfToken = getCSRFToken();

      try {
        const response = await client.post(
          '/api/auth/google-login',
          { token: googleToken },
          { headers: { "X-CSRFToken": csrfToken } }
        );

        const { token, email, username } = response.data;

        setToken(token);
        setCurrentUser(true);
        setCurrEmail(email);
        setCurrUsername(username);
        setLoggedInWithGoogle(true);

        localStorage.setItem('authToken', token);

        navigate('/');
        console.log('Google login success! Token:', token);
      } catch (error) {
        console.error('Google login failed:', error || 'Unknown error');
      }
    }
  };

  const onError = () => {
    console.log('Login failed');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

export default GoogleLoginButton;
