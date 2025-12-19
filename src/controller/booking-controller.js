const { StatusCodes } = require('http-status-codes');
const BookingService = require("../services/booking-service");

const bookingService = new BookingService();

const create = async (req, res) => {
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
            message:error.message,
            success:false,
            data:{},
            err:error.explanation

        })
    }

}

module.exports={
    create
}
