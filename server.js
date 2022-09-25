const express = require("express");
const app = express();
const cors = require("cors");
const { body, validationResult } = require('express-validator');
const path = require('path');

app.use(cors())
app.use(express.json());

require('dotenv').config()
const PORT = process.env.PORT || 3001

app.get("/getImageLink", (req,res) =>{
    res.status(200).json({imageUrl : "https://drive.google.com/uc?export=view&id=1dmtW4Rxx8aHNL2DxlXkxNnOONOiYhRO9"});
})

app.post(
    "/validateForm", 
    body("projectName").isAlpha().isLength({min: 3}),
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

if(process.env.NODE_ENV === 'production'){
        app.use(express.static('client/build'))
        app.get('*', (req,res) =>{
                res.sendFile(path.resolve(__dirname, 'client' , 'public', 'index.html'))
        })
}



app.listen(PORT, () =>{
        console.log(`Server is listening on port ${PORT}`);
})