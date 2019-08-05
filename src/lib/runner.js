let spawn = require('cross-spawn'),
    process = require('process');

let runner = async function (options){
    return new Promise(function(resolve, reject){
        options = options || {};
        options.cmd = options.cmd || '';
        options.cwd = options.cwd || process.cwd();
        options.args = options.args || [];
        
        let result = '',
            error = '',
            child = spawn(options.cmd, options.args, { cwd : options.cwd, env: process.env });

        child.stdout.on('data', function (data) {
            if (options.verbose)
                console.log(data.toString('utf8'));
            result += data.toString('utf8');
        });
            
        child.stderr.on('data', function (data) {
            if (options.verbose)
                console.log(data.toString('utf8'));
            error += data.toString('utf8');
        });
    
        child.on('error', function (err) {
            return reject(err);
        });
        
        child.on('close', function (code) {
            if (error.length)
                return reject(error);

            resolve( {
                code : code,
                result : result
            });
        });
    })
}  

module.exports = runner;