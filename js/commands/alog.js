const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const userstore = require("../userstore");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('alog')
    .setDescription(`Displays user\'s Adventure Log`)
    .addStringOption(option =>
      option.setName('rsn')
        .setDescription('RuneScape Name')
        .setRequired(false)),
  async execute(interaction) {
    let rsn = interaction.options.getString('rsn');
    let userID = interaction.user.id;

    if (rsn == undefined) {
      rsn = userstore.getUser(userID);

      if (rsn == undefined) {
        interaction.reply({ embeds: [constants.noRSN] });
        return;
      }
    }

    await rp(`https://apps.runescape.com/runemetrics/profile/profile?user=${rsn}&activities=10`).then(function (json) {
      const data = JSON.parse(json);

      if (data.error == 'PROFILE_PRIVATE') {
        console.log(`\t∟ RuneMetrics Profile is Private`)
        interaction.reply({ embeds: [constants.privateProfile] });
        return;
      } else if (data.error == 'NO_PROFILE') {
        console.log(`\t∟ RuneMetrics Unavailable`)
        interaction.reply({ embeds: [constants.runeMetricsUnavailable] });
        return;
      }

      let username = data.name.replace(/ /g, '+');

      // Format log entries
      let entries = [];
      for (let i = 0; i <= 8; i++) {
        let entry = data.activities[i].text

        if (entry.includes("XP")) {
          let xp = entry.slice(0, entry.indexOf('X'))
          xp = xp.slice(0, xp.length - 6)

          let skill = entry.slice(entry.indexOf(' '), entry.length)
          entry = xp + " Million XP" + skill
        }

        entries[i] = entry
      }

      // Format log dates
      // Number suffix solution from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
      function nth(number) {
        let english_ordinal_rules = new Intl.PluralRules("en", { type: "ordinal" });
        let suffixes = {
          one: "st",
          two: "nd",
          few: "rd",
          other: "th"
        };
        let suffix = suffixes[english_ordinal_rules.select(number)];
        return (number + suffix);
      }

      let dates = [];
      for (let i = 0; i <= 8; i++) {
        let date = data.activities[i].date.replace(/-/g, ' ')
        let time = date.slice(-5)
        let day = date.slice(0, 2)
        let month = date.slice(3, 6)
        let year = date.slice(7, 11)

        if (day[0] == '0') {
          day = day.slice(1)
        }

        date = `${month} ${nth(day)} ${year} at ${time}`

        dates[i] = date
      }

      let embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${data.name}'s Adventure Log`)
        .setThumbnail(`http://secure.runescape.com/m=avatar-rs/${username}/chat.png`)
        .addFields(
          { name: `${entries[0]}`, value: `${dates[0]}` },
          { name: `${entries[1]}`, value: `${dates[1]}` },
          { name: `${entries[2]}`, value: `${dates[2]}` },
          { name: `${entries[3]}`, value: `${dates[3]}` },
          { name: `${entries[4]}`, value: `${dates[4]}` },
          { name: `${entries[5]}`, value: `${dates[5]}` },
          { name: `${entries[6]}`, value: `${dates[6]}` },
          { name: `${entries[7]}`, value: `${dates[7]}` },
          { name: `${entries[8]}`, value: `${dates[8]}` },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

      interaction.reply({ embeds: [embed] })

    }).catch(function (err) {
      constants.logError({
        name: "RuneMetrics: Alog",
        message: "RuneMetrics Command Error" + err,
      });
    });

  }
};