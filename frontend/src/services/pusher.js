import Pusher from 'pusher-js';

Pusher.logToConsole = true;

const pusher = new Pusher('9489520ad5774181a55c', {
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: 'https://api.buildin3d.store/api/broadcasting/auth',
    auth: {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content
        }
    }
});

export default pusher;