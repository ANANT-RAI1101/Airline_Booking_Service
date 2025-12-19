const BookingRepository=require("../repository/booking-repository");

const { StatusCodes } = require('http-status-codes');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { AppError, ServiceError } = require('../utils/error/index');

class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }

    async create(data){
        try {
            const flightId=data.flightId;
            const flightURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            console.log(flightURL);
            const response=await axios.get(flightURL);
            console.log('Flight API data:', response.data);
            const flightData=response.data.data;
            const priceOfTheFlight=flightData.price;
            if(data.noOfSeats>flightData.totalSeats){
                throw new ServiceError("something went wrong : insufficient seats in the flight")
            }
            const totalCost=data.noOfSeats * priceOfTheFlight;
            const booking = await this.bookingRepository.create({
                ...data,totalCost
            })
            const updateFlightURL=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`
            await axios.patch(updateFlightURL,{totalSeats: flightData.totalSeats - booking.noOfSeats});
            const finalBooking=await this.bookingRepository.update(booking.id,{status: "Booked"})
            return finalBooking;
            
        } catch (error) {
            if(error.name=="ValidationError"|| error.name=="Repository Error"){
                throw  error
            }
            throw new ServiceError()
        }
    }
}

module.exports=BookingService;