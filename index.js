/**
 * @file 入口模块，基于 `fis3-command-init` 模块修改
 * @author sparklewhy@gmail.com
 */

exports.name = 'server <command> [options]';
exports.desc = 'launch local debug web server';
exports.options = {
    '-h, --help': 'print this help message',
    '-r, --root <path>': 'the project root directory',
    '--www <path>': 'the web root directory to serve',
    '-p, --port <number>': 'the port to listen',
    '-c, --config <config file>': 'the custom web server config file',
    '--proxy <path>': 'the proxy config file',
    '--release': 'whether serving the release files, by default serving source files'
};
exports.commands = {
    start: 'start web server'
};

exports.run = function (argv, cli, env) {
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options, exports.commands);
    }

    if (argv._.length <= 1) {
        fis.log.error('missing command param, use `-h` option to view the usage');
        return;
    }

    var cmd = argv._[1].toLowerCase();
    var options = {
        root: env.cwd,
        port: argv.port || argv.p,
        wwwRoot: argv.www,
        configFile: argv.config || argv.c,
        proxy: argv.proxy,
        serveRelease: !!argv.release
    };

    fis.serveRelease = options.serveRelease;

    var server = require('./lib/server');
    switch (cmd) {
        case 'start':
            server.start(options);
            break;
        default:
            fis.log.error(
                'unkonw command: %s, show all avialble command: server -h',
                cmd
            );
    }
};
