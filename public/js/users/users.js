/**
 * Created by Jbt on 11/30/2016.
 */

// function toggleFollowStatusButton(foloweesElement, userName, userAvatarImgSrc){
//     var userWithNoSpaces = userName.replace(/\s/gi, "");
//
//     for(user in users){
//         if(users[user].username === userName){
//             users[user].followStatus = !users[user].followStatus;
//             document.getElementById(userWithNoSpaces + "Button").textContent = followStatusToString(users[user].followStatus);
//             if(users[user].folloaddUserToFolloweeswStatus){
//                 (userName,userAvatarImgSrc,users[user].followStatus);
//             } else {
//                 userWithNoSpaces += "Followees";
//                 foloweesElement.removeChild(document.getElementById(userWithNoSpaces));
//             }
//         }
//     }
// }
//
// function addUserToFollowees(userName, userAvatarImgSrc, followStatus){
//     var followeesUserElement = createUserElement(userAvatarImgSrc, userName, followStatus, "");
//     document.getElementById("followees-content").appendChild(followeesUserElement );
// }
//
function getUsersFromServer(){
    return axios.get('http://localhost:8081/users');
}

function getUserByIdFromServer(userId){
    return axios.get('http://localhost:8081/users/' + userId);
}

//
//
// function getFolloweesJsonArray(){
//     return [{username: 'Bobo'}];
// }
//
// function addNewFollowees(userJson, followeesJsonArray) {
//     followeesJsonArray.push(userJson.username);
// }

// function ButtonToggle(buttonElement){
//     buttonElement.addEventListener('click',)
//     return !buttonElement;
// }

// function makeFollowButtonsFunctional(followButtonsElement){
//     for(followButton = 0; followButton < followButtonsElement.length; followButton++){
//         var x = document.getElementById(followButtonsElement[followButton].id).addEventListener('click', toggleFollowButton());
//     }
// }

var foloweesElement = document.getElementById("followees-content");

function toggleUserFollowees(userId){
    return axios.post('http://localhost:8081/users/ToggleUserFollowees', {checkUserId:userId});
}

var users = [];
var activeUser;

function renoveUserFromFollowees(foloweesElement, userJson){
    foloweesElement.removeChild();

}

function toggleFollowStatusButton(userId){
    getUserByIdFromServer(userId).then(function(userJson){
        toggleUserFollowees(userId).then(function (followStatus) {
            if(followStatus.data) {
                loadUserToFollowees(foloweesElement,activeUser, userJson.data[0], "");
            } else {
                renoveUserFromFollowees(userJson)
            }
        });
    });
}

function getActiveUser(){
    return axios.get('/activeUser');
}

window.onload = function(){
    var usersContentElement = document.getElementById("all-users");
    var foloweesElement = document.getElementById("followees-content");
    usersContentElement.innerHTML = "";
    foloweesElement.innerHTML = "";

    getUsersFromServer().then(function (response) {
        getActiveUser().then(function(activeUserData){
            activeUser = activeUserData.data;
            loadUsersContent(usersContentElement, foloweesElement, activeUser, response.data);
            filterUsers(usersContentElement, response.data, activeUser);
            users = response.data;
        });
    });
};