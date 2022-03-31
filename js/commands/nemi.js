const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nemi')
    .setDescription(`Displays current Nemi Forest Map`),
  async execute(interaction) {
    await rp('https://www.reddit.com/r/nemiforest/new.json?limit=1').then(function (json) {
      const data = JSON.parse(json);

      let title = data.data.children[0].data.title;
      let imageURL = data.data.children[0].data.url_overridden_by_dest;

      let embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`NemiForest`)
        .setImage(imageURL)
        .setDescription(title)
        .setTimestamp()
        .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

      interaction.reply({ embeds: [embed] });

    }).catch(function (err) {
      interaction.reply({ embeds: [constants.portablesError] });
      constants.logError({
        name: "Reddit: Nemi",
        message: "Nemi Command Error" + err,
      });
    });
  }
};