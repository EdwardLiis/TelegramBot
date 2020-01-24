
var getJSON = require('get-json')
const url = "http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru"
getJSON(url, function(error, weather){
    
    let {temp} = weather.main
    let {description} = weather.weather[0]
    console.log(temp, description)
    console.log(weather)
    
})
var str = "артем давай погоду в киеве"

var exp = /иев/
var weath = /огод/

const match = (str, exp) => exp.exec(str) != null

//console.log(match(str, exp))

/*bot.onText(/\/weather (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1]; 

    var url = `http://api.openweathermap.org/data/2.5/weather?q=${resp}&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru`
    
    getJSON(url, function(error, weather){
    
        let {temp} = weather.main
        let {main} = weather.weather[0]
        console.log(temp, main)
        
    })
});*/


// if(match(str, exp) && match(str, weath)){
//     console.log("pogoda hui")
// }


