import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Example WebSocket server URL

export default socket;
