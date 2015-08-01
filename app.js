var request = require("request");

var token = '';

request({
    url: "http://api.freeletics.com/v2/login.json",
    method: "POST",
    json: {
        'user' : {'email' : 'public.mcs@gmail.com', 'password' : 'test1234' }
    },
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
}, function(error, response, body) {
    console.log(body);
});


/*
request({
    uri: "http://api.freeletics.com/v2/profile.json",
    method: "GET",
    headers: {
        'Authorization': 'Token token=EIClwYn7_Jt1_gvX_TMblg'
    },
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
}, function(error, response, body) {
    console.log(body);
});
*/