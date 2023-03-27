const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const websiteSettings = require("../../dashboard/settings.json");
module.exports = {
  name: "avatar", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Info",
  usage: "avatar <tag>",
  aliases: ["ava", "profile"],

  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Display your avatar", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    /*const target = message.mentions.users.first() || message.author;

    try {
      message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
          .setAuthor(
        `Avatar from: ${target.tag}`,
        target.displayAvatarURL({ dynamic: true }),
        "https://discord.gg/VzUR95y")
        .setDescription(`Nickname : ${target}
ID : ${target.id}
Avatar URL : [Click Here](${target.displayAvatarURL({ dynamic: true })})`)
          .setImage(target.displayAvatarURL({dynamic: true,
          size: 512}))
          .setFooter(`Req By: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }*/
    const axios = require("axios");

let user = message.mentions.users.first() || message.author;

try {
  
  
  
  
    //HOW TO GET THE BANNER OF A USER
    const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
        headers: {
            Authorization: `Bot ${client.token}`
        }
    }).then(d => d.data);
    if(data.banner){
        let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
        message.channel.send(`**Banner of ${user.tag}**:\n> ${url}`)
    } else {
        message.channel.send(`${client.allEmojis.x} User has no Banner`)
    }

  
  
  
  
  
    //HOW TO GET CUSTOMAVATAR
    let member = message.guild.members.cache.get(user.id);
    if(!member) await message.guild.members.fetch(user.id).catch(e=>{ }) || false;
    if(member){
        const data = await axios.get(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then(d => d.data);
        if(data.avatar && data.avatar != user.avatar){
            let url = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
            url = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${user.id}/avatars/${data.avatar}${url}`;
            message.channel.send(`**CUSTOM AVATAR of ${user.tag}**:\n> ${url}`)
        } else {
            message.channel.send({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
          .setAuthor(
        `Avatar from: ${user.tag}`,
        user.displayAvatarURL({ dynamic: true }),
        "https://discord.gg/VzUR95y")
        .setDescription(`Nickname : ${user}
ID : ${user.id}
Avatar URL : [Click Here](${user.displayAvatarURL({ dynamic: true })})`)
          .setImage(user.displayAvatarURL({dynamic: true,
          size: 4096}))
          .setFooter(`Req by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
        ]
      });
        }
    } else {
        message.channel.send(`${client.allEmojis.x} User has no CUSTOM AVATAR`)
    }
  
  
  
  
  
}catch(e){
    console.log(e)
}
  }
}