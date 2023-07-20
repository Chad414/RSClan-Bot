const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nextevent')
    .setDescription(`Displays next Wilderness Flash Event`),
  async execute(interaction) {

    let firstRotationDate = new Date('July 17, 2023 23:00:00 GMT+0:00');
    let currentDate = new Date();
    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let hoursDifference = Math.floor(timeDifference / (1000 * 3600));

    let currentRotation = hoursDifference % 13;

    let nextEventTime = (currentDate.getUTCHours() + 1) % 24;

    let embed = new Discord.EmbedBuilder()
      .setColor(constants.embedColor)
      .setTitle(`Next Wilderness Flash Event`)
      .addFields(
        { name: `${constants.wildyEvents[currentRotation]}`, value: `at ${nextEventTime}:00 GMT` }
      )
      .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/version_2/img/wilderness.png')
      .setTimestamp()
      .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

    interaction.reply({ embeds: [embed] });
  }
};