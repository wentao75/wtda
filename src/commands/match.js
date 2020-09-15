const { Command, flags } = require("@oclif/command");

const debug = require("debug")("main:sim");

const {
    simulate,
    search,
    rules,
    formatFxstr,
    engine,
    reports,
} = require("@wt/lib-stock");
const { option } = require("@oclif/command/lib/flags");

class MatchCommand extends Command {
    async run() {
        const { flags } = this.parse(MatchCommand);

        // 通过配置文件获得对应的基础配置信息
        const options = require("config");
        if (flags.startdate) options.startDate = flags.startdate;

        await search(options);
    }
}

MatchCommand.description = `查找匹配规则/模式
...
根据配置查找符合规则/模式的数据
`;

MatchCommand.flags = {
    startdate: flags.string({
        char: "d",
        description: "模拟计算的启动日期",
        default: "20190101",
    }),
};

module.exports = MatchCommand;
