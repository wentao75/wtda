/**
 * TODO:
 * 1. 数据结构（对应到本地或远程存储结构）
 *
 *
 * 股票数据访问层，主要用于计算和一些处理
 * 1. 后续会将数据的远程访问，本地访问在这里集成
 * 2.
 */

const _ = require("lodash")
const moment = require("moment")
// const {FlowControl} = require("./flow-control")
const FlowControl = require("lib-flowcontrol")

const tushare = require("./tushare")

const stockData = require("./stockdata")

// const os = require("os")
const path = require("path")
const fs = require("fs")
const fp = fs.promises

const dailyControl = new FlowControl(20, 0, "日线控制池")

/**
 * 数据更新，如果force为true，则需要将所有数据更新为最新（相当于全部重新读取）
 * @param {boolean} force 强制更新所有数据
 */
async function updateData(force = false) {
    let now = moment()
    // let endDate = now.format("YYYYMMDD")

    // 首先更新股票列表数据
    let stockBasicData = await tushare.stockBasic()

    let stockList = {
        updateTime: now.toISOString(),
        data: stockBasicData,
    }
    await saveListFile(stockList, stockData.STOCKLIST_FILE)

    // 更新股票指数列表数据
    let indexList = {
        updateTime: now.toISOString(),
        data: [],
    }

    // console.debug("开始请求指数数据：")
    let allIndexData = await Promise.all(tushare.indexMarketList.map(async (market) => {
        return tushare.indexBasic(market.code)
        // console.debug("返回指数基础数据：", indexBasicData)
        // return indexBasicData
    }))

    // console.debug("所有指数请求返回！", allIndexData && allIndexData.length)
    if (allIndexData && allIndexData.length > 0) {
        allIndexData.forEach((data) => {
            // console.debug("指数数据：", data && data.length)
            if (data && data.length > 0) {
                // 合并之前做一次数据检查，对于已经终止的指数进行过滤
                let total = data.length
                data = data.filter((item) => {
                    return _.isEmpty(item.exp_date)
                })
                let filteredTotal = data.length
                console.debug("指数过滤：", total, filteredTotal)
                indexList.data.push(...data)
            }
        })
    }
    // console.debug("保存指数数据！")
    await saveListFile(indexList, stockData.INDEXLIST_FILE)

    // 读取股票日线数据
    // 根据获取的最新股票列表数据，进行日线数据更新，按照force来进行相应的范围读取和更新
    // force=false，则仅更新没有的数据
    // force=true，更新全部数据
    if (_.isArray(stockBasicData) && stockBasicData.length > 0) {
        stockBasicData.forEach((data) => {
            // console.log("updateDailyData", data.ts_code)
            dailyControl.call(updateDailyData, data.ts_code, force, "S")
            // await updateDailyData(data, force)
        })
    }

    // For test
    // let tmp = stockBasicData[0]
    // await updateDailyData(tmp, force
    if (_.isArray(indexList.data) && indexList.data.length > 0) {
        indexList.data.forEach((data) => {
            dailyControl.call(updateDailyData, data.ts_code, force, "I")
        })
    }

    console.log(tushare.showInfo())
}

/**
 * 更新指定代码的日历史数据
 * @param {string} tsCode 代码
 * @param {boolean} force 是否强制更新
 * @param {string} type 股票类型，S表示普通股票，I表示指数
 */
