# Quizess plugin

This repository contains all Quizess project functionality.

## Who do I talk to?

For questions talk to:

* [tknox.de@gmail.com](tknox.de@gmail.com)

## Getting started
Follow the instructions:

## Development Start

Builds assets in watch mode using Webpack.

```bash
npm start
```

## Browser sync

Using BrowserSync to sync assets and enable easy cross-device testing.

## Linting Assets (JS,SASS)

Lints JS and SASS using Webpack

```bash
npm run precommit
```

## Linting PHP ##

Using [Infinum coding standards for WordPress](https://github.com/infinum/coding-standards-wp) to check php files.

To install it, you need to install [Composer](https://getcomposer.org/) first.

* Add this aliases to you bash config:

```bash
alias phpcs='vendor/bin/phpcs';
alias phpcbf='vendor/bin/phpcbf';
alias wpcs='phpcs --standard=vendor/infinum/coding-standards-wp/Infinum';
alias wpcbf='phpcbf --standard=vendor/infinum/coding-standards-wp/Infinum';
```
* Reload terminal

Checking plugin for possible violations example:

```bash
wpcs admin
```

Autofix plugin for minor violations example:

```bash
wpcbf admin
```

## Build

Builds production ready assets

```bash
npm run build

## Note

```bash
composer -o dump-autoload
```

to rebuild the composer's autoload class map. The reason why this isn't automatic is that we are folowing modified WordPress coding standards, and not PSR standards, so this has to be done manually.


## Credits

Infinum WordPress Boilerplate is used for this plugin it is maintained and sponsored by
[Infinum](https://www.infinum.co).

<img src="https://infinum.co/infinum.png" width="264">

## License

Infinum WordPress Boilerplate is Copyright © 2017 Infinum. It is free software, and may be redistributed under the terms specified in the LICENSE file.
