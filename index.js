const express = require('express');
const app = express();
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { translate } = require("@vitalets/google-translate-api");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (option) => {
  bot.sendMessage(
    option.chat.id,
    `Hello ${option.from.first_name}, I am a S Joke bot. If you want to hear a joke in English, type /EnglishJoke; and if you want to hear one in Hindi, type /HindiJoke!`,
  );
  console.log(option);
});

bot.onText(/hello/i, (option) => {
  bot.sendMessage(
    option.chat.id,
    `Boliye ${option.from.first_name} Sir, Agar aapko english me joke sunna hai to /englishjoke likhe, aur agar Hindi me sunna hai to /hindijoke likhe`,
  );
});

bot.onText(/englishjoke/i, async (option) => {
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
    );
    const setup = response.data.setup;
    const punchline = response.data.punchline;
    bot.sendMessage(option.chat.id, `${setup}\n\n😂 ${punchline}`);
  } catch (error) {
    console.error("Joke fetch karne me error aaya:", error.message);
    bot.sendMessage(
      option.chat.id,
      "Sorry bhai, abhi mood nahi hai joke sunane ka. (API Error)",
    );
  }
});

bot.onText(/hindijoke/i, async (option) => {
  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
    );
    const setup = response.data.setup;
    const punchline = response.data.punchline;

    const translatedSetup = await translate(setup, { to: "hi" });
    const translatedPunchline = await translate(punchline, { to: "hi" });

    bot.sendMessage(
      option.chat.id,
      `${translatedSetup.text}\n\n😂 ${translatedPunchline.text}`,
    );
  } catch (error) {
    console.error("Error aaya bhai:", error.message);
    bot.sendMessage(
      option.chat.id,
      "Sorry bhai, abhi mood nahi hai joke sunane ka.",
    );
  }
});

app.get('/', (req, res) => res.send('Bot is Running!'));
app.listen(process.env.PORT || 3000);