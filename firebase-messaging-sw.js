importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmXt2xlbAvumRs5R-T1qzJY5v4FF9kkc8",
    authDomain: "real-time-notifications-37a88.firebaseapp.com",
    projectId: "real-time-notifications-37a88",
    storageBucket: "real-time-notifications-37a88.appspot.com",
    messagingSenderId: "316091359035",
    appId: "1:316091359035:web:0962975e41aa2d6f51e11e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message', payload);

    // Handle notification click
self.addEventListener('notificationclick', function (event) {
    console.log('[firebase-messaging-sw.js] notificationclick', payload);

    event.notification.close(); // Close the notification

    const clickAction = data?.url || webpush?.fcm_options?.link;


    if (clickAction) {
        // Redirect to the specified URL
        event.waitUntil(clients.openWindow(clickAction));
    }
});
});


