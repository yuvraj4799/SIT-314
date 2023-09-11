// const mqtt = require('mqtt');
// const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
// const topic = '/myTopic';
// const message = 'My message';

// client.on('connect', () => {
//     console.log('mqtt connected');
//     client.publish(topic, message);
//     console.log('published to Topic: ' + topic + ' with Message: ' + message);
// });



const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
const topic = '/myTopic';
const message = "Hello everyone. My name is Yuvraj Bansal, and this is task 8.2P. I'm demonstrating that I am able to send data and the subscriber can also receive it. Thank you.";

client.on('connect', () => {
    console.log('mqtt connected');
    client.publish(topic, message);
    console.log('published to Topic: ' + topic + ' with Message: ' + message);
});
