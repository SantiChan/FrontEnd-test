
document.getElementById("btn-search").addEventListener("click", getData);


function getData() {
    
    document.getElementById("info").style.display = "none";
    let userName = document.getElementById("inputName").value;
    
    const usersInfo = `https://api.github.com/users/${userName}`;

        fetch(usersInfo)
        .then(response => response.json())
        .then(data => {
            document.getElementById("inputName").value = ""
       
            if(data.message){ /*message retorna un mensaje de error*/
                document.getElementById("error").style.display = "flex";
            }
            else{
                document.getElementById("error").style.display = "none";
                showUserData(data);
                getUserRepos(userName);
        };
    })
    .catch(error => console.error(error));
}

function getUserRepos(userName){

    const usersRepo = `https://api.github.com/users/${userName}/repos`;

        fetch(usersRepo)
        .then(response => response.json())
        .then(data => {
            if(data.length == 0){
                document.getElementById("emptyRepos").style.display = "flex";
                document.getElementById("repoTable").style.display = "none";
            }
            else{
                document.getElementById("emptyRepos").style.display = "none";
                document.getElementById("repoTable").style.display = "block";
                showUserRepos(data);
        };
    })
    .catch(error => console.error(error));
}

function showUserData(data){

    document.getElementById("info").style.display = "block";
    document.getElementById("profilePic").src = data.avatar_url;
    document.getElementById("username").innerHTML = "@" + data.login;
    document.getElementById("fullname").innerHTML = data.name;
    document.getElementById("userBio").innerHTML = data.bio;

}

function showUserRepos(data){

    const repoTable = document.getElementById("repoTable");

    repoTable.innerHTML = "";

    let template = "";

    data.map(repoName => {
         template += `
            <div class="repo">
                <h3 class="repo-title">${repoName.name}</h3>
                <div class="icons">
                <img src="img/code-fork-icon.png" class="fork">${repoName.forks_count}
                <img src="img/star2.png" class="star">${repoName.stargazers_count}
                </div>
            </div>`;
    });

    repoTable.innerHTML = template;
}

