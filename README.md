vuettext
==============

Gettext tools to improve your internationalization workflow with Vue-i18n

[![Version](https://img.shields.io/npm/v/vuettext.svg)](https://npmjs.org/package/vuettext)
[![CircleCI](https://img.shields.io/circleci/project/github/shimarulin/vuettext.svg)](https://circleci.com/gh/shimarulin/vuettext)
[![Downloads/week](https://img.shields.io/npm/dw/vuettext.svg)](https://npmjs.org/package/vuettext)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/npm/l/vuettext.svg)](https://github.com/shimarulin/vuettext/blob/master/package.json)

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
vuettext/0.6.0 linux-x64 node-v11.6.0
$ vuettext --help [COMMAND]
USAGE
  $ vuettext COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vuettext help [COMMAND]`](#vuettext-help-command)
* [`vuettext msgfmt`](#vuettext-msgfmt)
* [`vuettext msginit FILE`](#vuettext-msginit-file)
* [`vuettext msgmerge`](#vuettext-msgmerge)
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

## `vuettext msgfmt`

Convert *.po messages to vue-i18n format

```
USAGE
  $ vuettext msgfmt

OPTIONS
  -h, --help           show CLI help

  -i, --input=input    (required) [default: i18n/messages/*.po] Glob pattern to specify *.po files. Expected string or
                       separated comma strings
                       Needs to be surrounded with quotes to prevent shell globbing.
                       Guide to globs: https://github.com/isaacs/node-glob#glob-primer

  -o, --output=output  (required) [default: i18n/locales] Path to the locales directory

  --ignore=ignore      Glob pattern to specify ignored files.
                       Expected string or separated comma strings
```

_See code: [src/commands/msgfmt.ts](https://github.com/shimarulin/vuettext/blob/v0.6.0/src/commands/msgfmt.ts)_

## `vuettext msginit FILE`

Initialize language translation (*.po file for selected language)

```
USAGE
  $ vuettext msginit FILE

ARGUMENTS
  FILE  [default: i18n/messages.pot] Input *.pot file

OPTIONS
  -h, --help
      show CLI help

  -l, --locale=locale
      language code of the language. This can be in one of three forms:
      - 'll', an ISO 639 two-letter language code (lowercase). See Language Codes for the list of codes.
      - 'll_CC', where 'll' is an ISO 639 two-letter language code (lowercase) and 'CC' is an ISO 3166
         two-letter country code (uppercase). The country code specification is not redundant: Some languages
         have dialects in different countries. For example, 'de_AT' is used for Austria, and 'pt_BR' for Brazil.
         The country code serves to distinguish the dialects. See Language Codes and Country Codes for
         the lists of codes.
      - 'll_CC@variant', where 'll' is an ISO 639 two-letter language code (lowercase), 'CC' is an ISO 3166
         two-letter country code (uppercase), and 'variant' is a variant designator. The variant designator
         (lowercase) can be a script designator, such as 'latin' or 'cyrillic'.

  -o, --output=output
      Path to output file
```

_See code: [src/commands/msginit.ts](https://github.com/shimarulin/vuettext/blob/v0.6.0/src/commands/msginit.ts)_

## `vuettext msgmerge`

Merge outdated messages (*.po files) and updated *.pot template

```
USAGE
  $ vuettext msgmerge

OPTIONS
  -d, --def=def    (required) [default: i18n/locales/*.po] Glob pattern to specify message *.po files. Expected string
                   or separated comma strings
                   Needs to be surrounded with quotes to prevent shell globbing.
                   Guide to globs: https://github.com/isaacs/node-glob#glob-primer

  -h, --help       show CLI help

  -r, --ref=ref    (required) [default: i18n/messages.pot] Path to updated reference file (*.pot template)

  --ignore=ignore  Glob pattern to specify ignored files
                   Expected string or separated comma strings
```

_See code: [src/commands/msgmerge.ts](https://github.com/shimarulin/vuettext/blob/v0.6.0/src/commands/msgmerge.ts)_

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
  -o, --output=output  (required) [default: i18n/messages.pot] Path to output file

  --ignore=ignore      Glob pattern to specify ignored files
                       Expected string or separated comma strings
```

_See code: [src/commands/xgettext.ts](https://github.com/shimarulin/vuettext/blob/v0.6.0/src/commands/xgettext.ts)_
<!-- commandsstop -->
