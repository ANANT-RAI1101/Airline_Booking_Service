# Booking Service

## Overview

- The Booking Service is a core microservice in the Airline Management System. It is responsible for managing the end-to-end flight booking lifecycle, including seat reservation, booking creation, passenger details, booking status, and integration with other services such as Auth, Flight Search, and Notification/Reminder services.

### Project setup
- clone the project on your local
- execute `npm install` on the same on the same path as of your root directory of the downloaded project
- create `.env` file in the root directory and add `PORT 3000`
- setup mysql in your local
- go to the `src` folder from your terminal run `npx sequelize init`
- after that inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": <DB_NAME>,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- after setting up this go to the `src` folder from your terminal and execute `npx sequelize db:create`

## DB Design
- Booking Table

- to generate user table run `npx sequelize model:generate --name booking --attributes flightId:integer,userId:integer,status:enum,noOfSeats:integer,totalCost:integer`

after that figure out some migration attributes  based on your requirement  run `npx sequelize db:migrate`

#### setup channel and queues for message queue via rabbitmq for reminder service which itself is seperate service but publish message logic will stay with booking 

## API Endpoints

### Base URL: /api/v1/

- POST	`/booking` -> Create a new booking

- POST `/cancelBooking/:id` -> Cancel a booking
