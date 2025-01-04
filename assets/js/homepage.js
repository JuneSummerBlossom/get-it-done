var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");
var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsE1 = document.querySelector("#language-buttons");

var getUserRepos = function(user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function(error) {
      // Notice this '.catch()' getting chained onto the end of the '.then()' method
      alert("Unable to connect to GitHub");
    });
};

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerE1.textContent = "No repositories found.";
    return;
  }
  // clear old content
  repoContainerE1.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  
  // loop over repos{
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoE1 = document.createElement("a");
    repoE1.classList = "list-item flex-row justify-space-between align-center";
    repoE1.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repository name
    var titleE1 = document.createElement("span");
    titleE1.textContent = repoName;

    // append to container
    repoE1.appendChild(titleE1);

    // create a status element
    var statusE1 = document.createElement("span");
    statusE1.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusE1.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusE1.innerHTML = "<i class='fas fa-check-square status-icon icon-sucess'></i>";
    }

    // append to container
    repoE1.appendChild(statusE1);

    // append container to the dom
    repoContainerE1.appendChild(repoE1);
  }
};

var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputE1.value.trim();

  if (username) {
    getUserRepos(username);
  } else {
    alert("Please enter a GitHub username");
  }
  console.log(event);
};

getFeaturedRepos = function(language) {
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  });
};

var buttonClickHandler = function(event) {
  var language = event.target.getAttribute("data-language");
  if (language) {
    getFeaturedRepos(language);

  // clear old content
  repoContainerE1.textConent = "";
  }
}

userFormE1.addEventListener("submit", formSubmitHandler);
languageButtonsE1.addEventListener("click", buttonClickHandler);
