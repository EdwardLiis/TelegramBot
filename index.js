// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот
var token = '907526211:AAHdR8GCDZ6rHXVCTAS-4rX04bOcf3oa4WU';
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true });

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = match[1]; // Получаем текст после /echo
    bot.sendMessage(fromId, resp);
});



const SerhId = "309124685";
// Простая команда без параметров
bot.on('message', function (msg) {
    var chatId = msg.chat.id; // Берем ID чата (не отправителя)
    console.log(chatId);
    console.log(msg);
    var message = msg.text;
    bot.sendSticker(chatId, "sticker.webp", {reply_to_message_id:msg.message_id});

    //bot.sendSticker(reply_to_message_id,"sticker.webp")
    var photo = 'sticker.webp'; 
    //bot.sendPhoto(chatId, photo);
    if(chatId == SerhId){
        bot.sendPhoto(chatId, photo);
    }
});

