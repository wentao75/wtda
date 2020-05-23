const { Command } = require("@oclif/command");
const { clearAllData } = require("@wt/lib-wtda");
const { cli } = require("cli-ux");

class ClearCommand extends Command {
    async run() {
        try {
            if (await cli.confirm("确定要删除全部数据吗？( y/n )")) {
                this.log("开始清理数据...");
                await clearAllData();
                this.log("数据清理完毕！");
            }
        } catch (error) {
            this.log("清理数据过程中发生错误:", error);
        }
    }
}

ClearCommand.description = `清除所有数据
...
将当前全部数据清除
`;

module.exports = ClearCommand;
