const express=require("express");
const router=express.Router();

const BookingController=require("../../controller/booking-controller")

router.post('/booking',BookingController.create);
router.post('/cancelBooking/:id',BookingController.cancel)

module.exports=router;