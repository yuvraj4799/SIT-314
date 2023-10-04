const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

const droneName = 'Drone1'; // Replace with the actual name of the drone
const topicBattery = `/${droneName}/Battery`;
const topicLatLong = `/${droneName}/LatLong`;
const topicAltitude = `/${droneName}/Altitude`;
const topicSpeed = `/${droneName}/Speed`;

// Simulated data for the drone
const batteryLevel = 9;
const latitude = 37.7749; // Replace with actual latitude
const longitude = -122.4194; // Replace with actual longitude
const altitude = 90; // Replace with actual altitude
const speed = 30; // Replace with actual speed

client.on('connect', () => {
    console.log('MQTT connected for Drone 1');
    setInterval(() => {
        // Publish data to respective topics
        client.publish(topicBattery, batteryLevel.toString());
        client.publish(topicLatLong, JSON.stringify({ latitude, longitude }));
        client.publish(topicAltitude, altitude.toString());
        client.publish(topicSpeed, speed.toString());
    }, 600000); // Publish data every 10 min = 600,000 milliseconds
});





// const mqtt = require('mqtt');
// const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

// const droneName = 'Drone1';
// const topicBattery = `/${droneName}/Battery`;
// const topicLatLong = `/${droneName}/LatLong`;
// const topicAltitude = `/${droneName}/Altitude`;
// const topicSpeed = `/${droneName}/Speed`;

// client.on('connect', () => {
//     console.log('MQTT connected for Drone 1');
//     setInterval(() => {
//         // Generate random values within specified ranges
//         const batteryLevel = 73;
//         const latitude = 37.7749 + (Math.random() - 0.5) * 0.01; // Range: 37.7649 - 37.7849
//         const longitude = -122.4194 + (Math.random() - 0.5) * 0.01; // Range: -122.4294 - -122.4094
//         const altitude = 100 + (Math.random() - 0.5) * 10; // Range: 95 - 105
//         const speed = 30 + (Math.random() - 0.5) * 5; // Range: 25 - 35

//         // Publish data to respective topics
//         client.publish(topicBattery, batteryLevel.toString());
//         client.publish(topicLatLong, JSON.stringify({ latitude, longitude }));
//         client.publish(topicAltitude, altitude.toString());
//         client.publish(topicSpeed, speed.toString());
//     }, 5000); // Publish data every 5 seconds
// });
