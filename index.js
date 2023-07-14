const config = require("./data/config.json");
const userstore = require("./js/userstore");
const fs = require('fs');
const cheerio = require('cheerio');
const rp = require('request-promise');
const cron = require('node-cron');
const constants = require("./js/constants");
const auto = require("./js/auto")
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v9');

const {
  Client,
  GatewayIntentBits,
  Collection
} = require('discord.js');


const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = config.BOT_TOKEN;

userstore.loadUsers();

const commandFiles = fs.readdirSync('./js/commands').filter(file => file.endsWith('.js'));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./js/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

// Register slash commands globally
client.once('ready', () => {
  const CLIENT_ID = client.user.id;
  const rest = new REST({
    version: '9'
  }).setToken(TOKEN);
  (async () => {
    try {
      await rest.put(
        Routes.applicationCommands(CLIENT_ID), {
        body: commands
      },
      );
      console.log('Successfully registered application commands globally');
    } catch (error) {
      if (error) console.error(error);
    }
  })();
});

// Listen for interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    if (error) console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(TOKEN);

// Auto VOS
// This feature is currently exclusive to Dark Perception
cron.schedule('25 01 * * * *', () => {
  let date = new Date();
  console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Voice of Seren`);

  rp('https://api.weirdgloop.org/runescape/vos', {
    headers: {
      'User-Agent': 'Request-Promise'
    }}).then(function (json) {
    const data = JSON.parse(json);

    for (let i = 0; i < constants.vosChannels.length; i++) {
      let channel = client.channels.cache.get(constants.vosChannels[i]);
      let embeds = auto.vos(data, null)

      // Remove previous VoS
      channel.bulkDelete(10)
        .then(() => { })
        .catch(console.error);

      // Send new VoS
      channel.send({ embeds: [embeds.embed1] });
      channel.send(constants.vosRoles(embeds.embed1.title));

      channel.send({ embeds: [embeds.embed2] });
      channel.send(constants.vosRoles(embeds.embed2.title));
    }
  }).catch(function (err) { });
});

// Auto Merch
// This feature is currently exclusive to Dark Perception
cron.schedule('35 00 00 * * *', () => {
  let date = new Date();
  console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Merch`);

  rp('https://runescape.wiki/api.php?action=parse&disablelimitreport=1&format=json&prop=text&text=%7B%7BTravelling+Merchant%2Fapi%7Cformat%3Djson%7D%7D%7B%7BTravelling_Merchant%2Fapi%7Coffset%3D1%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D2%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D3%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D4%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D5%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D6%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D7%7Cformat%3Djson%7D%7D', {
    headers: {
      'User-Agent': 'Request-Promise'
    }}).then(function (json) {
    const data = JSON.parse(json);
    console.log("Merch JSON Parsed!")

    for (let i = 0; i < constants.dailyChannels.length; i++) {
      let channel = client.channels.cache.get(constants.dailyChannels[i]);
      let merch = auto.merch(data, false);

      // Send new Merch
      channel.send({ embeds: [merch.embed] });

      for (let j = 0; j < merch.items.length; j++) {
        if (merch.items[j].includes("Livid")) {
          channel.send(constants.merchRoles[0])
        } else if (merch.items[j].includes("Deathtouched")) {
          channel.send(constants.merchRoles[1])
        } else if (merch.items[j].includes("Reaper")) {
          channel.send(constants.merchRoles[2])
        } else if (merch.items[j].includes("Unstable")) {
          channel.send(constants.merchRoles[3])
        } else if (merch.items[j].includes("goebie") || merch.items[j].includes("Goebie")) {
          channel.send(constants.merchRoles[4])
        }
      }

    }
  }).catch(function (err) { });
}, {
  timezone: "Africa/Accra"
});

// Auto Vis
// This feature is currently exclusive to Dark Perception
cron.schedule('55 00 * * * *', () => {
  let date = new Date();
  console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Vis`);

  rp(`https://warbandtracker.com/goldberg/`).then(function (html) {
    const $ = cheerio.load(html);
    const data = $('.worldTable');

    for (let i = 0; i < constants.dailyChannels.length; i++) {
      let channel = client.channels.cache.get(constants.dailyChannels[i]);
      let embed = auto.vis(data);

      // Update at these hours of the day
      let visHours = [1, 2, 3, 6, 9, 15, 21];

      // Delete previous vis if not first vis of the day (1)
      let date = new Date();
      if (visHours.includes(date.getUTCHours()) && date.getUTCHours() > 1) {
        channel.bulkDelete(1)
          .then(() => { })
          .catch(console.error);
      }

      if (visHours.includes(date.getUTCHours())) {
        // Send new Vis
        channel.send({ embeds: [embed] });
      }

    }
  }).catch(function (err) {
    console.log(err)
  });
}, {
  timezone: "Africa/Accra"
});

// Auto Boss Rotation
// This feature is currently exclusive to Dark Perception
cron.schedule('25 00 00 * * *', () => {
  let date = new Date();
  console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Rotation`);

  for (let i = 0; i < constants.dailyChannels.length; i++) {
    let channel = client.channels.cache.get(constants.dailyChannels[i]);
    let raxEmbed = auto.rax();
    let rotsEmbed = auto.rots();

    // Remove previous auto Merch/Vis/Rax
    channel.bulkDelete(10)
      .then(() => { })
      .catch(console.error);

    channel.send({ embeds: [raxEmbed] });

    channel.send({ embeds: [rotsEmbed] });
  }

}, {
  timezone: "Africa/Accra"
});

// Auto Wilderness Flash Events
// This feature is currently exclusive to Dark Perception
cron.schedule('00 55 * * * *', () => {
  let date = new Date();
  console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Flash Events`);

  for (let i = 0; i < constants.eventChannels.length; i++) {
    let channel = client.channels.cache.get(constants.eventChannels[i]);
    let nextEventEmbed = auto.nextevent();

    channel.send({ embeds: [nextEventEmbed] });
  }

}, {
  timezone: "Africa/Accra"
});