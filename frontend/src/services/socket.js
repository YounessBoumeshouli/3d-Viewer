
let socket = null;

export function connectToReverb(channelName, onMessageCallback) {
    const REVERB_KEY = import.meta.env.VITE_REVERB_APP_KEY;
    const REVERB_HOST = import.meta.env.VITE_REVERB_HOST || '127.0.0.1';
    const REVERB_PORT = import.meta.env.VITE_REVERB_PORT || 8080;
        socket = new WebSocket(
            `ws://${REVERB_HOST}:${REVERB_PORT}/app/${REVERB_KEY}?protocol=7&client=js&version=1.0&flash=false`
        );

    socket.onopen = () => {
        console.log('🔌 Reverb WebSocket connected',channelName);
        socket.send(
            JSON.stringify({
                event: 'pusher:subscribe',
                data: {
                    channel: channelName,
                },
            })
        );
        console.log(`✅ Attempted to subscribe to channel: ${channelName}`);
    };

    socket.onmessage = (message) => {
        try {
            const rawData = message.data;
            const data = JSON.parse(rawData);
            console.log('📨 Received Raw:', rawData);
            console.log('📨 Parsed Data:', data);

            if (data.event === 'comment.added') {
                console.log('📤 Sending pong response');
                socket.send(JSON.stringify({
                    event: 'pusher:pong',
                    data: {}
                }));
            }

            if (data.event && data.event !== 'pusher:ping') {
                console.log(`🔔 Event received: `,data);
                if (data.data) {
                    console.log('📦 Event data:', typeof data.data === 'string' ? JSON.parse(data.data) : data.data);
                }
            }

            if (onMessageCallback) {
                onMessageCallback(data);
            }
        } catch (error) {
            console.error('Error processing message:', error, message.data);
        }
    };
    socket.onerror = (err) => {
        console.error('❌ WebSocket error:', err);
    };

    socket.onclose = (event) => {
        console.warn('❌ WebSocket connection closed', event.code, event.reason);
        setTimeout(() => {
            console.log('🔄 Attempting to reconnect...');
            connectToReverb(channelName, onMessageCallback);
        }, 3000);
    };

    return socket;
}

export function disconnectFromReverb() {
    if (socket) {
        socket.close();
        socket = null;
    }
}