const { Command, flags } = require("@oclif/command");
const pino = require("pino");
const { updateDailyData, updateAdjustFactorData } = require("@wt/lib-wtda");

const logger = pino({
    // level: "debug",
    prettyPrint: {
        levelFirst: true,
        translateTime: "SYS:standard",
        crlf: true,
    },
    prettifier: require("pino-pretty"),
});

if (process.env.LOGGER) {
    logger.level = process.env.LOGGER;
}

class TestCommand extends Command {
    async run() {
        const { flags } = this.parse(TestCommand);
        await updateAdjustFactorData(flags.code, flags.force);
        // await updateDailyData(flags.code, flags.force, "S");
    }
}

TestCommand.description = `Describe the command here
...
Extra documentation goes here
`;

TestCommand.flags = {
    code: flags.string({ char: "c", description: "代码" }),
    force: flags.boolean({
        char: "f",
        description: "强制更新所有数据",
        default: false,
    }),
};

module.exports = TestCommand;
