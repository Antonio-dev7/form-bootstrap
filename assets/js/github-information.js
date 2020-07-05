function userInformationHTML(user) {        //new function above.calling when promise is resolved.return`` template literal using the back quote notation.
    return `                                    
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content"> 
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank"> 
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login/*so it appears in a nice square.*/}" /> 
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");                                            //new
    $("#gh-repo-data").html("");                                        //new

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),              // new
        $.getJSON(`https://api.github.com/users/${username}/repos`)         // new
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];                                // new
            var repoData = secondResponse[0];                               // new
            $("#gh-user-data").html(userInformationHTML(userData));         // new
            $("#gh-repo-data").html(repoInformationHTML(repoData));         // new
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

$(document).ready(fetchGitHubInformation);









/*
function fetchGitHubInformation(event) {

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

$.when(
    $.getJSON(`https://api.github.com/users/${username}`)
).then(
    function(response) {
        var userData = response;
        $("#gh-user-data").html(userInformationHTML(userData));

    }, function(errorResponse) {
        if (errorResponse.status === 404) {                                                     //error if statement. just incase.
            $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);    
        } else {
            console.log(errorResponse);
            $("gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);   //} }bottom
        }
    });
}
*/