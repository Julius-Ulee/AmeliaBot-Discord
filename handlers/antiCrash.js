module.exports = client => {
   process.on('unhandledRejection', (reason, p) => {
        console.log(` [antiCrash] :: Unhandled Rejection/Catch\n [${String(new Date).split(" ", 5).join(" ")}]`.red);
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(` [antiCrash] :: Uncaught Exception/Catch\n [${String(new Date).split(" ", 5).join(" ")}]`.red);
        console.log(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(` [antiCrash] :: Uncaught Exception/Catch (MONITOR)\n [${String(new Date).split(" ", 5).join(" ")}]`.red);
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(` [antiCrash] :: Multiple Resolves\n [${String(new Date).split(" ", 5).join(" ")}]`.red);
        //console.log(type, promise, reason);
    });
}