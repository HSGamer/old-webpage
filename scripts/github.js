let url = new URL("https://api.github.com/users/hsgamer/repos");
let params = {
    sort: "created",
    per_page: "100"
};
url.search = new URLSearchParams(params).toString();

fetch(url)
.then(data => data.json())
.then(data => {
    let projects = document.getElementById("projects");
    data.forEach(repo => {
        if (!repo.fork) {
            let anchor = document.createElement("a");
            anchor.href = repo.html_url;

            let project = document.createElement("div");
            project.classList.add("project");

            let projectName = document.createElement("h2");
            projectName.innerHTML = repo.full_name;
            projectName.classList.add("project-name");
            project.appendChild(projectName);

            let projectDescrption = document.createElement("p");
            projectDescrption.innerHTML = repo.description || "No Description";
            projectDescrption.classList.add("project-description");
            project.appendChild(projectDescrption);

            anchor.appendChild(project);
            projects.appendChild(anchor);
            console.log(repo);
        }
    });
});