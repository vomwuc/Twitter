/**
 * Created by Jbt on 12/7/2016.
 */

function getFilterUsers(userName, usersJsonList){
    var userNameRegex = new RegExp("^" + userName);
    return usersJsonList.filter(function(userJsona){return userNameRegex.test(getUserName(userJsona))});
}

function filterUsers(usersContentElement, users){
    var filterTextBox = document.getElementById("filter-users-by-user-name");
    var filterButton = document.getElementById("filter-users-button");

    filterTextBox.addEventListener('keyup', function(){
        usersContentElement.innerHTML = "";
        loadUsers(usersContentElement,getFilterUsers(filterTextBox.value,users),"col-md-2");
    });
    filterButton.addEventListener('click', function(){
        usersContentElement.innerHTML = "";
        loadUsers(usersContentElement,getFilterUsers(filterTextBox.value,users),"col-md-2");
    });
}
