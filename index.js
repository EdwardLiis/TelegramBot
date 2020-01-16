const fs = require("fs");
const SerhId = "309124685";

var TelegramBot = require('node-telegram-bot-api');

var token = '907526211:AAHdR8GCDZ6rHXVCTAS-4rX04bOcf3oa4WU';

let Words = 4;

var bot = new TelegramBot(token, { polling: true });

let dictionary = [];

bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id; 
    var resp = match[1]; 
    bot.sendMessage(fromId, resp);
});



bot.onText(/\/change/, function (msg) {
    var fromId = msg.chat.id; 

    bot.editMessageText(msg.chat.message)
});


bot.editMessageReplyMarkup()

bot.onText(/\/add (.+)/, function (msg, match) {
    var chatId = msg.chat.id; 
    var resp = match[1]; 
    Words++


    fs.appendFileSync("dictionary.txt", Words + "."+ resp + "\n")
    bot.sendMessage(chatId, "Слово " + resp + " добавлено в словарь");
});



bot.onText(/\/ghoul/, function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    bot.sendAudio(chatId, "Tokyo Ghoul Opening.mp3");
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

