var request = require("request");

var user = '';

request({
    url: "https://api.freeletics.com/v2/login.json",
    method: "POST",
    json: {
        'user' : {'email' : 'public.mcs@gmail.com', 'password' : 'test1234' }
    },
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
}, function(error, response, body) {
    //console.log(body);
    user = body.user;

    request({
        uri: "https://api.freeletics.com/v2/profile.json",
        method: "GET",
        headers: {
            'Authorization': 'Token token=' + user.auth_token
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        console.log(body);
    });

});



