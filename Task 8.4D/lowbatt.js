// Define MQTT broker details
const mqtt = require('mqtt');
const brokerUrl = 'mqtt://broker.hivemq.com:1883';

// Define topics
const batteryTopics = ['/Drone1/Battery', '/Drone2/Battery']; // Add topics for all drones

// Create an MQTT client instance
const client = mqtt.connect(brokerUrl);

// Store battery levels for all drones
const batteryLevels = {};

// Define a topic filter to listen to all battery topics
const batteryFilter = '/+/Battery';

client.on('connect', () => {
    console.log('MQTT connected for Battery Monitoring');
    client.subscribe(batteryFilter);
});

client.on('message', (receivedTopic, message) => {
    // Extract drone ID from the topic
    const droneId = receivedTopic.split('/')[1];

    // Store or update battery level for the respective drone
    batteryLevels[droneId] = parseInt(message.toString());

    // Check if more than two drones have battery levels below 10
    const lowBatteryDrones = Object.keys(batteryLevels).filter((drone) => batteryLevels[drone] < 10);

    if (lowBatteryDrones.length > 2) {
        // Publish an alert message
        const alertMessage = `Low battery alert: More than two drones have battery levels below 10%`;
        client.publish('/+/Battery', alertMessage.toString());
        console.log(alertMessage);
    }
});
