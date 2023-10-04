const mqtt = require('mqtt');
const brokerUrl = 'mqtt://broker.hivemq.com:1883';

// Define a single topic variable (placeholder)
const topic = '/+/Altitude';
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log(`MQTT connected for ${topic}`);
    client.subscribe(topic);
});

client.on('message', (receivedTopic, message) => {
    console.log(`Received message from topic: ${receivedTopic}`);

    // Parse the topic to extract relevant information (if needed)
    const topicParts = receivedTopic.split('/');
    const droneId = topicParts[1];

    // Handle different message types based on the topic
    if (receivedTopic.endsWith('/Battery')) {
        console.log(`Battery Level for Drone ${droneId}: ${message.toString()}%`);
    } else if (receivedTopic.endsWith('/Speed')) {
        console.log(`Speed for Drone ${droneId}: ${message.toString()} mph`);
    } else if (receivedTopic.endsWith('/LatLong')) {
        const { latitude, longitude } = JSON.parse(message.toString());
        console.log(`LatLong for Drone ${droneId}: Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
        console.log(`Message is: ${message.toString()}`);
    }
    console.log('');
});