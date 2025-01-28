// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmXt2xlbAvumRs5R-T1qzJY5v4FF9kkc8",
  authDomain: "real-time-notifications-37a88.firebaseapp.com",
  projectId: "real-time-notifications-37a88",
  storageBucket: "real-time-notifications-37a88.firebasestorage.app",
  messagingSenderId: "316091359035",
  appId: "1:316091359035:web:0962975e41aa2d6f51e11e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);


// Request Notification Permission
export const requestNotificationPermission = async () => {
  
    try {
      const token = await getToken(messaging, {vapidKey: "BE9WpBqnBOipzPE79uUbO84y8gwu473Je0dO8BT_BAejVsr8LbnCekxxwB9LJbCwSv0pntYGHjA_OBmBcwqn3JA"});
      if (token) {
        
        console.log("FCM Token:", token);
        return token;
      } else {
        console.log("No registration token available. Request permission to generate one.");
        return null;
      }
    } catch (error) {
      console.error("An error occurred while retrieving token.", error);
      return null;
    }
  };
  
  // Listen for messages when the app is in the foreground
  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
        if (payload.data && payload.data.url) {
          window.open(payload.data.url, '_blank');
      }
      });
    });
  
  export default app;