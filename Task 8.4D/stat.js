// Define MQTT broker details
const mqtt = require('mqtt');
const brokerUrl = 'mqtt://broker.hivemq.com:1883';

// Define topics
const altitudeTopics = ['/Drone1/Altitude', '/Drone2/Altitude']; // Add topics for all drones
const latLongTopics = ['/Drone1/LatLong', '/Drone2/LatLong']; // Add topics for all drones

// Create an MQTT client instance
const client = mqtt.connect(brokerUrl);

// Store altitude and movement data for all drones
const altitudeData = {};
const movementData = {};

// Define a topic filter to listen to all altitude and movement topics
const altitudeFilter = '/+/Altitude';
const latLongFilter = '/+/LatLong';

client.on('connect', () => {
    console.log('MQTT connected for Altitude and Movement Monitoring');
    client.subscribe(altitudeFilter);
    client.subscribe(latLongFilter);
});

client.on('message', (receivedTopic, message) => {
    // Extract drone ID from the topic
    const droneId = receivedTopic.split('/')[1];

    // Update altitude data when received
    if (altitudeTopics.includes(receivedTopic)) {
        altitudeData[droneId] = parseInt(message.toString());
    }

    // Update movement data when received
    if (latLongTopics.includes(receivedTopic)) {
        movementData[droneId] = JSON.parse(message.toString());
    }

    // Check for stationary drones at high altitude
    const currentTime = new Date().getTime();
    for (const drone in altitudeData) {
        if (altitudeData[drone] > 100) {
            const alertMessage = `Stationary at high altitude alert: Drone ${drone} has been stationary for more than 10 minutes at altitude above 100 meters`;
            client.publish('/+/Altitude', alertMessage);
            console.log(alertMessage);
        }
    }
});
