const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes"); 
const searchRouter = require("./routes/search");

const userRoutes = require("./routes/userRoutes"); 

const flightBooking = require("./routes/flightBooking");

const FlightRoute = require("./routes/flightRoutes");

const trainRoutes = require("./routes/trainRoutes");

const carRoutes = require("./routes/carRoutes");
const carBookingRoutes = require("./routes/carBookingRoutes");

dotenv.config();
 
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.models = {}; // clear mongoose cache

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");  
});

app.use(cors());
app.use(express.json());
 
app.use("/api/users", userRoutes); 


app.use("/api/hotels", hotelRoutes);   
app.use("/api/bookings", bookingRoutes);  
app.use("/api/search", searchRouter); 
app.use("/api/flights", FlightRoute);

app.use('/api/flight/bookings', flightBooking);
app.use("/api/trains", trainRoutes);

app.use("/api/cars", carRoutes);
app.use("/api/carBookings", carBookingRoutes);


const PORT = process.env.PORT || 5000;     
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});  
 