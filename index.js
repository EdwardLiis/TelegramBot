const fs = require("fs");
const SerhId = "309124685";

var chatId = -1001315892389
var TelegramBot = require('node-telegram-bot-api');

var token = '907526211:AAHdR8GCDZ6rHXVCTAS-4rX04bOcf3oa4WU';

var dictionary = fs.readFileSync("dictionary.txt", "utf8");

var arrayOfStrings = dictionary.split("\n");

var url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"

var getJSON = require('get-json')



var numberOfWords = arrayOfStrings[arrayOfStrings.length-1][0] - 1 + 1;

var bot = new TelegramBot(token, { polling: true });

getJSON(url, function(error, currencyData){
    
    console.log(currencyData)
    console.log(currencyData[0].ccy)
    console.log(`1 Доллар США = ${currencyData[0].buy} Гривні`)
})


function getWord(string, word){

    arr = string.split(" ");

    for (i = 0; i < arr.length; i++) {
        if (arr[i] == word){
            return true
        }
    }
}

function probability(){
    var rand = Math.floor(Math.random() * 100)
    if(rand<35){
        return true
    }
    else return false
}


function randText(arr,msg){

    var rand =  Math.floor(Math.random() * (arr.length )); 

    bot.sendMessage(msg.chat.id,arr[rand], {reply_to_message_id:msg.message_id})
}   


bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id; 
    var resp = match[1]; 
    bot.sendMessage(fromId, resp);
});



bot.onText(/\/change/, function (msg) {
    var fromId = msg.chat.id; 

    bot.editMessageText(msg.chat.message)
});



bot.onText(/\/add (.+)/, function (msg, match) {
    var chatId = msg.chat.id; 
    var resp = match[1]; 
    numberOfWords++

    fs.appendFileSync("dictionary.txt", "\n" + numberOfWords + "."+ resp )
    bot.sendMessage(chatId, "Слово " + resp + " добавлено в словарь");
});



bot.onText(/\/ghoul/, function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    bot.sendAudio(chatId, "Tokyo Ghoul Opening.mp3");
});

/*bot.onText(/\/money/, function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    getJSON(url, function(error, currencyData){
        console.log(currencyData)
        bot.sendMessage(chatId, `1 Доллар США = ${currencyData[0].buy} Гривні 
1 Евро = ${currencyData[1].buy} Гривні 
1 Рубль = ${currencyData[2].buy} Гривні 
1 Биткоин = ${currencyData[3].buy} Гривні`);
    })
});*/

function getCurrency () {
	getJSON(url, function(error, currencyData){
        bot.sendMessage(chatId, `1 Доллар США = ${currencyData[0].buy} Гривні 
1 Евро = ${currencyData[1].buy} Гривні 
1 Рубль = ${currencyData[2].buy} Гривні 
1 Биткоин = ${currencyData[3].buy} Гривні`);
    })
}

function getWeather () {
    const urlHark = "http://api.openweathermap.org/data/2.5/weather?q=Харьков&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru"
    const urlKiev = "http://api.openweathermap.org/data/2.5/weather?q=Киев&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru"
    const urlRzeszow = "http://api.openweathermap.org/data/2.5/weather?q=Rzeszow&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru"
    getJSON(urlHark, function(error, weather){
    
        let {temp} = weather.main
        let {description} = weather.weather[0]
        console.log(temp, description)
        bot.sendMessage(chatId, `Сейчас в Харькове ${temp} градусов и ${description}`) 
    })
    getJSON(urlKiev, function(error, weather){
    
        let {temp} = weather.main
        let {description} = weather.weather[0]        
        console.log(temp, description)
        bot.sendMessage(chatId, `Сейчас в Киеве ${temp} градусов и ${description}`) 
    })
    getJSON(urlRzeszow, function(error, weather){
    
        let {temp} = weather.main
        let {description} = weather.weather[0]
        console.log(temp, description)
        bot.sendMessage(chatId, `Сейчас в Жешуве ${temp} градусов и ${description}`) 
    })
}



bot.onText(/\/money/, function (msg) {
	getCurrency();
});

bot.on('message', function (msg) {
    var message = msg.text;
    var chatId = msg.chat.id; 
    if(getWord(message, "доллар")||getWord(message, "Доллар")||getWord(message, "долларам")||getWord(message, "Долларам")||getWord(message, "доллара")||getWord(message, "Доллара")){
        getJSON(url, function(error, currencyData){
            console.log(currencyData)
            bot.sendMessage(chatId, `1 Доллар США = ${currencyData[0].buy} Гривні`);
        })
    }
    if(getWord(message, "Евро")||getWord(message, "евро")){
        getJSON(url, function(error, currencyData){
            console.log(currencyData)
            bot.sendMessage(chatId, `1 Евро = ${currencyData[1].buy} Гривні`);
        })
    }
});



bot.onText(/\/dict/, function (msg) {
    var chatId = msg.chat.id; 
    console.log(msg);
    let dictString = fs.readFileSync("dictionary.txt", "utf8");
    // for(var i = 0; i < dictionary.length; i++){

    //     dictString += i + "." + dictionary[0] + "\n"

    // }

    bot.sendMessage(chatId,dictString);

});


