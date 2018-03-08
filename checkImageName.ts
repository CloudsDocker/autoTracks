import * as http from 'https';
import { request } from "https";
import { argv } from 'yargs';
import * as querystring from 'querystring';


console.log("========= start =============")

const username: string = argv.username || 'todd.zhang@xx.com';
const password: string = argv.password || 'xxx';
const host: string = argv.host || 'uatinternal.uat.apigeexxx.com';

console.log('==== username:' + username);
console.log('==== password:' + password);

if (!username || !password) {
    throw new Error('missing user name and password')
}

let Authorization = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

let data = querystring.stringify({
    username: username,
    password: password,
    apigeeUrl: host,
});

let streamData: any[] = [];
let body: string;
let op = {
    host: `server.apit.ocp.xxxx.com`,
    port: 443,
    path: `/login`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    },
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
}

let reqGet = request(op, function (res) {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        streamData.push(chunk);
    }).on('end', () => {
        body = streamData.toString();
        if ((/^Authentication Successful$/i).test(body)) {
            console.log('=========== All good ==========');
        }

    }).on('error', function (e) {
        console.error("========Error:", e);
    })
});
reqGet.write(data);
reqGet.end();



console.log("========= done =============")
