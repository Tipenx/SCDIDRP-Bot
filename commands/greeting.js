const { Client, GatewayIntentBits, MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "greeting",
    description: "Make a session in a specified channel",
    options: [
      {
        name: "channel",
        description: "The channel to send the session",
        type: 7, // CHANNEL type
        required: true,
      },
      {
        name: "siapa",
        description: "The host of session",
        type: 3,
        required: true,
      },
      {
        name: "time",
        description: "The countdown for the session to start (in minutes)",
        type: 3,
        required: true,
      },
    ],
  },

  async execute(interaction) {
    const requiredRoleID = "1140257821527658596";
    if (!interaction.member.roles.cache.has(requiredRoleID)) {
      return await interaction.reply(
        "You do not have the required role to use this command.",
      );
    }

    const channel = interaction.options.getChannel("channel");
    const siapa = interaction.options.getString("siapa");
    const time = interaction.options.getString("time");

    try {
      const greetingMessage = await channel.send(
        `**Hello <@&1140257831287787551>, ${siapa} will host a session. Please wait for ${time} minutes until ${siapa} starts the session.**`,
      );

      // Countdown timer (in milliseconds)
      const countdownTime = time * 60 * 1000; // convert minutes to milliseconds
      let timeLeft = countdownTime;

      // Function to send countdown message
      function sendCountdown() {
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        greetingMessage.edit(`**Countdown: ${minutes} minutes remaining...**`);
      }

      // Set interval to decrement countdown time every second
      const countdownInterval = setInterval(() => {
        timeLeft -= 1000; // decrement by 1 second
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          greetingMessage.edit("**Time's up! The session is starting now...**");
        } else {
          sendCountdown();
        }
      }, 1000);

      await interaction.reply("Greeting text sent successfully");
    } catch (error) {
      console.error("Error sending greeting text:", error);
      await interaction.reply(
        "Failed to send greeting text. Please check the channel permissions.",
      );
    }
  },
};
