var request = require("request");

var user = '',
    feedEntries,
    lang = 'en';

var freeleticsUrl = 'http://www.freeletics.com/' + lang + '/';


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
            //'Authorization': 'Token token=' + user.auth_token
            'Authorization': 'Token token=1XbzfzXS5qSNFnhZM1D6Jw'
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, parseFeed);
};

function parseFeed (err, res, body) {
    feedEntries = JSON.parse(body).feed_entries;
    //console.log(feedEntries);
    postToSlack(feedEntries[0]);
}

function postToSlack(data) {

    var woUser = data.user,
        woFeedEntry = data.object,
        wo = woFeedEntry.workout,
        woMinutes = Math.floor(woFeedEntry.seconds/60),
        woSeconds = woFeedEntry.seconds - woMinutes * 60,
        star = woFeedEntry.star ? ' :star: ' : ' ',
        personalBest = woFeedEntry.personal_best ? ' PB ' : '',
        twobytwo = wo.category_slug == 'home' ? ' 2x2 ' : '',
        postText = woUser.first_name + ' ' + woUser.last_name +
            ' finished workout ' + wo.title + ' in ' +
            woMinutes + ':' + woSeconds + '!',
        postTitle = wo.title + twobytwo +
            ' ('+ wo.fitness_variant + ') ' +
            star + personalBest +
            woMinutes + ':' + woSeconds;

    request({
        url: 'https://hooks.slack.com/services/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',
        method: 'POST',
        json: {
            //'text' : postText ,
            'attachments' : [{
                'text' : woFeedEntry.description,
                'color' : '#000000',
                'fallback' : postText,
                'thumb_url' : woFeedEntry.picture.feed,
                'author_name' : woUser.first_name + ' ' + woUser.last_name,
                'author_link' : freeleticsUrl + 'users/' + woUser.id + '/feed',
                'author_icon' : woUser.profile_pictures.small,
                'title' : postTitle,
                'title_link' : freeleticsUrl + 'community/feed-entries/training/' + woFeedEntry.id
            }]
        },
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(err, res, body){
        //console.log(res);
        if (err) {
            console.log(err);
        }
    });

}