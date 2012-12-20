var spawn = require('child_process').spawn;

exports.variables = {
    project: 'Project name: ',
    description: 'Project description: ',
    username: 'Project username: ',
    name: function(values, callback) {
        spawn('git', [
            '--bare',
            'config',
            '--global',
            'user.name'
        ]).stdout.once('data', callback);
    },
    email: function(values, callback) {
        spawn('git', [
            '--bare',
            'config',
            '--global',
            'user.email'
        ]).stdout.once('data', callback);
    }
};
