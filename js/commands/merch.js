const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('merch')
    .setDescription(`Displays current and future Travelling Merchant items`),
  async execute(interaction) {
    await rp('https://runescape.wiki/api.php?action=parse&disablelimitreport=1&format=json&prop=text&text=%7B%7BTravelling+Merchant%2Fapi%7Cformat%3Djson%7D%7D%7B%7BTravelling_Merchant%2Fapi%7Coffset%3D1%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D2%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D3%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D4%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D5%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D6%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D7%7Cformat%3Djson%7D%7D').then(function (json) {
      const data = JSON.parse(json);

      let jsonData = data.parse.text["*"];
      let merchData = [];

      jsonData = jsonData.slice(jsonData.indexOf("{"));
      jsonData = jsonData.slice(0, jsonData.lastIndexOf("}") + 1);

      jsonData = jsonData.split('{"items":');
      jsonData.shift();

      for (let i = 0; i < jsonData.length; i++) {
        jsonData[i] = '{"items":' + jsonData[i];
        merchData[i] = JSON.parse(jsonData[i]);
      }

      let date = new Date();

      let futureDates = [];

      for (let i = 0; i < 7; i++) {
        date = new Date();
        futureDates[i] = date.setDate(date.getDate() + (i + 1));
        futureDates[i] = new Date(futureDates[i]);
      }

      let currentItems = [
        merchData[0].items[0].name,
        merchData[0].items[1].name,
        merchData[0].items[2].name
      ];

      let futureItems = [
        [
          `${futureDates[0].getUTCDate()} ${constants.months[futureDates[0].getUTCMonth()]} ${futureDates[0].getUTCFullYear()}`,
          merchData[1].items[0].name,
          merchData[1].items[1].name,
          merchData[1].items[2].name
        ],
        [
          `${futureDates[1].getUTCDate()} ${constants.months[futureDates[1].getUTCMonth()]} ${futureDates[1].getUTCFullYear()}`,
          merchData[2].items[0].name,
          merchData[2].items[1].name,
          merchData[2].items[2].name
        ],
        [
          `${futureDates[2].getUTCDate()} ${constants.months[futureDates[2].getUTCMonth()]} ${futureDates[2].getUTCFullYear()}`,
          merchData[3].items[0].name,
          merchData[3].items[1].name,
          merchData[3].items[2].name
        ],
        [
          `${futureDates[3].getUTCDate()} ${constants.months[futureDates[3].getUTCMonth()]} ${futureDates[3].getUTCFullYear()}`,
          merchData[4].items[0].name,
          merchData[4].items[1].name,
          merchData[4].items[2].name
        ],
        [
          `${futureDates[4].getUTCDate()} ${constants.months[futureDates[4].getUTCMonth()]} ${futureDates[4].getUTCFullYear()}`,
          merchData[5].items[0].name,
          merchData[5].items[1].name,
          merchData[5].items[2].name
        ],
        [
          `${futureDates[5].getUTCDate()} ${constants.months[futureDates[5].getUTCMonth()]} ${futureDates[5].getUTCFullYear()}`,
          merchData[6].items[0].name,
          merchData[6].items[1].name,
          merchData[6].items[2].name
        ],
        [
          `${futureDates[6].getUTCDate()} ${constants.months[futureDates[6].getUTCMonth()]} ${futureDates[6].getUTCFullYear()}`,
          merchData[7].items[0].name,
          merchData[7].items[1].name,
          merchData[7].items[2].name
        ]
      ];

      for (let i = 0; i < currentItems.length; i++) {
        currentItems[i] = currentItems[i].replace('&amp;', '&');
      }

      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 4; j++) {
          futureItems[i][j] = futureItems[i][j].replace('&amp;', '&');
        }
      }


      let embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Travelling Merchant's Shop`)
        .addFields(
          { name: `Current Items`, value: `${currentItems[0]}\n${currentItems[1]}\n${currentItems[2]}` },
          { name: `${futureItems[0][0]}`, value: `${futureItems[0][1]}\n${futureItems[0][2]}\n${futureItems[0][3]}` },
          { name: `${futureItems[1][0]}`, value: `${futureItems[1][1]}\n${futureItems[1][2]}\n${futureItems[1][3]}` },
          { name: `${futureItems[2][0]}`, value: `${futureItems[2][1]}\n${futureItems[2][2]}\n${futureItems[2][3]}` },
          { name: `${futureItems[3][0]}`, value: `${futureItems[3][1]}\n${futureItems[3][2]}\n${futureItems[3][3]}` },
          { name: `${futureItems[4][0]}`, value: `${futureItems[4][1]}\n${futureItems[4][2]}\n${futureItems[4][3]}` },
          { name: `${futureItems[5][0]}`, value: `${futureItems[5][1]}\n${futureItems[5][2]}\n${futureItems[5][3]}` },
          { name: `${futureItems[6][0]}`, value: `${futureItems[6][1]}\n${futureItems[6][2]}\n${futureItems[6][3]}` },
        )
        .setTimestamp()
        .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

      interaction.reply({ embeds: [embed] });

    }).catch(function (err) {
      constants.logError({
        name: "Wiki: Merch",
        message: "Merch Command Error" + err,
      });
    });
  }
};