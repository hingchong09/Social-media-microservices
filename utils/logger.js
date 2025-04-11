const winston = require('winston')

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine( 
        winston.format.timestamp(), // Adds a timestamp to every log message.
        winston.format.errors({stack: true}), // If the log message contains an Error object, it includes the stack trace in the log.
        winston.format.splat(), // Supports string interpolation like console.log(). eg: logger.info('User %s logged in from %s', username, ip); Without splat(), %s placeholders would not be replaced.
        winston.format.json() // Formats the final log output as a JSON object.
    ),
    defaultMeta: {service: 'identity-service'},  // defaultMeta	Sets default metadata for all log messages service, A key to label which microservice sent the log 'identity-service', The name of the microservice that will appear in logs
    //A transport is basically where your logs will be output. You can have multiple transports: one for console, one for file, one for HTTP, etc.
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({filename: 'error.log', level: 'error'}), // It will show only error in error.log file
        new winston.transports.File({filename: 'combined.log'}), // If you don't specify a level, Winston uses the default level, which is typically info.
    ]
})

module.exports = logger






/*
Level	Number	What it Means	Example Message

error	0	Serious problem, the app might crash	“Database not found!”
warn	1	Something is wrong, but not critical	“Disk space running low”
info	2	General info about app’s behavior	“User logged in”
http	3	HTTP-related info (optional level)	“GET /home 200 OK”
verbose	4	Detailed logs (more than info)	“Processing request step 3”
debug	5	Debugging info for developers	“Checking variable x: value = 10”
silly	6	Too much info, usually not needed	“Entered loop at line 7”
*/