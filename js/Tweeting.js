/**
 * Created by Jbt on 11/30/2016.
 */

function getFeedTweetsJson(){
    return [
        {username: 'Bobo', text: 'hello followers!'},
        {username: 'Elvis', text: 'this exercise is really easy!'},
        {username: 'Mimi', text: 'I want to go to sleep'}];
}

function htmlStringToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function createTweetElement(userAvatarImageSrc, userName, tweetContent){
    var tweetModule = "<div name='tweet' class='row'>" +
                            "<div class='col-md-1'>" +
                                 "<img src=" + userAvatarImageSrc + "/>" +
                            "</div>" +
                            "<aside class='col-md-2'>"+
                                  "<strong>" + userName + "</strong>" +
                                  "<p>" + tweetContent + "</p>" +
                            "</aside>" +
                        "</div>";
    return htmlStringToElement(tweetModule);
}

function loadTweetsToFeed(feedElement, feedTweetsJson){
    var feedTweetsElements = document.createDocumentFragment();

    for(tweet in feedTweetsJson){
        feedTweetsElements.appendChild(createTweetElement("../images/useravatar.png",
                                       feedTweetsJson[tweet].username,
                                       feedTweetsJson[tweet].text));
    }

    feedElement.appendChild(feedTweetsElements);
}

function addTweetToFeed(feedJsonArray, tweetUserName, tweetContent){
    feedJsonArray.push({username:tweetUserName, text:tweetContent});
}

window.onload = function(){
    var feedElement = document.getElementById("feed");
    var feedTweetsJson = getFeedTweetsJson();
    var publishTweetElement = document.getElementById("publish-tweet");
    var publishTweetContent = document.getElementById("publish-tweet-content");
    publishTweetElement.addEventListener("click", function(){
        addTweetToFeed(feedTweetsJson, "Evgeny Nemzer", publishTweetContent.value);
        feedElement.innerHTML = "";
        loadTweetsToFeed(feedElement, feedTweetsJson);
    });
    loadTweetsToFeed(feedElement, feedTweetsJson);
};
