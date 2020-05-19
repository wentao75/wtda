const { Command, flags } = require("@oclif/command");
const pino = require("pino");
const { updateData } = require("@wt/lib-wtda");

const logger = pino({
    level: process.env.LOGGER || "info",
    prettyPrint: {
        levelFirst: true,
        translateTime: "SYS:yyyy-yy-dd HH:MM:ss.l",
        crlf: true,
    },
    prettifier: require("pino-pretty"),
});

class UpdateCommand extends Command {
    async run() {
        const { flags } = this.parse(UpdateCommand);
        const force = flags.force;
        if (force) logger.debug("强制更新全部数据");
        else logger.debug("更新数据");
        if (flags.stock) {
            logger.debug("更新股票日线数据");
        }
        if (flags.adj) {
            logger.debug("更新股票复权因子数据");
        }
        if (flags.basic) {
            logger.debug("更新股票基本面数据");
        }
        if (flags.index) {
            logger.debug("更新指数日线数据");
        }
        if (flags.all) {
            logger.debug("更新全部数据");
        }

        // console.time("更新数据");
        updateData(
            force,
            flags.stock,
            flags.adj,
            flags.basic,
            flags.index,
            flags.all
        );
        // console.timeEnd("更新数据");
    }
}

UpdateCommand.description = `同步更新最新数据
...
默认数据更新根据当前已经存在的数据执行，只对最新数据进行读取和添加；
列表数据会直接更新；默认更新股票列表和主要的指数列表，同时更新对应的股票和指数日线；
可以选择只更新列表或者日线
`;

UpdateCommand.flags = {
    force: flags.boolean({
        char: "f",
        description: "强制更新所有数据",
        default: false,
    }),
    //list: flags.boolean({ char: "l", description: "仅更新列表信息" }),
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
    index: flags.boolean({
        char: "i",
        description: "更新指数日线数据",
        default: false,
    }),
    all: flags.boolean({
        char: "a",
        description: "更新包括全部指数数据",
        default: false,
    }),
};

module.exports = UpdateCommand;
