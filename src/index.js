// force import .env settings
require('custom-env').env();

let http = require('http'),
    process = require('process'),
    runner = require('./lib/runner'),
    svnUrl = process.env.svnurl || 'SVN-URL-NOT-SET'
    svnUser = process.env.svnuser || 'SVN-USER-NOT-SET',
    svnPassword = process.env.svnpassword || 'SVN-PASSWORD-NOT-SET',
    port = process.env.port || 3100; 

let server = http.createServer(async function (req, res) {
    let route = req.url.toLowerCase();
    if (route.indexOf('/status') === 0){
        try {
            let response = await runner({ cmd : 'svn', args : ['info', svnUrl, '--username', svnUser, '--password', svnPassword] }); 
            if (response.code !== 0)
                throw response.code;
    
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('svn is online');
   
        } catch(ex){
            res.writeHead(550, {'Content-Type': 'text/plain'});
            res.end(ex.toString());
        }
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Use /status \n');
    }

});

server.listen(port);
console.log(`Server running at port ${port}`);
