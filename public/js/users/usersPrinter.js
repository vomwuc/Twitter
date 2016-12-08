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

function createUserElement(userAvatarImageSrc, userId, userName, followStatus, userClass){

    var userModule = "<div name='user' class='"+userClass+"'>" +
        "<div class='thumbnail text-center'>" +
        "<img src=" + userAvatarImageSrc + "/>" +
        "<div class='caption'>" +
        "<button class='btn btn-primary' name='follow-status-btn' onclick='toggleFollowStatusButton(\""+userId+"\", \""+userAvatarImageSrc+"\");'>" +followStatusToString(followStatus) + "</button>" +
        "<p>" + userName + "</p>" +
        "</div>" +
        "</div>" +
        "</div>";
    return htmlStringToElement(userModule);
}

function isFollowedByUser(activeUser, checkUser){
    var userFolloweesIds = activeUser.following;
    var followeesUserWithCheckUserId = userFolloweesIds.filter(function (followedUserId) {
        return followedUserId == checkUser._id;
    });

    return followeesUserWithCheckUserId.length > 0;
}

function loadUsersByClass(usersContentElement, usersJsonArray, activeUser, userClass){
    var usersElements = document.createDocumentFragment();

    for(userJson in usersJsonArray){
        if(usersJsonArray[userJson]._id != activeUser._id){
            var userElement = createUserElement("../../images/useravatar.png",
                usersJsonArray[userJson]._id,
                usersJsonArray[userJson].username,
                isFollowedByUser(activeUser,usersJsonArray[userJson]), userClass);
            usersElements.appendChild(userElement);
        }
    }

    usersContentElement.appendChild(usersElements);
}

function loadUsers(usersContentElement, usersJsonArray, activeUser, userClass){
    loadUsersByClass(usersContentElement, usersJsonArray, activeUser, userClass);
}

function getFollowees(users, followeesIds){
    return users.filter(function(user){return followeesIds.includes(user._id)});
}

function loadUserToFollowees(usersContentElement,activeUser, user, userClass){
    var userElement = createUserElement("../../images/useravatar.png",
        user._id,
        user.username,
        isFollowedByUser(activeUser,user), userClass);
    usersContentElement.appendChild(userElement);
}

function loadFollowees(usersContentElement, usersJsonArray, activeUser, userClass){
    loadUsersByClass(usersContentElement, getFollowees(usersJsonArray, activeUser.following), activeUser, userClass);
}

function loadUsersContent(usersContentElement, foloweesElement, activeUser, users){
    loadUsers(usersContentElement, users,activeUser,"col-md-2");
    loadFollowees(foloweesElement, users,activeUser, "");
}
