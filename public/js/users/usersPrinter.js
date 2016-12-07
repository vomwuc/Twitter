/**
 * Created by Jbt on 12/7/2016.
 */

function htmlStringToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

function getFollowStatusJsonArray(){
    return {true:"follow", false:"unfollow"};
}

function followStatusToString(followStatus){
    return getFollowStatusJsonArray()[!followStatus];
}

function createUserElement(userAvatarImageSrc, userName, followStatus, userClass){
    var userWithNoSpaces = userName.replace(/\s/gi, "");
    var followStatusButtonId = userWithNoSpaces + "Button";
    if(userClass == ""){ //followees element
        userWithNoSpaces += "Followees";
        followStatusButtonId += "Followees";
    }
    var userModule = "<div name='user' id='"+ userWithNoSpaces +"' class='"+userClass+"'>" +
        "<div class='thumbnail text-center'>" +
        "<img src=" + userAvatarImageSrc + "/>" +
        "<div class='caption'>" +
        "<button id='"+followStatusButtonId+"' onclick='toggleFollowStatusButton(\""+userName+"\", \""+userAvatarImageSrc+"\");' name='follow-status-btn' class='btn btn-primary'>" +followStatusToString(followStatus) + "</button>" +
        "<p>" + userName + "</p>" +
        "</div>" +
        "</div>" +
        "</div>";
    return htmlStringToElement(userModule);
}

function isFollowedUser(activeUser, checkUser){
    var userFolloweesIds = activeUser.following;
    var followeesUserWithCheckUserId = userFolloweesIds.filter(function (followedUserId) {
        return followedUserId == checkUser._id;
    });

    return followeesUserWithCheckUserId.length > 0;
}

function loadUsersByClass(usersContentElement, usersJsonArray, activateUser, userClass){
    var usersElements = document.createDocumentFragment();

    for(userJson in usersJsonArray){
        if(usersJsonArray[userJson]._id != activateUser._id){
            var userElement = createUserElement("../../images/useravatar.png",
                usersJsonArray[userJson].username,
                isFollowedUser(activateUser,usersJsonArray[userJson]), userClass);
            usersElements.appendChild(userElement);
        }
    }

    usersContentElement.appendChild(usersElements);
}

function loadUsers(usersContentElement, usersJsonArray, activateUser, userClass){
    loadUsersByClass(usersContentElement, usersJsonArray, activateUser, userClass);
}

function getFollowees(users, followeesIds){
    return users.filter(function(user){return followeesIds.includes(user._id)});
}

function loadFollowees(usersContentElement, usersJsonArray, activateUser, userClass){
    loadUsersByClass(usersContentElement, getFollowees(usersJsonArray, activateUser.following), activateUser, userClass);
}

function loadUsersContent(usersContentElement, foloweesElement, users){
    loadUsers(usersContentElement, users,users[0],"col-md-2");
    loadFollowees(foloweesElement, users,users[0], "");
}
