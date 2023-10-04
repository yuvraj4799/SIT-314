const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

const droneName = 'Drone2'; // Replace with the actual name of the drone
const topicBattery = `/${droneName}/Battery`;
const topicLatLong = `/${droneName}/LatLong`;
const topicAltitude = `/${droneName}/Altitude`;
const topicSpeed = `/${droneName}/Speed`;

// Simulated data for Drone 2
const batteryLevel = 3;
const latitude = 34.0522; // Replace with actual latitude
const longitude = -118.2437; // Replace with actual longitude
const altitude = 150; // Replace with actual altitude
const speed = 25; // Replace with actual speed

client.on('connect', () => {
    console.log('MQTT connected for Drone 2');
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

// const droneName = 'Drone2';
// const topicBattery = `/${droneName}/Battery`;
// const topicLatLong = `/${droneName}/LatLong`;
// const topicAltitude = `/${droneName}/Altitude`;
// const topicSpeed = `/${droneName}/Speed`;

// client.on('connect', () => {
//     console.log('MQTT connected for Drone 2');
//     setInterval(() => {
//         // Generate random values within specified ranges
//         const batteryLevel = 91;
//         const latitude = 34.0522 + (Math.random() - 0.5) * 0.01; // Range: 34.0422 - 34.0622
//         const longitude = -118.2437 + (Math.random() - 0.5) * 0.01; // Range: -118.2537 - -118.2337
//         const altitude = 150 + (Math.random() - 0.5) * 10; // Range: 145 - 155
//         const speed = 25 + (Math.random() - 0.5) * 5; // Range: 20 - 30

//         // Publish data to respective topics
//         client.publish(topicBattery, batteryLevel.toString());
//         client.publish(topicLatLong, JSON.stringify({ latitude, longitude }));
//         client.publish(topicAltitude, altitude.toString());
//         client.publish(topicSpeed, speed.toString());
//     }, 5000); // Publish data every 5 seconds
// });
