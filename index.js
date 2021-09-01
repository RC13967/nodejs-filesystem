import express from "express"; //express server
const app = express();
 import dotenv from "dotenv";
 dotenv.config();
import fs from "fs";  // for CRUD on  file 
 const PORT = process.env.PORT;
 app.get("/", (request, response)=>{
     response.send("append URL with '/getfiles' ");
 });
//creates a text file and writes data in it
app.post("/postfiles", (request, response) => {
    //current date and time
    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let today = day + "-" + month + "-" + year;
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = hour + "." + minutes + "." + seconds;
    fs.writeFile(`${today}-${time}.txt`, `${Date.now()}`, function (err) {
        response.send([today, time]);
    });
});

//retrieves all text files
app.get("/getfiles", (request, response) => {
    let result = [];
    fs.readdir(".././nodejs-filesystem", function (err, files) {
        //listing all files using forEach
        files.forEach(function (file) {
            //filtering text files
            if(file.slice(file.length - 3,file.length) == "txt"){
                fs.readFile(file, "utf8", function (err,data){ 
          console.log(data);  //printing data from all text files
                });
            } 
        });
    });
    response.send("data retrieved");
});
app.listen(PORT, () => console.log("The server is started"));