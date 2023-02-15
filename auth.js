import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-north-1', // Cognito region
    userPoolId: 'eu-north-1_4taDddVXH', // User pool ID
    userPoolWebClientId: '5fetar0pehrrdb451i5ucol4p5', // Client ID (app client)
  },
  oauth: {
    domain: 'auth-demo.auth.eu-north-1.amazoncognito.com', // Cognito domain (without "https://")
    redirectSignIn: 'http://localhost:5173/', // App client callback URL
    redirectSignOut: 'http://localhost:5173/', // App client sign-out URL
    responseType: 'code', // OAuth grant type (code is recommended)
  },
});

// auth.js
const button = document.getElementById('auth');
Auth.currentAuthenticatedUser()
  .then((user) => {
    // Woop, the user is signed in!
    const email = user.signInUserSession.idToken.payload.email;
    button.textContent = `Sign out ${email}`;
    button.addEventListener('click', () => Auth.signOut());
  })
  .catch(() => {
    // The user is not signed in...
    document.getElementById('auth').textContent = 'Sign in';
    button.addEventListener('click', () => Auth.federatedSignIn());
  });
