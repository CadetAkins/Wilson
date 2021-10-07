import { Command } from "./commandHandler/index.js";
const { MessageEmbed } = require("discord.js");

class Formats extends Command {
  constructor(bot) {
    this.bot = bot;
    super("formats", "Displays a list of bot available debate formats.", "Displays a list of bot available debate formsts, including LD, SD, BP, and EXTMP", "<format: optional>");
  }
  
  exec(message, format=null) {
    if (!format === null) {
      switch(format.toUpperCase()) {
        case "LD":
          const embed = new MessageEmbed()
          .setTitle("Lincoln Douglas Format")
          .setDescription("Lincoln Douglas Formatting Guidelines.")
          .addField("1AC", "First Affirmative Constructive - 6 minutes", false)
          .addField("1NCE", "First Negative Cross-Examination - 3 minutes", false)
          .addField("1NC", "First Negative Constructive - 7 minutes", false)
          .addField("1ACE", "First Affirmative Cross-Examination - 3 minutes", false)
          .addField("1AR", "First Affirmative Rebuttal - 4 minutes", false)
          .addField("1NR&S", "First Negative Rebuttal & Summary - 6 minutes", false)
          .addField("1AS", "First Affirmative Summary - 3 minutes")
          .setColor("#cfeb34");
          
          message.channel.send(
            {
            embeds: [embed]
            }
          );
        
        case "SD":
          const embed = new MessageEmbed()
          .setTitle("Simple Debate Format")
          .setDescription("Simple Debate Formatting Guidelines")
          .addField("1AC", "First Affirmative Constructive - 5 minutes", false)
          .addField("1NCE&R", "First Negative Cross-Examination & Rebuttal - 7 minutes", false)
          .addField("1NC", "First Negative Constructive - 5 minutes", false)
          .addField("1ACE&R", "First Affirmative Cross-Examination & Rebuttal - 7 minutes", false)
          .addField("1NS", "First Negative Summary - 3 minutes", false)
          .addField("1AS", "First Affirmative Summary - 3 minutes", false)
          .setColor("#4287f5");
          
          message.channel.send(
            {
            embeds: [embed]
            }
          );
          
        case "EXTMP":
          const embed = new MessageEmbed()
          .setTitle("Extemp Debate Format")
          .setDescription("Extemp debate, is a little different. This is a debate with no format, instead both debaters will take turns going back and forth until the debaters agree to end the debate. Afterwards the judges will vote as per usual.")
          .setColor("#57f542");
          
          message.channel.send(
            {
            embeds: [embed]
            }
          );
          
        default:
          throw new Error("You must provide a valid debate format, not /"" + format + "/".");
          
        
      } // end switch
    } else {
      const embed = new MessageEmbed
      .setTitle("Available Debate Formats")
      .setDescription("A list of available debate formats can be found here, or by doing " + this.bot.prefix + "help formats")
      .addField("Formats", "LD (Lincoln Douglas)\nSD (Simple Debate)\nEXTMP (Extemp)")
      .setColor("#ff2a1f");
      
      message.channel.send(
        {
          embeds: [embed]
        }
      );
      
    }
  } //end func 
}
