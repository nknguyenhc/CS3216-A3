declare module 'gapi-script' {
    export const gapi: {
        load: (name: string, callback: () => void) => void;
        auth2: {
            init: (params: {
                clientId: string; 
                scope: string; 
                prompt?: string;
            }) => void;
            getAuthInstance: () => {
                signIn: () => Promise<gapi.auth2.GoogleUser>;
            };
        };
    };
}

declare namespace gapi {
    namespace auth2 {
        interface GoogleUser {
            getBasicProfile: () => {
                getId: () => string;
                getName: () => string;
                getImageUrl: () => string;
                getEmail: () => string;
            };
        }
    }
}