import { Command } from "./commandHandler/index.mjs";
const { MessageEmbed } = require("discord.js");

setTopics = {};

class Proposition extends Command {
  constructor(bot) {
    this.bot = bot;
    super("proposition", "Sets a proposition", "Sets a proposition for the debate channel.", "<topic: string>");
  }
  
  exec(message, topic = null) {
    //check for required args
    if (topic === null) {
      throw new Error("You must provide a topic to use.");
    }
    
    if (!message.channel.id in setTopics.keys()) {
      setTopics[message.channel.id] = {};
      setTopics[message.channel.id]['topic'] = topic;
      setTopics[message.channel.id]['author'] = message.member.id;
    } else {
      throw new Error("This channel already has a topic set.");
    }
    
    const embed = new MessageEmbed()
    .setTitle("Topic Set!")
    .setDescription("The topic for this channel has been set to\n\n" + topic)
    .setColor("#feadad");
    
    message.channel.send(
      {
      embeds: [embed]
      }
    );
  }
}

class RemoveProposition extends Command {
  constructor(bot) {
    this.bot=bot;
    super("remove-proposition", "Removes the proposition of a channel.", "Removes the proposition currently set in the channel the command is run in.");
  }
  
  exec(message) {
    if (!message.channel.id in topics) {
      throw new Error("The channel you are running this command in has no topic set.");
    }
    
    if (!message.member.id == setTopics[message.channel.id]['author'] || message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Moderator")) {
      throw new Error("You do not have access to run this command.");
    }
    
    //delete the topic
    delete setTopics[message.channel.id];
    
    message.channel.send("Topic deleted!");
  }
}

class GetProposition extends Command {
  constructor(bot) {
    this.bot=bot;
    super("get-proposition", "Returns the proposition of a channel.", "Returns the set proposition of the channel the command is run in.");
  }
  
  exec(message) {
    if (!message.channel.id in topics) {
      throw new Error("The channel you are running this command in has no topic set.");
    }
    
    const embed = new MessageEmbed()
    .setTitle("Channel Topic")
    .setDescription("The topic for this channel is\n\n" + setTopics[message.channel.id]['topic'])
    .setColor("#feadad");
    
    message.channel.send(
      {
      embeds: [embed]
      }
    );
  }
}
