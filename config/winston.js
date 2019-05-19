let appRoot = require('app-root-path');
let winston = require('winston');

let options = {
    file: {
        level: 'verbose',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

let logger = new winston.createLogger({
    transports: [
        new (winston.transports.File)(options.file),
        new (winston.transports.Console)(options.console)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;