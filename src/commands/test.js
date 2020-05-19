const { Command, flags } = require("@oclif/command");
const pino = require("pino");
const {
    updateDailyData,
    updateAdjustFactorData,
    updateDailyBasicData,
} = require("@wt/lib-wtda");

const logger = pino({
    level: process.env.LOGGER || "info",
    prettyPrint: {
        levelFirst: true,
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
        crlf: true,
    },
    prettifier: require("pino-pretty"),
});

class TestCommand extends Command {
    async run() {
        const { flags, args } = this.parse(TestCommand);
        if (flags.all || flags.stock) {
            await updateDailyData(flags.code, flags.force, "S");
        }
        if (flags.all || flags.adj) {
            await updateAdjustFactorData(args.code, flags.force);
        }
        if (flags.all || flags.basic) {
            await updateDailyBasicData(args.code, flags.force);
        }
    }
}

TestCommand.description = `用于测试单个股票代码的数据读取和保存
...

`;
TestCommand.args = [
    {
        name: "code",
        required: true,
        description: "测试股票代码",
    },
];
TestCommand.flags = {
    // code: flags.string({ char: "c", description: "代码" }),
    force: flags.boolean({
        char: "f",
        description: "强制更新所有数据",
        default: false,
    }),
    stock: flags.boolean({
        char: "s",
        description: "更新股票日线数据",
        default: false,
    }),
    adj: flags.boolean({
        char: "j",
        description: "更新股票复权因子数据",
        default: false,
    }),
    basic: flags.boolean({
        char: "b",
        description: "更新股票基本面数据",
        default: false,
    }),
    all: flags.boolean({
        char: "a",
        description: "更新包括全部指数数据",
        default: false,
    }),
};

module.exports = TestCommand;
