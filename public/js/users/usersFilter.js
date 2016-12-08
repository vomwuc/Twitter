/**
 * Created by Jbt on 12/7/2016.
 */

function getUserName(userJson){
    return userJson['username'];
}

function getFilterUsers(userName, usersJsonList){
    var userNameRegex = new RegExp("^" + userName);
    return usersJsonList.filter(function(userJson){return userNameRegex.test(getUserName(userJson))});
}

function filterUsers(usersContentElement, users, activeUser){
    var filterTextBox = document.getElementById("filter-users-by-user-name");
    var filterButton = document.getElementById("filter-users-button");

    filterTextBox.addEventListener('keyup', function(){
        usersContentElement.innerHTML = "";
        loadUsers(usersContentElement,getFilterUsers(filterTextBox.value,users), activeUser,"col-md-2");
    });
    filterButton.addEventListener('click', function(){
        usersContentElement.innerHTML = "";
        loadUsers(usersContentElement,getFilterUsers(filterTextBox.value,users), activeUser,"col-md-2");
    });
}
