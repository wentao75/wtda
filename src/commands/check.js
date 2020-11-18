const { Command } = require("@oclif/command");

class CheckCommand extends Command {
    async run() {
        // const { flags } = this.parse(CheckCommand);
        // const name = flags.name || "world";
        // this.log(
        //     `hello ${name} from /Users/wentao/workspace/stock/wtda/src/commands/check.js`
        // );
    }
}

CheckCommand.description = `用于交易时准实时跟踪计算最新指标情况
...
主要使用Everyday指标，计算买入和卖出在最新价情况下的结果
计算范围包括持有票和跟踪票
1. 持有票的目标为检查设置的规则是否有卖出规则触发或者指定的预警规则触发
2. 跟踪票的目标为检查指标是否存在有买入规则触发

这个子命令后台保持执行（无论是终端或者界面模式下），除非程序关闭或退出；没有输入参数，参数由配置文件初始加载。
`;

// CheckCommand.flags = {
//     name: flags.string({ char: "n", description: "name to print" }),
// };

module.exports = CheckCommand;
