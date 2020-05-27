const { Command, flags } = require("@oclif/command");
const pino = require("pino");
const {
    calculateAllDailyData,
    calculateDailyData,
    calculateAllTrendPoints,
    calculateTrendPoints,
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

class DealCommand extends Command {
    async run() {
        const { args, flags } = this.parse(DealCommand);
        if (args.task === "daily") {
            if (args.code) {
                await calculateDailyData(args.code);
            } else {
                await calculateAllDailyData();
            }
        } else if (args.task === "trend") {
            if (args.code) {
                await calculateTrendPoints(args.code);
            } else {
                await calculateAllTrendPoints();
            }
        }
    }
}

DealCommand.description = `执行数据处理
...
可以根据原始数据进行下一步的数据处理和计算
`;

DealCommand.args = [
    {
        name: "task",
        required: true,
        description:
            "任务类型，daily：处理复权因子合并等日线数据；trend：计算日线趋势",
    },
    {
        name: "code",
        required: false,
        description: "股票代码，针对单一股票代码进行处理",
    },
];

DealCommand.flags = {
    // name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = DealCommand;
