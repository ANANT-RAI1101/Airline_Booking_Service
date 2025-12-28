const amqplib = require("amqplib")
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');

let channel;
const createChannel = async () => {
    try {
        if (channel) return channel;

        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
        return channel;
    } catch (error) {
        throw error;
    }
}

const getChannel = () => {
    if (!channel) throw new Error('RabbitMQ channel not initialized');
    return channel;
}

const publishMessage = async (binding_key, message) => {
    try {
        const channel= getChannel();
        await channel.assertQueue('REMINDER_QUEUE', { durable: true });
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (service, binding_key) => {
    try {
        const channel= getChannel();
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE', { durable: true });
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
        channel.consume(applicationQueue.queue, msg => {
            console.log("received data");
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString());
            service(payload);
            channel.ack(msg);
        })
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    publishMessage,
    subscribeMessage,
    getChannel
}