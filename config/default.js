const { rules } = require("@wt/lib-stock");
const stockList = require("./hs300");
const csi500 = require("./csi500");
const actives = require("./actives");
const favorites = require("./favorites");

module.exports = {
    // 基本数据设置
    all: false,
    // startDate: "20181201", // 模拟计算的启动日期
    startDate: "19900101", // 模拟计算的启动日期
    fixCash: true, // 是否固定头寸
    initBalance: 1000000, // 初始资金余额 或 固定头寸金额
    showTrans: true,
    showWorkdays: false,
    includeSell: false, // 是否包含卖出信号

    // 匹配算法选择
    match: {
        rules: [rules.everyday, rules.squeeze, rules.swing],
        // rules: [rules.squeeze, rules.vixfix, rules.swing], //, rules.rsi, rules.holp],
    },

    everyday: {
        usewb: true, // 使用中期趋势
        longLevel: 1, // 正常信号买入趋势的最小等级（1～5)
    },

    // 基准测试
    rules: {
        buy: [rules.rsi],
        sell: [rules.rsi],
        // buy: [rules.swing],
        // sell: [rules.swing],
        // buy: [rules.squeeze],
        //buy: [rules.outsideday],
        // buy: [rules.benchmark],
        // sell: [rules.stoploss, rules.squeeze], //rules.opensell],
        // sell: [rules.benchmark],
    },
    stoploss: {
        S: 0.06, // 止损比例
    },

    mmb: {
        N: 1, // 动能平均天数
        P: 0.5, // 动能突破买入百分比
        L: 0.5, // 动能突破卖出百分比
        nommb1: false, // 是否执行开盘价锁盈
        nommb2: true, //  是否动能突破买入符合禁止卖出
        // nommbsell: flags.nommbsell, // 如果动能突破，则禁止卖出
        mmbType: "hl", // 波幅类型，hc, hl
    },
    benchmark: {
        sellPrice: "open", //"close", // 卖出价位
    },

    // 攻击日参数
    smashday: {
        type: "smash2",
        buy: {
            validDays: 3,
            type: "smash1",
        },
        sell: {
            validDays: 3,
            type: "smash1",
        },
    },

    squeeze: {
        //source: "close",
        source: "ohlc",
        ma: "ma", // "ema",
        n: 20,
        bm: 2,
        km: 1.5,
        mt: "MTM",
        mn: 12,
        mm: 1,
        tn: 8,
        tm: 34,
        tl: 55,
        needSell: false,
    },

    ttmwave: {
        n: 8, //5,
        ma: 34, //21,
        la: 55, //34,
        mb: 89, //55,
        lb: 144, //89,
        mc: 233, //144,
        lc: 377, //233,
        useb: true,
        usec: true,
        source: "close",
        digits: 3,
    },

    swing: {
        n: 8,
        m: 21,
        source: "close",
        digits: 3,
        earn1: 0.04,
        earn2: 0.08,
        loss: 0.04,
    },

    rsi: {
        n: 4,
        ma: 200,
        long: 30,
        short: 55,

        digits: 3,
    },

    vixfix: {
        n: 22,
        bn: 20,
        multi: 2.0,
        lbn: 50,
        ph: 0.9,

        digits: 3,
    },

    allStocks: Array.from(
        new Set([...favorites, ...actives, ...stockList, ...csi500])
    ),

    selectedStocks: Array.from(
        new Set([...favorites, ...actives]) //, ...stockList, ...csi500])
    ),

    // selectedStocks: ["600085.SH"],
    // selectedStocks: [
    //     // "600968.SH",
    //     "601012.SH",
    //     // "601318.SH", // 中国平安
    //     // "600036.SH", // 招商银行
    //     // "601208.SH", // 东材科技
    //     // "600489.SH", // 中金黄金
    //     // "600276.SH", // 恒瑞医药
    //     // "600363.SH", // 联创光电
    //     // "000725.SZ", // 京东方A
    //     // "600298.SH", // 安琪酵母
    //     // "300027.SZ", // 华谊兄弟
    //     // "600511.SH", // 国药股份
    //     // "601606.SH", // 长城军工
    //     // "601628.SH", // 中国人寿
    //     // "000568.SZ", // 泸州老窖
    // ],
};
