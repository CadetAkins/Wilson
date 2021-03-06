import { Command } from "./commandHandler/index.mjs";
const { MessageEmbed } = require("discord.js");

class Help extends Command {
  constructor(bot) {
    this.bot=bot;
    super("help", "Returns a list of commands.", "Returns a list of commands and descriptions.", "<command> optional.", "Help");
  }
  //
  exec(message, command = null) {
    
    if (!command === null) {
      
    }
    
    embeds = [];
    
    bot.category.keys().forEach(key => {
      const embed = new MessageEmbed()
      .setTitle("Help Command - " + key)
      .setDescription(bot.category[key]['description'])
      .setColor("#32a852");
      bot.category[key]['commands'].forEach(command => {
        embed.addField(command, bot.category[key]['commands']['brief'], false);
      });
      
      embeds.push(embed);
    });
    
    const embed = new MessageEmbed()
    .setTitle("Help Command - Misc.")
    .setDescription("A list of uncategorized commands.")
    .setColor("#32a852");
    
    
    
    bot.command.keys().forEach(command => {
      embed.addField(command, bot.command[command]['brief'], false);
    });

    embeds.push(embed);
    
    this.channel.send(
      {
      embeds: embeds
      }
    );
  }
}
