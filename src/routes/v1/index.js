const express=require("express");
const BookingController  = require('../../controller/booking-controller');
const router=express.Router();
const bookingController=new BookingController();



router.post('/booking',bookingController.create);
router.post('/publish', bookingController.sendMessageToQueue);
router.post('/cancelBooking/:id',bookingController.cancel)

module.exports=router;