vue-i18n-tools
==============

Gettext tools to improve your internationalization workflow with Vue-i18n

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/vue-i18n-tools.svg)](https://npmjs.org/package/vue-i18n-tools)
[![Downloads/week](https://img.shields.io/npm/dw/vue-i18n-tools.svg)](https://npmjs.org/package/vue-i18n-tools)
[![License](https://img.shields.io/npm/l/vue-i18n-tools.svg)](https://github.com/shimarulin/vue-i18n-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g vue-i18n-tools
$ vue-i18n-tools COMMAND
running command...
$ vue-i18n-tools (-v|--version|version)
vue-i18n-tools/0.1.0 linux-x64 node-v10.14.1
$ vue-i18n-tools --help [COMMAND]
USAGE
  $ vue-i18n-tools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vue-i18n-tools help [COMMAND]`](#vue-i-18-n-tools-help-command)
* [`vue-i18n-tools xgettext PATTERN`](#vue-i-18-n-tools-xgettext-pattern)

## `vue-i18n-tools help [COMMAND]`

display help for vue-i18n-tools

```
USAGE
  $ vue-i18n-tools help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `vue-i18n-tools xgettext PATTERN`

Extract Vue-i18n strings from *.js and *.vue files to *.pot file

```
USAGE
  $ vue-i18n-tools xgettext PATTERN

ARGUMENTS
  PATTERN  [default: **/*.{js,vue}] Glob pattern to specify files to be extracting Vue-i18n strings.
           Expected string or separated comma strings
           Needs to be surrounded with quotes to prevent shell globbing.
           Guide to globs: https://github.com/isaacs/node-glob#glob-primer

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  (required) [default: messages.pot] Path

  --ignore=ignore      Glob pattern to specify ignored files
                       Expected string or separated comma strings
```

_See code: [src/commands/xgettext.ts](https://github.com/shimarulin/vue-i18n-tools/blob/v0.1.0/src/commands/xgettext.ts)_
<!-- commandsstop -->