async function updateDailyData(tsCode, force = false, type = "S") {
    // console.log("更新日线：", tsCode, force)
    if (_.isEmpty(tsCode)) {
        return ({data: []})
    }
    if (type !== "S" && type !== "I") {
        return ({data: []})
    }

    // let tsCode = data.ts_code
    // console.log("执行更新日线：", tsCode, force)
    let dailyData
    if (force) {
        console.debug("force update: ", tsCode)
        let data
        if (type === "S") {
            data = await tushare.stockDaily(tsCode)
        } else {
            data = await tushare.indexDaily(tsCode)
        }
        dailyData = {
            updateTime: moment().toISOString(),
            data,
        }
        console.info(`日线数据强制更新，代码 ${tsCode}, 更新时间：${dailyData.updateTime}, 总条数：${dailyData.data && dailyData.data.length}`)
    } else {
        dailyData = await stockData.readStockDaily(tsCode)
        // console.log("read data from disk:", dailyData)
        // let currentUpdateTime = dailyData.updateTime

        let startDate = ""
        if (dailyData.data && dailyData.data.length > 0) {
            let lastDate = dailyData.data[0].trade_date
            startDate = moment(lastDate, "YYYYMMDD").add(1, "days").format("YYYYMMDD")
            let now = moment()
            if (now.diff(startDate, "days") <= 0 && now.hours() < 15) {
                // 还没有最新一天的数据，不需要
                console.log("%s 没有新的数据，不需要更新", tsCode)
                return
            }
        }

        let newData
        if (type === "S") {
            newData = await tushare.stockDaily(tsCode, startDate)
        } else {
            newData = await tushare.indexDaily(tsCode, startDate)
        }
        if (newData && newData.length > 0) {
            dailyData.updateTime = moment().toISOString()
            dailyData.data.unshift(...newData)
            console.info(`日线数据更新，代码 ${tsCode}, 更新时间：${dailyData.updateTime}, 更新条数：${newData && newData.length}，总条数：${dailyData.data && dailyData.data.length}`)
        } else {
            dailyData = null
            console.info(`日线数据没有更新，代码 ${tsCode}`)
        }
    }

    try {
        if (dailyData) {
            await stockData.checkDataPath()

            let jsonStr = JSON.stringify(dailyData)
            let stockDailyFile = path.join(stockData.getDataRoot(), stockData.DAILYHISTORY_PATH, tsCode + ".json")
            await fp.writeFile(stockDailyFile, jsonStr, "utf-8")
        }
    } catch (error) {
        throw new Error("保存股票历史数据时出现错误，请检查后重新执行：" + tsCode + "," + error)
    }
}

// async function saveStockList(data) {
//     try {
//         await stockData.checkDataPath()

//         let jsonStr = JSON.stringify(data)
//         let stockListPath = path.join(stockData.getDataRoot(), stockData.STOCKLIST_FILE)

//         await fp.writeFile(stockListPath, jsonStr, {encoding: "utf-8"})
//     } catch (error) {
//         throw new Error("保存股票列表数据时出现错误，请检查后重新执行：" + error)
//     }
// }

async function saveListFile(data, fileName) {
    try {
        await stockData.checkDataPath()

        let jsonStr = JSON.stringify(data)
        let listPath = path.join(stockData.getDataRoot(), fileName)

        await fp.writeFile(listPath, jsonStr, {encoding: "utf-8"})
    } catch (error) {
        throw new Error("保存列表数据时出现错误，请检查后重新执行：" + error)
    }
}

/**
 * 清除所有已经同步的数据
 */
async function clearAllData() {
    try {
        console.debug("检查根目录状态：")
        await stockData.checkDataPath()

        // 首先删除股票列表信息文件
        console.info("清理股票列表数据...")
        let stockListPath = path.join(stockData.getDataRoot(), stockData.STOCKLIST_FILE)
        try {
            await fp.access(stockListPath, fs.constants.F_OK)
            try {
                await fp.unlink(stockListPath)
            } catch (error) {
                throw error
            }
        } catch (error) {
            // 文件不存在，直接忽略
        }
        console.info("清理股票列表数据完成")

        console.info("清理指数列表数据...")
        let indexListPath = path.join(stockData.getDataRoot(), stockData.INDEXLIST_FILE)
        try {
            await fp.access(indexListPath, fs.constants.F_OK)
            try {
                await fp.unlink(indexListPath)
            } catch (error) {
                throw error
            }
        } catch (error) {
            // 文件不存在，直接忽略
        }
        console.info("清理指数列表数据完成")

        console.info("清理股票历史数据...")
        // 下面删除股票历史数据目录
        let stockDailyHistoryPath = path.join(stockData.getDataRoot(), stockData.DAILYHISTORY_PATH)
        try {
            await fp.access(stockDailyHistoryPath, fs.constants.F_OK)

            try {
                let fileList = await fp.readdir(stockDailyHistoryPath)
                console.info(`共有${fileList.length}个历史数据文件待删除`)
                fileList.forEach(async (filePath) => {
                    // console.log("to be remove: ", filePath)
                    await fp.unlink(path.join(stockDailyHistoryPath, filePath))
                })
            } catch (error) {
                throw error
            }
        } catch (error) {
            // 没有目录
        }
        console.info("清理股票历史数据完成")
    } catch (error) {
        throw new Error("清除所有已经同步数据发生错误：" + error)
    }
}

// export default
module.exports = {readStockList: stockData.readStockList, readStockDaily: stockData.readStockDaily, clearAllData, updateData}
