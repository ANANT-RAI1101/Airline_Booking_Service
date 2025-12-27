const { StatusCodes } = require('http-status-codes');
const BookingService = require("../services/booking-service");
const { createChannel, publishMessage } = require('../utils/message-queue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingRepository {
    constructor() {
    }

    async sendMessageToQueue(req,res){
        
            const channel=await createChannel();
            const data={message: 'Success'};
            publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
            return res.status(200).json({
            message: 'Succesfully published the event'
        });
    }

    async create(req, res) {
        try {
            const booking = await bookingService.create(req.body);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: booking
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {},
                err: error.explanation

            })
        }
    }

    async cancel(req, res) {
        try {
            const response = await bookingService.cancel(req.params.id);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully cancelled booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {},
                err: error.explanation
            })
        }
    }
}

module.exports = BookingRepository;