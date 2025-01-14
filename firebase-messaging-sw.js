importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAmXt2xlbAvumRs5R-T1qzJY5v4FF9kkc8",
    authDomain: "real-time-notifications-37a88.firebaseapp.com",
    projectId: "real-time-notifications-37a88",
    storageBucket: "real-time-notifications-37a88.firebaseapp.com",
    messagingSenderId: "316091359035",
    appId: "1:316091359035:web:0962975e41aa2d6f51e11e",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo192.png', // Customize with your own icon
        data: payload.data,
    };

    // Show the notification
    self.registration.showNotification(notificationTitle, notificationOptions);
    // messaging.onBackgroundMessage((payload) => {
    //     console.log("Received background message: ", payload);
    //     self.registration.showNotification(payload.notification.title, {
    //         body: payload.notification.body,
    //         icon: payload.notification.icon,
    //     });
    // });
    // Send the notification to the React app
    // self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
    //     clients.forEach((client) => {
    //         client.postMessage(payload.notification);
    //     });
    // });
});
