/**
 * Created by Jbt on 11/30/2016.
 */

feedTweetsJsonArray = [
        {username: 'Bobo', text: 'hello followers!'},
        {username: 'Elvis', text: 'this exercise is really easy!'},
        {username: 'Mimi', text: 'I want to go to sleep'}];

function htmlStringToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function createTweetElement(userAvatarImageSrc, userName, tweetContent){
    var tweetModule = "<div name='tweet' class='row'>" +
                            "<div class='col-md-1'>" +
                                 "<img class='user-avatar-img' src=" + userAvatarImageSrc + "/>" +
                            "</div>" +
                            "<aside class='col-md-2'>"+
                                  "<strong>" + userName + "</strong>" +
                                  "<p>" + tweetContent + "</p>" +
                            "</aside>" +
                        "</div>";
    return htmlStringToElement(tweetModule);
}

function getUserName(userId) {
    return axios.get('http://localhost:8081/users/' + userId);
}

function loadTweetsToFeed(feedElement, feedTweetsJsonArray){
    var feedTweetsElements = document.createDocumentFragment();
    var tweetPromisesArray = [];

    for(tweetJsonAt in feedTweetsJsonArray){
        tweetPromisesArray.push(getUserName(feedTweetsJsonArray[tweetJsonAt].user).then(function (response) {
            feedTweetsElements.appendChild(createTweetElement("../../images/useravatar.png",
                response.data[0].username,
                feedTweetsJsonArray[tweetJsonAt].text));
        }));
    }

    Promise.all(tweetPromisesArray).then(function(){
            feedElement.appendChild(feedTweetsElements);
        }
    );
}

function uploadTweetToFeed(feedElement, userName, tweetContent){
        feedElement.appendChild(createTweetElement("../../images/useravatar.png",
            userName,
            tweetContent));
}

function getTweetsFromServer(feedElement){
    axios.get('http://localhost:8081/tweets')
        .then(function (response) {
            loadTweetsToFeed(feedElement, response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function addTweetToFeedServer(tweetUserId, tweetContent){
    axios.post('http://localhost:8081/users/ToggleUserFollowees',{text:tweetContent,user:tweetUserId});
}

function encodeHTML(encodeString) {
    return encodeString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function testXss(){
    var publishTweetButtonElement = document.getElementById("publish-tweet");
    var publishTweetContent = document.getElementById("publish-tweet-content");
    publishTweetContent.value = "<script>alert('a')</script>";
    publishTweetButtonElement.click();

    if($('p').elements[($('p').elements).length - 1].textContent == "<script>alert('a')</script>"){
        return true;
    } else {
        return false;
    }
}


function logoExist(){
    if($('#logo').elements.length > 0){
        return true;
    } else {
        return false;
    }
}

function hasImageAvatar(){
    var publishTweetButtonElement = document.getElementById("publish-tweet");
    var publishTweetContent = document.getElementById("publish-tweet-content");
    publishTweetContent.value = "test";
    publishTweetButtonElement.click();

    if($('img').any(function(element){return element.classList.contains("user-avatar-img")})){
        return true;
    } else {
        return false;
    }
}

function tweetApplyToServer(){
    var feedTweetsNumber = feedTweetsJsonArray.length;
    var publishTweetButtonElement = document.getElementById("publish-tweet");
    var publishTweetContent = document.getElementById("publish-tweet-content");
    publishTweetContent.value = "test";
    publishTweetButtonElement.click();

    if(feedTweetsNumber < feedTweetsJsonArray.length){
        return true;
    } else {
        return false;
    }
}


// test_group('first test group', function() {
//     assert(document.getElementById("followees-content").firstElementChild, "simple successful test");
//     assert(true, "simple successful test 2");
//     assert(false, "simple unsuccessful test");
// });
//
// test_group('second test group', function() {
//     assert(true, "simple successful test");
//     assert(true, "simple unsuccessful test 2");
//     assert(true, "simple unsuccessful test 3");
// });

function getActiveUser(){
    return axios.get('/activeUser');
}

window.onload = function(){
    var feedElement = document.getElementById("feed");
    var publishTweetElement = document.getElementById("publish-tweet");
    var publishTweetContent = document.getElementById("publish-tweet-content");

    getTweetsFromServer(feedElement);
    getActiveUser().then(function(activeUserData){
        publishTweetElement.addEventListener("click", function(){
            addTweetToFeedServer(activeUserData.data.username, encodeHTML(publishTweetContent.value));
            uploadTweetToFeed(feedElement,activeUserData.data.username, encodeHTML(publishTweetContent.value));
            publishTweetContent.value = "";
        });
    });
    // test_group('Test feed inputs',function(){assert(testXss(),"xss test");
    //     assert(tweetApplyToServer(),"Servers updated");
    // });
    //
    // test_group('Test feed outputs',function(){
    //     assert(logoExist(),"Has site logo");
    //     assert(hasImageAvatar(),"Has avatar imga test");
    // });
};
