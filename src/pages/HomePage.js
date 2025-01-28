import { useState, useEffect } from "react";
import { requestNotificationPermission, onMessageListener } from "../firebase";
import axios from "axios";

export default function HomePage() {
    const [notification, setNotification] = useState(null);
    const [fcmToken, setFcmToken] = useState(null);
    const [apiResponse, setApiResponse] = useState(null); // Store API response
    const [apiCalled, setApiCalled] = useState(null); // Store the name of the API called
    const url = "https://leaponapi-test.herokuapp.com";
    // const url = "http://127.0.0.1:8000"

    useEffect(() => {
        navigator.serviceWorker.addEventListener("message", (event) => {
            if (event.data) {
                console.log("Received message from service worker: ", event);
                // if (event.data && event.data.notification.click_action) {
                //     window.open(event.data.notification.click_action, '_blank');
                // }
                setNotification(event.data.notification);
            }
        });
    }, []);

    useEffect(() => {
        onMessageListener()
            .then((payload) => {
                setNotification(payload.notification);
                console.log("Notification received: ", payload);
            })
            .catch((err) => console.log("Failed to receive foreground message: ", err));
    }, []);

    const handleRequestPermission = async () => {
        const token = await requestNotificationPermission();
        if (token) {
            console.log("FCM Token: ", token);
            setFcmToken(token);
            setApiCalled("requestNotificationPermission");
            setApiResponse({ message: "FCM Token generated successfully", token });
        } else {
            console.log("Permission denied for notifications.");
            setApiCalled("requestNotificationPermission");
            setApiResponse({ error: "Permission denied for notifications" });
        }
    };

    const handleSaveToken = async () => {
        if (!fcmToken) {
            console.error("No FCM token available. Please enable notifications first.");
            setApiCalled("handleSaveToken");
            setApiResponse({ error: "No FCM token available. Please enable notifications first." });
            return;
        }

        try {
            const response = await axios.post(url + "/api/notification/user_fcm_token/", {
                fcm_token: fcmToken,
                user_id: 1012,
            });
            console.log("FCM Token saved to backend: ", response.data);
            setApiCalled("handleSaveToken");
            setApiResponse(response.data);
        } catch (error) {
            console.error("Error saving FCM token to backend: ", error);
            setApiCalled("handleSaveToken");
            setApiResponse({ error: error.message });
        }
    };

    const handleScheduleNotification = async () => {
        try {
            const response = await axios.post(url + "/api/notification/schedule_notification/", {
                user_id: 1012,
            });
            console.log("Notification scheduled: ", response.data);
            setApiCalled("handleScheduleNotification");
            setApiResponse(response.data);
        } catch (error) {
            console.error("Error scheduling notification: ", error);
            setApiCalled("handleScheduleNotification");
            setApiResponse({ error: error.message });
        }
    };

    return (
        <div>
            <h1>Notifications</h1>
            <button onClick={handleRequestPermission}>Enable Notifications</button>
            <button onClick={handleSaveToken} disabled={!fcmToken}>
                Save FCM Token
            </button>
            <button onClick={handleScheduleNotification} disabled={!fcmToken}>
                Schedule "Ready to Network" Notification
            </button>

            {fcmToken && (
                <div>
                    <h3>Your FCM Token</h3>
                    <p>{fcmToken}</p>
                </div>
            )}

            {apiCalled && (
                <div>
                    <h3>Last API Called</h3>
                    <p>{apiCalled}</p>
                </div>
            )}

            {apiResponse && (
                <div>
                    <h3>API Response</h3>
                    <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
            )}

            {notification && (
                <div>
                    <h3>{notification.title}</h3>
                    <p>{notification.body}</p>
                </div>
            )}
        </div>
    );
}
