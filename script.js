const APIURL="https://api.github.com/users/"
const form=document.getElementById("form");
const main=document.getElementById("main");
fetchUsers("SaiKUMAR6632");
async function fetchUsers(username){
    const resp=await fetch(APIURL+username);
    const respData=await resp.json();
    createUserCard(respData); 
    console.log(respData);
    getRepos(username);
}
async function getRepos(username){
    const resp=await fetch(APIURL+username+'/repos');
    const respData=await resp.json();
    addReposToCard(respData);
}
function createUserCard(user){
    const card=document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
                <div class="img-container">
                        <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/></div>
                <div class="class-info">
                    <h2>${user.name}</h2>
                    <p>${user.bio}</p>

                    <ul class="info">
                        <li>${user.followers}<strong>Followers</strong></li>
                        <li>${user.following}<strong>Following</strong></li>
                        <li>${user.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <h4>Repos:</h4>
                    <div id="repos"></div>

                </div>
    
    
    `;
    main.appendChild(card);
}
function addReposToCard(repos) {
    const reposE1=document.getElementById("repos");
    repos.sort((a,b)=>b.stargazers_count-a.stargazers_count).slice(0,10).forEach((repo)=>{
        const repoE1=document.createElement("a");
        repoE1.classList.add('repo');
        repoE1.href=repo.html_url;
        repoE1.target="_blank";
        repoE1.innerText=repo.name;
        reposE1.appendChild(repoE1);
    });
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const user=search.value;
    if(user){
        fetchUsers(user);
        search.value="";
    }
});
