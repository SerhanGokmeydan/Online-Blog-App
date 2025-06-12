const searchbox = document.querySelector("#searchbox");
const searchedPosts = document.querySelector("#searched-posts");
const searchedUsers = document.querySelector("#searched-users");
const displayPosts = document.querySelector("#display-posts");
const displayUsers = document.querySelector("#display-users");
const baseUrl = "http://localhost:3000";

let timer;
searchbox.addEventListener("input", search);

//this passes the data that is came from searchbox to backend in order to search in database
async function search(e) {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    e.preventDefault();
    
    // Post arama
    const postRes = await fetch(baseUrl + `/search-post`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: searchbox.value,
      }),
    });
    const postData = await postRes.json();
    const posts = postData.posts;
    const postsUser = postData.users;

    // User arama
    const userRes = await fetch(baseUrl + `/search-user`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: searchbox.value,
      }),
    });
    const userData = await userRes.json();
    const users = userData.users;
    
    if (searchbox.value !== "") {
      searchedPosts.innerHTML = `
        <h3>Posts</h3>
        ${posts
          .map((post, index) => {
            return `<div class="post border shadow-10 parent-active">
                      <a href="/post/${post.id}">
                        <div class="profile-info">
                          <img
                            src="${postsUser[index].profile_pic_path}"
                            alt="profile picture"
                            id="profile-pic"
                          />
                          <p>${postsUser[index].username}</p>
                        </div>

                        <h2>${post.title}</h2>
                        <p class="content">${post.content}</p>
                      </a>
                    </div>`;
          })
          .join("")}
      `;
      searchedUsers.innerHTML = `
        <h3>Users</h3>
        ${users
          .map((user) => {
            return `<div class="post border shadow-10 parent-active">
                      <a href="/profile/${user.id}">
                        <div class="profile-info">
                          <img
                            src="${user.profile_pic_path || "assets/user.png"}"
                            alt="profile picture"
                            id="profile-pic"
                          />
                          <p>${user.username}</p>
                        </div>
                      </a>
                    </div>`;
          })
          .join("")}
      `;
    } else {
      searchedPosts.innerHTML = "";
      searchedUsers.innerHTML = "";
    }
  }, 300);
}

function toggleSections(showSection, hideSection) {
  showSection.classList.add("show");
  showSection.classList.remove("hide");
  hideSection.classList.add("hide");
  hideSection.classList.remove("show");
}

displayPosts.addEventListener("click", () => {
  toggleSections(searchedPosts, searchedUsers);
});

displayUsers.addEventListener("click", () => {
  toggleSections(searchedUsers, searchedPosts);
});
