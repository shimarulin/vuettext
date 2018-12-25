vuettext
==============

Gettext tools to improve your internationalization workflow with Vue-i18n

[![CircleCI](https://circleci.com/gh/shimarulin/vuettext.svg?style=svg)](https://circleci.com/gh/shimarulin/vuettext)
[![Version](https://img.shields.io/npm/v/vuettext.svg)](https://npmjs.org/package/vuettext)
[![Downloads/week](https://img.shields.io/npm/dw/vuettext.svg)](https://npmjs.org/package/vuettext)
[![License](https://img.shields.io/npm/l/vuettext.svg)](https://github.com/shimarulin/vuettext/blob/master/package.json)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g vuettext
$ vuettext COMMAND
running command...
$ vuettext (-v|--version|version)
vuettext/0.1.0 linux-x64 node-v10.14.1
$ vuettext --help [COMMAND]
USAGE
  $ vuettext COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vuettext help [COMMAND]`](#vuettext-help-command)
* [`vuettext xgettext PATTERN`](#vuettext-xgettext-pattern)

## `vuettext help [COMMAND]`

display help for vuettext

```
USAGE
  $ vuettext help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `vuettext xgettext PATTERN`

Extract Vue-i18n strings from *.js and *.vue files to *.pot file

```
USAGE
  $ vuettext xgettext PATTERN

ARGUMENTS
  PATTERN  [default: **/*.{js,vue}] Glob pattern to specify files to be extracting
           Vue-i18n strings. Expected string or separated comma strings
           Needs to be surrounded with quotes to prevent shell globbing.
           Guide to globs: https://github.com/isaacs/node-glob#glob-primer

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  (required) [default: messages.pot] Path to output file

  --ignore=ignore      Glob pattern to specify ignored files
                       Expected string or separated comma strings
```

_See code: [src/commands/xgettext.ts](https://github.com/shimarulin/vuettext/blob/v0.1.0/src/commands/xgettext.ts)_
<!-- commandsstop -->
