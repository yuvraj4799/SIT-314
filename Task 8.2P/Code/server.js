const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

const subscribedTopic = '/myTopic';
client.on('connect', () => {
    client.subscribe(subscribedTopic);
    console.log('mqtt connected');
});

client.on('message', (topic, message) => {
    console.log('Received message from Topic: ' + topic);
    console.log('Message is: ' + message.toString());
});
