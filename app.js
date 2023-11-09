const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine",'ejs');

var temperature =0 ,description="" , imageURL ="", feelsLike="", pressure = 0, humidity = 0;
var query = "";



app.get("/",(req,res)=>{
    res.render("weather",{weatherIcon:imageURL, locationName: query, temp :temperature,description:description, feelsLike:feelsLike,pressure:pressure,humidity:humidity});

});
app.post("/",(req,res)=>{
    
    query = req.body.cityName;
    const apiKey ="f441659939177a846c5f2e56f38eb85e";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey+"&units=metric";

    https.get(url,(response)=>{
        console.log(response.statusCode);

        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            temperature = weatherData.main.temp;
            description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            feelsLike = weatherData.main.feels_like;
            pressure = weatherData.main.pressure;
            humidity = weatherData.main.humidity;
 
            // res.write("<h1>The temperature in "+ query+" is : "+temp +"</h1>");
            // res.write("The weather description is "+ descirption);
            // res.write("<img src="+ imageURL+ ">");
            // res.send();
            
            
        })
        res.redirect("/");
    })
   



})





app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});