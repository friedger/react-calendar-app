/**
  This helper is for showing Desctop notifications in the browser

  Usage:
    import * as desctopNotificaton from 'helpers/Notification';
    desctopNotificaton.requestPermission();
    requestPermission.show('Message title', 'message body');
*/
// Notification polyfill
import 'html5-notification/dist/Notification';

/* eslint-disable no-alert */
function isNotificationAvailable() {
  return ('Notification' in window);
}

export function requestPermission() {
  if (isNotificationAvailable() && (Notification.permission !== 'granted')) {
    Notification.requestPermission();
  }
}

export function show(title, body) {
  const showNotification = () => {
    /* eslint-disable no-unused-vars */
    const notification = new Notification(title, {
      body,
    });
    /* eslint-enable no-unused-vars */
  };

  if (!isNotificationAvailable()) {
    alert(body);
  } else if (Notification.permission === 'granted') {
    showNotification();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        showNotification();
      }
    });
  }
}
