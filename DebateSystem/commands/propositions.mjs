import { Command } from "./commandHandler/index.mjs";
const { MessageEmbed } = require("discord.js");

//get https for making api calls to python database
const axios = require('axios')

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

class Debate extends Command {
  constructor(bot) {
    this.bot=bot;
    super("debate", "Debates a given user.", "Begins the selection process for judges in a debate, and begins the debate in the given format thereafter", "<format:" + bot.prefix "formats> <number of judges: integer>");
  }
  
  exec(message, member, format, numberOfJudges) {
    //check for errors
    if (numberofJudges > 10) {
      throw new Error("You may only have a maximum of 10 judges.");
    }
    
    if (!message.channel.id in setTopics) {
      throw new Error("A topic is not set for the channel you're in.");
    }
    
    if (member.id == message.member.id) {
      throw new Error("You cannot debate against yourself.");
    }
    
    members = [];
    points = {};
    
    members.push(member);
    members.push(message.member.id);
    
    //get both member's elos
    
    members.forEach(m => {
      axios
      .post('https://database.marleyakins.repl.co/get_elo', {
        id: m.id
      })
      .then(res => {
        points[m.id] = res.data.elo;
      })
      .catch(error => {
        throw error;// a bit redunant but necessary nonetheless
      })
    });
    
    const embed = new MessageEmbed()
    .setTitle("Debate Request")
    .setDescription(member + " " + message.member + " wants to debate you on" + " " + setTopics[message.channel.id]['topic'] + " Do you accept?")
    .setColor("#f5ef42")
    .addField(member, points[member.id], false)
    .addField(message.member, points[message.member.id], false);
    
    message.channel.send(
      {
      embeds: [embed]
      }
    );
    
    //add acceptance an judging and blah blah blah here
  }
}
