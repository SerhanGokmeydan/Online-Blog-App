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
          .map((post) => {
            return `<a href="/post/${post.id}">${post.title}</a></br>`;
          })
          .join("")}
      `;
      searchedUsers.innerHTML = `
        <h3>Users</h3>
        ${users
          .map((user) => {
            return `<a href="/profile/${user.id}">${user.username}</a></br>`;
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
