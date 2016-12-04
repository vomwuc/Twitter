/**
 * Created by Jbt on 11/30/2016.
 */
var users = [{username: 'Bobo',followStatus:true, avatarImgSrc:"../images/useravatar.png"},
    {username: 'Elvis', followStatus:false, avatarImgSrc:"../images/useravatar.png"},
    {username: 'Mimi', followStatus:false, avatarImgSrc:"../images/useravatar.png"}];

function htmlStringToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function createUserElement(userAvatarImageSrc, userName, followStatus){
    var userWithNoSpaces = userName.replace(/\s/gi, "");
    var userModule = "<div name='user' id='"+ userWithNoSpaces +"' class='col-md-2'>" +
                            "<div class='thumbnail text-center'>" +
                                "<img src=" + userAvatarImageSrc + "/>" +
                                "<div class='caption'>" +
                                    "<button onclick='toggleFollowStatusButton(\""+userName+"\", "+followStatus+");' name='follow-status-btn' class='btn btn-primary'>" +followStatusToString(followStatus) + "</button>" +
                                    "<p>" + userName + "</p>" +
                                "</div>" +
                            "</div>" +
                       "</div>";
    return htmlStringToElement(userModule);
}

function toggleFollowStatusButton(userName, followStatus){

    for(user in users){
        if(users[user].username === userName){
            users[user].followStatus = !users[user].followStatus;
        }
    }
}

function getFollowStatusJsonArray(){
    return {true:"follow", false:"unfollow"};
}

function followStatusToString(followStatus){
    return getFollowStatusJsonArray()[!followStatus];
}

function loadUsers(usersContentElement, usersJsonArray){
    var usersElements = document.createDocumentFragment();

    for(userJson in usersJsonArray){
        var userElement = createUserElement(usersJsonArray[userJson].avatarImgSrc,
                usersJsonArray[userJson].username,
                usersJsonArray[userJson].followStatus);
        usersElements.appendChild(userElement);
    }

    usersContentElement.appendChild(usersElements);
}

function getFolloweesJsonArray(){
    return [{username: 'Bobo'}];
}

function addNewFollowees(userJson, followeesJsonArray) {
    followeesJsonArray.push(userJson.username);
}

function getUserName(userJson){
    return userJson['username'];
}

function filterUsers(userName, usersJsonList){
    var userNameRegex = new RegExp("^" + userName);
    return usersJsonList.filter(function(userJsona){return userNameRegex.test(getUserName(userJsona))});
}

// function ButtonToggle(buttonElement){
//     buttonElement.addEventListener('click',)
//     return !buttonElement;
// }

function getFollowees(){
    return users.filter(function(user){return user.followStatus});
}

window.onload = function(){
    var usersContentElement = document.getElementById("all-users");
    var foloweesElement = document.getElementById("followees-content");
    usersContentElement.innerHTML = "";
    loadUsers(usersContentElement, users);
    var filterTextBox = document.getElementById("filter-users-by-user-name");
    var filterButton = document.getElementById("filter-users-button");
    var followButtons = document.getElementsByName("follow-status-btn");

    for(followButton = 0; followButton < followButtons.length; followButton++){
        var x = document.getElementById(followButtons[followButton].id);
    }
    foloweesElement.innerHTML = "";
    loadUsers(foloweesElement,getFollowees());

    filterTextBox.addEventListener('keyup', function(){
        usersContentElement.innerHTML = "";
        loadUsers(usersContentElement,filterUsers(filterTextBox.value,users));
    });
    filterButton.addEventListener('click', function(){
        usersContentElement.innerHTML = "";
        loadUsers(usersContentElement,filterUsers(filterTextBox.value,users));
    });
};