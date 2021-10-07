import { Bot } from "./commandHandler/index.mjs";

const { MessageEmbed } = require("discord.js");

//import command classes
import { Help } from "./commands/help.mjs";
import { Formats } from "./commands/formats.mjs";
import { Proposition, RemoveProposition, GetProposition } from "./commands/propositions.mjs"

debateChannels = [
  894244610866577428
]

bot = Bot(
  "$",
  "A discord debate system.",
  "Wilson",
  true
)
.addCategory("Help")
.addCategory("Debate");

//load commands

commands = [
  Help(bot),
  Formats(bot),
  Proposition(bot),
  RemoveProposition(bot),
  GetProposition(bot)
];

commands.forEach(command => {
  bot.addCommand(command);
});

bot.once('ready', () => {
  console.log("Wilson Debate System Online!");
});

bot.on('message', (message) => {
  //listen only for debate channels
  if (!message.channel.id in debateChannels) {
    return 0;
  }
  
  //handle errors
  try {
    bot.parseCommands(message);
  } catch (e) {
    const embed = new MessageEmbed()
    .setTitle("Bot Error")
    .setDescription("```" + e + "```")
    .setColor("#d42e1c");
    
    message.channel.send(
      {
      embeds: [embed]
      }
    );
  }
  
});

bot.login("TOKEN");
