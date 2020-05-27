# wtda

本地数据同步

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/wtda.svg)](https://npmjs.org/package/wtda)
[![Downloads/week](https://img.shields.io/npm/dw/wtda.svg)](https://npmjs.org/package/wtda)
[![License](https://img.shields.io/npm/l/wtda.svg)](https://github.com/wentao75/wtda/blob/master/package.json)

<!-- toc -->

- [wtda](#wtda)
- [用法](#用法)
<!-- tocstop -->

# 用法

<!-- usage -->

```sh-session
$ npm install -g wtda
$ wtda COMMAND
running command...
$ wtda (-v|--version|version)
wtda/0.0.1 darwin-x64 node-v12.16.3
$ wtda --help [COMMAND]
USAGE
  $ wtda COMMAND
...
```

<!-- usagestop -->

# 命令

<!-- commands -->

-   [`wtda clear`](#wtda-clear)
-   [`wtda deal`](#wtda-deal)
-   [`wtda help [COMMAND]`](#wtda-help-command)
-   [`wtda test DATATYPE CODE`](#wtda-test-datatype-code)
-   [`wtda update`](#wtda-update)

## `wtda clear`

清除所有数据

```
USAGE
  $ wtda clear

DESCRIPTION
  ...
  将当前全部数据清除
```

_See code: [src/commands/clear.js](https://github.com/wentao75/wtda/blob/v0.0.1/src/commands/clear.js)_

## `wtda deal`

Describe the command here

```
USAGE
  $ wtda deal

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/deal.js](https://github.com/wentao75/wtda/blob/v0.0.1/src/commands/deal.js)_

## `wtda help [COMMAND]`

display help for wtda

```
USAGE
  $ wtda help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.0/src/commands/help.ts)_

## `wtda test DATATYPE CODE`

用于测试单个股票代码的数据读取和保存

```
USAGE
  $ wtda test DATATYPE CODE

ARGUMENTS
  DATATYPE  数据类型：daily, adjustFactor, suspendInfo, dailyBasic, moneyFlow, indexDaily, income, balanceSheet,
            cashFlow, forecast, express, dividend, financialIndicator, financialMainbiz, disclosureDate

  CODE      股票代码

OPTIONS
  -f, --force  强制更新所有数据

DESCRIPTION
  ...
```

_See code: [src/commands/test.js](https://github.com/wentao75/wtda/blob/v0.0.1/src/commands/test.js)_

## `wtda update`

同步更新最新数据

```
USAGE
  $ wtda update

OPTIONS
  -d, --dividend  更新分红送股数据
  -f, --force     强制更新所有数据
  -i, --index     更新指数数据
  -m, --mainbiz   更新主营业务数据
  -n, --finance   更新股票财务数据
  -p, --pledge    更新股权质押数据
  -s, --stock     更新股票信息数据

DESCRIPTION
  ...
  默认数据更新根据当前已经存在的数据执行，只对最新数据进行读取和添加；
  列表数据会直接更新；默认更新股票列表和主要的指数列表，同时更新对应的股票和指数日线；
  可以选择只更新列表或者日线
```

_See code: [src/commands/update.js](https://github.com/wentao75/wtda/blob/v0.0.1/src/commands/update.js)_

<!-- commandsstop -->
