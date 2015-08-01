var request = require("request");

var user = '';

getUser();

function getUser() {
    request({
        url: 'https://api.freeletics.com/v2/login.json',
        method: 'POST',
        json: {
            'user' : {
                'email' : 'public.mcs@gmail.com',
                'password' : 'test1234' 
            }
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, setUser);
};

function setUser(err, res, body) {
    user = body.user;
    getFeedWithFollowings();
};

function getFeedWithFollowings() {
    request({
        uri: 'https://api.freeletics.com/v2/users/' + user.id +'/feed_entries/with_followings.json',
        method: 'GET',
        headers: {
            'Authorization': 'Token token=' + user.auth_token
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function () {
        console.log(arguments);
    });
};
