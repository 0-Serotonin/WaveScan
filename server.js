const express = require("express");
const app = express();
const cors = require("cors");
const { body, validationResult } = require('express-validator');

app.use(cors())
app.use(express.json());

const port = process.env.PORT;

app.get("/getImageLink", (req,res) =>{
    res.status(200).json({imageUrl : "https://drive.google.com/uc?export=view&id=1dmtW4Rxx8aHNL2DxlXkxNnOONOiYhRO9"});
})

app.post(
    "/validateForm", 
    body("projectName").isLength({min: 3}),
    body("scanningMode").isIn(["GANTRY", "CRAWLER", "AUTO", "MANUAL", "ARM"]),
    body("scanDimensionX").isInt({min: 1}),
    body("scanDimensionY").isInt({min: 1}),
    body("scannerFrequency").isFloat({min:1}),
    (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        else{
            return res.status(200).json({message: "Successful"});
        }
    }
)

app.listen(port, () => {
    console.log("Server started on port ", port);
})