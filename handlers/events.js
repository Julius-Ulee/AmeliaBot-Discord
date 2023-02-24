const fs = require("fs");
const allevents = [];
module.exports = async (client) => {
    try {
        try {
            const stringlength = 69;
            console.log(`▣━━━━━━━━━━━━━···`.bold.brightGreen)
            console.log(`┃ `.bold.brightGreen)
            console.log(`┃ `.bold.brightGreen+ `Welcome to SERVICE HANDLER!`.bold.brightGreen)
            console.log(`┃ `.bold.brightGreen)
            console.log(`┃ `.bold.brightGreen+ `/-/ By https://ameliabot.dev /-/`.bold.brightGreen)
            console.log(`┃ `.bold.brightGreen+ `/-/ By Discord: ✗Julius Ulee✗#5323 /-/`.bold.brightGreen)
            console.log(`┃ `.bold.brightGreen)
            console.log(`▣━━━━━━━━━━━━━···`.bold.brightGreen)
        } catch {
            /* */ }
        let amount = 0;
        const load_dir = (dir) => {
            const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
            for (const file of event_files) {
                try {
                    const event = require(`../events/${dir}/${file}`)
                    let eventName = file.split(".")[0];
                    allevents.push(eventName);
                    client.on(eventName, event.bind(null, client));
                    amount++;
                } catch (e) {
                    console.log(e)
                }
            }
        }
        await ["client", "guild"].forEach(e => load_dir(e));
        console.log(`[✅] ${amount} Events Loaded`.brightGreen);
        try {
            const stringlength2 = 69;
            console.log(`▣━━━━━━━━━━━━━···`.bold.yellow)
            console.log(`┃ `.bold.yellow)
            console.log(`┃ `.bold.yellow + `Logging into the BOT...`.bold.yellow)
            console.log(`┃ `.bold.yellow)
            console.log(`▣━━━━━━━━━━━━━···`.bold.yellow)
        } catch {
            /* */ }
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
};
