const { Command, flags } = require("@oclif/command");
const pino = require("pino");
const { updateData } = require("@wt/lib-wtda");

const logger = pino({
    level: process.env.LOGGER || "info",
    prettyPrint: {
        levelFirst: true,
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
        crlf: true,
    },
    prettifier: require("pino-pretty"),
});

class UpdateCommand extends Command {
    async run() {
        const { flags } = this.parse(UpdateCommand);
        logger.debug(`flags: %o`, flags);
        const force = flags.force;
        if (force) logger.debug("强制更新全部数据");
        else logger.debug("更新数据");
        if (flags.stock) {
            logger.debug("更新股票日线数据");
        }
        if (flags.finance) {
            logger.debug("更新股票财务数据");
        }
        if (flags.mainbiz) {
            logger.debug("更新股票主营业务数据");
        }
        if (flags.dividend) {
            logger.debug("更新股票分红送股数据");
        }
        if (flags.pledge) {
            logger.debug("更新股票股权质押数据");
        }
        if (flags.index) {
            logger.debug("更新指数数据");
        }

        updateData(
            force,
            flags.stock,
            flags.finance,
            flags.mainbiz,
            flags.dividend,
            flags.pledge,
            flags.index
        );
    }
}

UpdateCommand.description = `同步更新最新数据
...
默认数据更新根据当前已经存在的数据执行，只对最新数据进行读取和添加；
列表数据会直接更新；默认更新股票列表和主要的指数列表，
同时可以选择更新个股日线相关，个股财务数据，主营业务数据，分红送股数据，以及指数日线数据。
`;

UpdateCommand.flags = {
    force: flags.boolean({
        char: "f",
        description: "强制更新所有数据",
        default: false,
    }),
    stock: flags.boolean({
        char: "s",
        description: "更新股票信息数据",
        default: false,
    }),
    finance: flags.boolean({
        char: "n",
        description: "更新股票财务数据",
        default: false,
    }),
    mainbiz: flags.boolean({
        char: "m",
        description: "更新主营业务数据",
        default: false,
    }),
    dividend: flags.boolean({
        char: "d",
        description: "更新分红送股数据",
        default: false,
    }),
    pledge: flags.boolean({
        char: "p",
        description: "更新股权质押数据",
        default: false,
    }),
    index: flags.boolean({
        char: "i",
        description: "更新指数数据",
        default: false,
    }),
};

module.exports = UpdateCommand;
