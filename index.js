import express from "express"; //express server
import { MongoClient } from "mongodb"; //needed this to connect with client
const app = express();
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";  // for CRUD on  file 
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
async function createconnection(){
    return new MongoClient(MONGO_URL).connect();
  }
//creates a text file and writes data in it
app.post("/postfiles", async (request, response) => {
    const client = await createconnection();
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
app.get("/getfiles", async (request, response) => {
    let result = [];
    const client = await createconnection();
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