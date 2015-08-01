var request = require("request");

request({
    uri: "http://api.freeletics.com/v2/profile.json",
    method: "GET",
    headers: {
        'Authorization': 'Token token=Slk3LkmJ74vEyFUQLmSPCQ'
    },
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
}, function(error, response, body) {
    console.log(body);
});
