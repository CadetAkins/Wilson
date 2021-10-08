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
  
  exec(message, member, numberOfJudges, format = "EXTMP") {
    //check for errors
    if (numberofJudges.toInt() > 10) {
      throw new Error("You may only have a maximum of 10 judges.");
    }
    
    if (format.toUpperCase() in ["LD", "PD", "EXTMP"]) {
      throw new Error("You must use an accepted format. A list of accepted formats can be found using" + this.bot.prefix + "formats");
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
    
    var embed = new MessageEmbed()
    .setTitle("Debate Request")
    .setDescription(member + " " + message.member + " wants to debate you on" + " " + setTopics[message.channel.id]['topic'] + " Do you accept?")
    .setColor("#f5ef42")
    .addField(member, points[member.id], false)
    .addField(message.member, points[message.member.id], false);
    
    var sg = message.channel.send(
      {
      embeds: [embed]
      }
    )
    .react("✅")
    .react("❎");
    
    var filter = (reaction, user) => {
      return (
      ["✅", "❎"].includes(reaction.emoji.name) && user.id === member.id
      );
    }
    
    msg.awaitReactions(filter, { max: 1, time: 300000, errors: ['time'] })
    .then((collected) => {
      var reaction = collected.first();
      if (reaction.emoji.name == "❎") {
        RemoveProposition.exec(msg);
        return;
      }
      
      reaction.users.remove(member.id);
    }).catch((collected) => {
      var embed = new MessageEmbed()
      .setTitle("Timeout Error")
      .setDescription("The user in question failed to respond to your debate request in 5 minutes and it has timed out.")
      .setColor("#eb4034");
      
      var msg = message.channel.send(
        {
        embeds: [embed]
        }
      );
      
      RemoveProposition.exec(msg);
    });
       
    var embed = new MessageEmbed()
    .setTitle("Select Judges...")
    .setDescription(message.author.user.toString() + " please reply to this message with a list of judge mentions, seperated by hyphens")
    .addField("Ex:", "@member1 - @member2")
    .setColor("#cf34eb");
    
    var msg = message.channel.send(
      {
      embeds: [embed]
      }
    );
    
    //listen for reply to message
    
    var filter = (m) => {
      (
        m.author.id === message.author.id && m.type === "REPLY"
      );
    }
    
    msg.channel.awaitMessages(filter, { max: 1, time: 300000, errors['time'] ])
    .then(m => {
      if (m.first().mentions.users().length() > numberOfJudges.toInt()) {
        throw new Error("You must provide a number of judges equal to that of when you ran the command.")
      }
      const judges = m.first().mentions.users();
    }).catch(m => {
      var embed = new MessageEmbed()
      .setTitle("Timeout Error")
      .setDescription("The user in question failed to respond to your debate request in 5 minutes and it has timed out.")
      .setColor("#eb4034")
      
      var msg = message.channel.send(
        {
        embeds: [embed]
        }
      );
    });
    
    //run debates here
    switch(format.toUpperCase()) {
      case "LD":
        //do something
        return;
      
      case "PD":
        //do something
        return;
        
      case "EXTMP":
        //do something
        return;
        
      default:
        throw new Error("An unexpected error occured. Please contact @Akins#1692");
    }
    
    var embed = MessageEmbed()
    .setTitle("Debate Judging")
    .setDescription("The debate has ended. The debate is now going to be judged. The bot will now wait for judge reactions. Once all jusged have voted, or 10 minutes have passed, the debate will be judged and new scores will be calculated. For judges, more information on how to judge a debate can be found (here)[https://github/com/WilsonPersia/Wilson/docs]")
    .setColor("#aeeb34")
    .addField("🅰️", message.author.user().toString(), false)
    .addField("🅱️", member.user().toString(), false);
    
    var msg = message.channel.send(
      {
      embeds: [embed]
      }
    );
    
    var filter = (reaction, user) => {
      return (
        ["🅰️", "🅱️"].includes(reaction.emoji.name) && judges.include(user) && 
      );
    }
    
    aff = 0;
    neg = 0;
    
    msg.awaitReactions(filter, { max: numberOfJudges.toInt(), time: 600000, errors: ['time']})
    .then((reaction, user) => {
      if (reaction.emoji.name == "🅰️") {
        aff++;
      } else {
        neg--;
      }
    }).catch((reaction, user) => {
      if (aff > neg) {
        //do stuff
        return;
      } else if (neg > aff) {
        //do stuff
        return;
      } else {
        // var winner = _.random([aff, neg]);
        //do more stuff
        return;
      }
    });
  }//end func
}
