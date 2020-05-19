wtda
====

本地数据同步

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/wtda.svg)](https://npmjs.org/package/wtda)
[![Downloads/week](https://img.shields.io/npm/dw/wtda.svg)](https://npmjs.org/package/wtda)
[![License](https://img.shields.io/npm/l/wtda.svg)](https://github.com/wentao75/wtda/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wtda
$ wtda COMMAND
running command...
$ wtda (-v|--version|version)
wtda/0.0.1 darwin-x64 node-v10.20.1
$ wtda --help [COMMAND]
USAGE
  $ wtda COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wtda clear`](#wtda-clear)
* [`wtda help [COMMAND]`](#wtda-help-command)
* [`wtda test`](#wtda-test)
* [`wtda update`](#wtda-update)

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

## `wtda test`

Describe the command here

```
USAGE
  $ wtda test

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/test.js](https://github.com/wentao75/wtda/blob/v0.0.1/src/commands/test.js)_

## `wtda update`

同步更新最新数据

```
USAGE
  $ wtda update

OPTIONS
  -a, --all    更新包括全部指数数据
  -f, --force  强制更新所有数据
  -i, --index  更新指数日线数据
  -s, --stock  更新股票日线数据

DESCRIPTION
  ...
  默认数据更新根据当前已经存在的数据执行，只对最新数据进行读取和添加；
  列表数据会直接更新；默认更新股票列表和主要的指数列表，同时更新对应的股票和指数日线；
  可以选择只更新列表或者日线
```

_See code: [src/commands/update.js](https://github.com/wentao75/wtda/blob/v0.0.1/src/commands/update.js)_
<!-- commandsstop -->
