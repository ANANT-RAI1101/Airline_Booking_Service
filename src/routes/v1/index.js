const express=require("express");
const router=express.Router();

const CityController=require("../../controller/booking-controller")

router.post('/booking',CityController.create);

module.exports=router;