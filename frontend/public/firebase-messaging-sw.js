importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCf-Yi_XU5jINVZnA4rBhk9LEFMgMonhbM",
  authDomain: "campusbites-34eb1.firebaseapp.com",
  projectId: "campusbites-34eb1",
  storageBucket: "campusbites-34eb1.firebasestorage.app",
  messagingSenderId: "132614152120",
  appId: "1:132614152120:web:37245ac00e1c050d87794d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "Background notification:",
    payload
  );

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/favicon.svg",
    }
  );
});