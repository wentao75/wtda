const { Command, flags } = require("@oclif/command");

const debug = require("debug")("main:sim");

const {
    simulate,
    rules,
    formatFxstr,
    engine,
    reports,
} = require("@wt/lib-stock");

class SimCommand extends Command {
    async run() {
        const { flags } = this.parse(SimCommand);

        debug(`%o`, flags);

        // 通过配置文件获得对应的基础配置信息
        const options = require("config");

        // 通过命令后参数，对配置参数进行一些调整
        if (flags.startdate) options.startDate = flags.startdate;
        if (flags.fixcash !== undefined) options.fixCash = flags.fixcash;
        if (flags.showtrans !== undefined) options.showTrans = flags.showtrans;
        if (flags.showworkdays !== undefined)
            options.showWorkdays = flags.showworkdays;

        if (flags.stoploss) options.stoploss.S = Number(flags.stoploss);

        let buys = "";
        let usedRules = {};
        for (let rule of options.rules.buy) {
            buys += `${rule.name}, `;
            if (!(rule.label in usedRules)) {
                usedRules[rule.label] = rule;
            }
        }

        let sells = "";
        for (let rule of options.rules.sell) {
            sells += `${rule.name}, `;
            if (!(rule.label in usedRules)) {
                usedRules[rule.label] = rule;
            }
        }

        let rules_desc = "";
        for (let label in usedRules) {
            rules_desc += usedRules[label].showOptions(options);
        }

        this.log(
            `初始资金:        ${formatFxstr(options.initBalance)}元 
测试交易资金模式:  ${options.fixCash ? "固定头寸" : "累计账户"}
测试数据周期: ${options.startDate}

规则：
买入模型：${buys}
卖出模型：${sells}

${rules_desc}
`
        );

        await simulate(options);
    }
}

SimCommand.description = `数据分析模拟
...
数据分析模拟入口
`;

SimCommand.flags = {
    startdate: flags.string({
        char: "d",
        description: "模拟计算的启动日期",
        // default: "20190101",
    }),
    n: flags.string({
        char: "n",
        description: "动能突破平均天数",
        // default: "1",
    }),
    profit: flags.string({
        char: "p",
        description: "动能突破买入波幅比例",
        // default: "0.5",
    }),
    loss: flags.string({
        char: "l",
        description: "动能突破卖出波幅比例",
        // default: "0.5",
    }),
    stoploss: flags.string({
        char: "s",
        description: "止损比例",
        // default: "0.1",
    }),
    fixcash: flags.boolean({
        // char: "f",
        description: "是否固定头寸",
        // default: true,
        allowNo: true,
    }),
    mmbtype: flags.string({
        char: "t",
        description: "MMB算法波幅类型，hc|hl",
        // default: "hl",
    }),
    showtrans: flags.boolean({
        description: "是否显示交易列表",
        // default: false,
        allowNo: true,
    }),
    showworkdays: flags.boolean({
        description: "是否显示工作日报表",
        // default: false,
        allowNo: true,
    }),
    nommb1: flags.boolean({
        description: "卖出规则不使用开盘盈利锁定",
        // default: false,
        allowNo: true,
    }),
    mmb2: flags.boolean({
        description: "卖出规则使用动能突破",
        // default: false,
        allowNo: true,
    }),
    // nommbsell: flags.boolean({
    //     description: "不使用规则：如果当日符合动能突破买入，则不卖出",
    //     default: false,
    // }),
};

module.exports = SimCommand;
