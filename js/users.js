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
    var tweetModule = "<div name='user' class='col-md-2'>" +
                            "<div class='thumbnail text-center'>" +
                                "<img src='../images/useravatar.png'/>" +
                                "<div class='caption'>" +
                                    "<button class='btn btn-primary'>follow</button>" +
                                    "<p>af asdf</p>" +
                                "</div>" +
                            "</div>" +
                       "</div>" +
    return htmlStringToElement(tweetModule);
}

function loadUsers(feedElement, feedTweetsJson){
    var feedTweetsElements = document.createDocumentFragment();

    for(tweet in feedTweetsJson){
        feedTweetsElements.appendChild(createTweetElement("../images/useravatar.png",
            feedTweetsJson[tweet].username,
            feedTweetsJson[tweet].text));
    }

    feedElement.appendChild(feedTweetsElements);
}



function getUsersJson(){
    return [{username: 'Bobo'},
            {username: 'Elvis'},
            {username: 'Mimi'}];
}

function filterUsers(userName, usersJsonList){
    var userNameRegex = "^" + userName;
    return usersJsonList.filter(userNameRegex.test());
}

window.onload = function(){
    var filterTextBox = document.getElementById("filter-users-by-user-name");
    var filterButton = document.getElementById("filter-users-button");
    filterTextBox.addEventListener('change', function(){
        filterUsers(filterTextBox.value,getUsersJson());
    });
    filterButton.addEventListener('click', function(){

    });
};