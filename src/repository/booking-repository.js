const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models/index');
const { AppError, ValidationError } = require('../utils/error/index');


class BookingRepository{

async create(data) {
    try {
        const booking=await Booking.create(data);
        return booking
    } catch (error) {
        if(error.name=="SequelizeValidationError"){
            throw new ValidationError(error);
        }
        throw new AppError(
            'Repository Error',
            'Cannot create Booking',
            'There was some issue creating the booking, please try again later',
             StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}

async update(id,data){
    try {
        const response=await Booking.update(data,{
        where:{
            id:id
        }
    });
    return response;
    } catch (error) {
        throw new AppError(
            'RepositoryError', 
                'Cannot update Booking', 
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        
    }
}
}

module.exports=BookingRepository;