/*bot.onText(/\/dict/, function (msg) {
    var chatId = msg.chat.id; 
    bot.sendMessage(chatId, "Выберите действие для словаря", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Добавить слово",
                        callback_data: "add"
                        
                    }
                ],
                [
                    {
                        text: "Показать словарь",
                        callback_data: "show"
                    }
                ],
                [
                    {
                        text: "Редактировать словарь",
                        callback_data: "edit"
                    }
                ]
            ]
        }
    })
});*/


/*bot.on("callback_query", query => {
    var chatId = query.chat.id; 
    
    console.log(query)
    console.log("dobavleno")
    switch(query.data){
        case "add":
            console.log(query)
            console.log("dobavleno")
            //bot.sendMessage(chatId, "изменение")
            //bot.forwardMessage(query.message.chat.id, query.message.chat.id, query.message_id)
            break
    }   
});*/


bot.on('message', function (msg) {
    var chatId = msg.chat.id; 
    //console.log(chatId);
    //console.log(msg);
    var message = msg.text;
    //bot.sendSticker(chatId, "sticker.webp", {reply_to_message_id:msg.message_id});
    //bot.sendMessage(chatId, "sticker.webp", {reply_to_message_id:msg.message_id});
    var photo = 'sticker.webp'; 
    //if(msg.from.id == SerhId){
     //   bot.sendSticker(chatId, "sticker.webp", {reply_to_message_id:msg.message_id});
    //}
});
bot.onText(/\/weather (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1]; 

    var url = `http://api.openweathermap.org/data/2.5/weather?q=${resp}&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru`
    
    getJSON(url, function(error, weather){
    
        let {temp} = weather.main
        let {description} = weather.weather[0]
        bot.sendMessage(msg.chat.id, `Сейчас в ${resp} ${temp} градусов и ${description}`) 
    })
});

bot.onText(/\/day/, function (msg) {
    var chatId = msg.chat.id;
    const urlHark = "http://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru"
    const urlKiev = "http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru"
    const urlRzeszow = "http://api.openweathermap.org/data/2.5/weather?q=Rzeszow&appid=1f7f0d7b3906c31e1158ca98f1fea4c2&units=metric&lang=ru"
    getJSON(urlHark, function(error, weather){
    
        let {temp} = weather.main
        let {description} = weather.weather[0]
        console.log(temp, description)
        bot.sendMessage(chatId, `Сейчас в Харькове ${temp} градусов и ${description}`) 
    })
    getJSON(urlKiev, function(error, weather){
    
        let {temp} = weather.main
        let {description} = weather.weather[0]        
        console.log(temp, description)
        bot.sendMessage(chatId, `Сейчас в Киеве ${temp} градусов и ${description}`) 
    })
    getJSON(urlRzeszow, function(error, weather){
    
        let {temp} = weather.main
        let {description} = weather.weather[0]
        console.log(temp, description)
        bot.sendMessage(chatId, `Сейчас в Жешуве ${temp} градусов и ${description}`) 
    })
});





textOnChannel = ["Ахахахаха", "Лол", ")))", "Хах", "Хех","Ебать!","Я это еще вчера видел","мммммм"]
textOnSosi = ["Сам соси, пёс", "А может ты пососешь?", "Сам соси хуй", "Нет, ты соси хуй"]
textOnNahui = ["Сам иди нахуй", "А может ты пойдешь нахуй?", "Нет, ты иди нахуй"]

bot.on('message', function (msg) {
    var chatId = msg.chat.id; 
    var message = msg.text;
    console.log(msg);
    if (message == "привет Артем" || message == "привет артем" || message == "Привет Артем" || message == "привет, Артем" || message == "привет,Артем" || message == "Привет артем"){
        if(msg.from.first_name == "Zhenya"){
            bot.sendMessage(chatId, "А ти хто?", {reply_to_message_id:msg.message_id});
        }
        else{
            bot.sendMessage(chatId, `Привіт, Пан ${msg.from.first_name}`, {reply_to_message_id:msg.message_id});
        }
    }
    if (message == "Нет" || message == "нет"){
        bot.sendSticker(chatId, "net.webp", {reply_to_message_id:msg.message_id});
    }

    if(msg.forward_from_chat){
        //bot.sendMessage(chatId, "Ахахахаха", {reply_to_message_id:msg.message_id})
        var rand = Math.floor(Math.random() * 5)
        if(probability()){
            if(rand<4){
                randText(textOnChannel, msg)
            }
            else bot.sendSticker(chatId, "durka.webp", {reply_to_message_id:msg.message_id})
        }
    }

    if(message == "артем, заебал"){
        bot.sendMessage(chatId, "Соси, Пёс", {reply_to_message_id:msg.message_id})
    }

    if(getWord(message, "артем")&&getWord(message, "соси"))
    {
        randText(textOnSosi, msg);
    }

    if(message == "Иди нахуй" 
    || message == "иди нахуй" 
    || message == "иди нахуй артем" 
    || message == "артем иди нахуй"  
    || message == "Иди нахуй артем" 
    || message == "Артем иди нахуй" 
    ){
        randText(textOnNahui, msg);
    }
});

var checkSent = false;

setInterval(function(){
	var timeNow = new Date().getHours();
    if (timeNow == '10') {
		if (checkSent == false) {
			bot.sendMessage(chatId, "Новый день, новый хуй\n");
            getCurrency();
            getWeather();
			checkSent = true;
		}
    }
	else {
		checkSent = false;
	}
}, 60000);

bot.on("polling_error", (err) => console.log(err));

