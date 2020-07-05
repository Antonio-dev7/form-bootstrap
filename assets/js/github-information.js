function fetchGitHubInformation(event){
    var username = $("#gh-username").val();  
if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
    return;
}
// using jquery to for gif loader and also returning msg. //id= highphen function
$("#gh-user-data").html(
    `<div id="loader">
        <img src="assets/css/loader.gif" alt="loading..." />
    </div>`); 

}

// the $.when method takes a function.
$.when(
    $getJSON(`https://api.github.com/users/${username}`)
).then(
    function(response) {
        var userData = responses;
        $("#gh-user-data").html(userInformationHTML(userdata));

    }, function(errorResponse) {
        if (errorResponse.status === 404) { //error if statement. just incase.
            $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);    
        } else {
            console.log(errorResponse);
            $("gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);   //} }bottom
        }

    });

