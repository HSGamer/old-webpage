async function fetchRepos(user, includeOrgRepos = true, params = {
    per_page: "100"
}) {
    let repos = [];
    let urls = [new URL("https://api.github.com/users/" + user + "/repos")];
    if (includeOrgRepos) {
        let orgUrl = "https://api.github.com/users/" + user + "/orgs";
        await fetch(orgUrl).then(data => data.json()).then(data => {
            data.forEach(org => urls.push(new URL(org.repos_url)));
        });
    }
    urls.forEach(url => url.search = new URLSearchParams(params).toString());
    let promises = [];
    urls.forEach(url => promises.push(fetch(url).then(data => data.json())));
    await Promise.all(promises).then(data => data.forEach(repo => repos.push(...repo)));
    return repos;
}