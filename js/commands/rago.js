const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rago')
    .setDescription(`Displays current and next Vorago rotation`),
  async execute(interaction) {

    let firstRotationDate = new Date('June 2, 2021 00:00:00 GMT+0:00');
    let currentDate = new Date();

    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    let numberOfRotations = Math.floor(daysDifference / 7);

    let currentRotation = numberOfRotations % 6;

    let daysUntilRotation = 7 - (daysDifference % 7);

    let embed = new Discord.MessageEmbed()
      .setColor(constants.embedColor)
      .setTitle(`Vorago's Current Rotation`)
      .setDescription(`Days Until Next Rotation: ${daysUntilRotation}`)
      .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/rago.png')
      .addFields(
        { name: 'Vorago Current', value: `${constants.voragoRotations[currentRotation]}` },
        { name: 'Vorago Next', value: `${constants.voragoRotations[(currentRotation + 1) % 6]}` },
      )
      .setTimestamp()
      .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

    interaction.reply({ embeds: [embed] });
  }
};