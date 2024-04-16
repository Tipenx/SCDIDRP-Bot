module.exports = {
  data: {
    name: "session",
    description: "Make an session in a specified channel",
    options: [
      {
        name: "channel",
        description: "The channel to send the session",
        type: 7, // CHANNEL type
        required: true,
      },
      {
        name: "session",
        description: "The host of session",
        type: 3,
        required: true,
      },
      {
        name: "cohost",
        description: "The Co - Host of session",
        type: 3,
        required: true,
      },
      {
        name: "aorp",
        description: "The area for the roleplay",
        type: 3,
        required: true,
      },
      {
        name: "speedlimit",
        description: "The the speedlimit",
        type: 3,
        required: true,
      },
      {
        name: "lor",
        description: "Left on red (Allowed / Not Allowed)",
        type: 3,
        required: true,
      },
      {
        name: "server",
        description: "The server of the rp (singapore / us)",
        type: 3,
        required: true,
      },
      {
        name: "code",
        description: "The code for people join",
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
    const session = interaction.options.getString("session");
    const cohost = interaction.options.getString("cohost");
    const aorp = interaction.options.getString("aorp");
    const speedlimit = interaction.options.getString("speedlimit");
    const lor = interaction.options.getString("lor");
    const server = interaction.options.getString("server");
    const code = interaction.options.getString("code");

    try {
      await channel.send(
        `Summer Car Driving Indonesia Roleplay (Link SDIDRP in Profile)\nStrict RP\nHost:${session} \nCo-Host: ${cohost}\nStaff: SCDIDRP Staff Team\n\nAORP: ${aorp}\n\nRules:\nNo Speeding\nLeft on red allowed\nNo begging for mod\nOvertaking allowed\nFollow Host / Co host Instruction\n\nGuidelines:\nSpeedlimit: ${speedlimit}\nFRP Speed: 120\nLeft On Red: ${lor}\n\nBanned Cars\n\nBus\nSupercar\nTruck\nStrobo\n\nJobs:\n\nEmergency\nTaxi / Uber\nOpen Businesses\nOpen your Own\n\nNote!\nIF YOU BREAK THESE RULES, YOU WILL BE BANNED\n\nServer : ${server}\nCode : ${code}\n\nLink : https://www.roblox.com/games/6911148748/Car-Driving-Indonesia`,
      );
      await interaction.reply("Session text send successfully");
    } catch (error) {
      console.error("Error sending Session:", error);
      await interaction.reply(
        "Failed to send session. Please check the channel permissions.",
      );
    }
  },
};
