const { Command } = require("@oclif/command");
const { clearAllData } = require("@wt/lib-wtda");

class ClearCommand extends Command {
    async run() {
        this.log("开始清理数据...");
        try {
            await clearAllData();
            this.log("数据清理完毕！");
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
