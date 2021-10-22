async function fetchRepos(url, params = {
    sort: "created",
    per_page: "100"
}) {
    let urlObj = url instanceof URL ? url : new URL(url);
    urlObj.search = new URLSearchParams(params).toString();
    let repos = [];
    await fetch(urlObj).then(data => data.json()).then(data => {
        data.forEach(repo => {
            if (!repo.fork && !repo.archived) {
                repos.push(repo);
            } 
        });
    })
    return repos;
}