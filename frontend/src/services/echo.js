import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-key',
    cluster: 'your-cluster',
    encrypted: true,
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: true,
    disableStats: true,
});

export default echo;