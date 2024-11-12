// notification.js
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} alert-box`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
