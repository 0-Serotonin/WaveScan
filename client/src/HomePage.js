import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function HomePage() {
    const [formInput, setFormInput] = useState({
        projectName: "",
        scanningMode: "GANTRY",
        scanDimensionX : 0,
        scanDimensionY : 0,
        scannerFrequency: 0.0
    });
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/validateForm", formInput)
            .then(res => {
                if(res.status === 200){
                    axios.get("/getImageLink")
                        .then(res => {
                            console.log(res.data.imageUrl);
                            navigate("/image", {state: {imageUrl: res.data.imageUrl}});
                        })
                }
            })
            .catch(res => {
                const errors = res.response.data.errors;
                var errorMessage = "Your input is not accepted. Pleaese make the following changes: ";
                var newLine = "\r\n";
                errorMessage += newLine;
                errors.forEach(err => {
                    switch(err.param){
                        case "projectName":
                            errorMessage += "Please enter more than 3 characters for your Project Name";
                            errorMessage += newLine;
                             break;
                        case "scanDimensionX":
                            errorMessage += "Please enter a number bigger than or equal to 1 for Scan Dimension X";
                            errorMessage += newLine;
                            break;
                        case "scanDimensionY":
                            errorMessage += "Please enter a number bigger than or equal to 1 for Scan Dimension Y";
                            errorMessage += newLine;
                            break;
                        case "scannerFrequency":
                            errorMessage += "Please enter a number bigger than or equal to 1 for Scanner Frequency";
                            errorMessage += newLine;
                            break;
                        default:
                            break;
                    }
                })
                alert(errorMessage);
            })
        
    }
  return (
    <div className='background'>
        <div className='forum'>
            <form onSubmit={handleSubmit}>
                <label>Project Name</label>
                <input
                    type="text"
                    required
                    onChange={(e) => {  
                        setFormInput({...formInput, projectName: e.target.value})}}
                />
                <label>Scanning Mode</label>
                <select onChange={(e) => setFormInput({...formInput, scanningMode: e.target.value})}>
                    <option value="GANTRY">GANTRY</option>
                    <option value="CRAWLER">CRAWLER</option>
                    <option value="AUTO">AUTO</option>
                    <option value="MANUAL">MANUAL</option>
                    <option value="ARM">ARM</option>
                </select>
                <label>Scan Dimensions (cm) </label>
                <div className='dimension-block'>
                    <label className='dimension-label'>X</label>
                    <input
                        className="dimension-input"
                        type="text"
                        required
                        onChange={(e) => setFormInput({...formInput, scanDimensionX: e.target.value})}
                    />
                    <label className='dimension-label'>Y</label>
                    <input
                        className="dimension-input"
                        type="text"
                        required
                        onChange={(e) => setFormInput({...formInput, scanDimensionY: e.target.value})}
                    />
                </div>
                    <label>Scanner Frequency (GHz)</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setFormInput({...formInput, scannerFrequency: e.target.value})}
                    />
                
                <button type="submit">SCAN</button>
            </form>
        </div>
    </div>
    
  )
}

export default HomePage