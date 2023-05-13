const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useUnifiedTopology: true, })
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err))

const PORT = process.env.PORT || 5500;



app.listen(PORT, () => {
    console.log(`Srever is running on port ${PORT}`);
});

app.use("/user", require("./Routes/user_route"));
