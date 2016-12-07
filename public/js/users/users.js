/**
 * Created by Jbt on 11/30/2016.
 */
var users = [{username: 'Bobo',followStatus:true, avatarImgSrc:"../../images/useravatar.png"},
    {username: 'Elvis', followStatus:false, avatarImgSrc:"../../images/useravatar.png"},
    {username: 'Mimi', followStatus:false, avatarImgSrc:"../../images/useravatar.png"}];



function toggleFollowStatusButton(userName, userAvatarImgSrc){
    var userWithNoSpaces = userName.replace(/\s/gi, "");

    for(user in users){
        if(users[user].username === userName){
            users[user].followStatus = !users[user].followStatus;
            document.getElementById(userWithNoSpaces + "Button").textContent = followStatusToString(users[user].followStatus);
            if(users[user].followStatus){
                addUserToFollowees(userName,userAvatarImgSrc,users[user].followStatus);
            } else {
                userWithNoSpaces += "Followees";
                document.getElementById("followees-content").removeChild(document.getElementById(userWithNoSpaces));
            }
        }
    }
}

function addUserToFollowees(userName, userAvatarImgSrc, followStatus){
    var followeesUserElement = createUserElement(userAvatarImgSrc, userName, followStatus, "");
    document.getElementById("followees-content").appendChild(followeesUserElement );
}

function getTweetsFromServer(){
    return axios.get('http://10.103.51.112:8081/users');
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



// function ButtonToggle(buttonElement){
//     buttonElement.addEventListener('click',)
//     return !buttonElement;
// }

window.onload = function(){
    var usersContentElement = document.getElementById("all-users");
    var foloweesElement = document.getElementById("followees-content");
    usersContentElement.innerHTML = "";
    var followButtons = document.getElementsByName("follow-status-btn");

    // for(followButton = 0; followButton < followButtons.length; followButton++){
    //     var x = document.getElementById(followButtons[followButton]._id);
    // }

    foloweesElement.innerHTML = "";
    getTweetsFromServer().then(function (response) {
        loadUsersContent(usersContentElement, foloweesElement, response.data);
        filterUsers(usersContentElement, response.data);
    });
};