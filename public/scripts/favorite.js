const baseUrl = "http://localhost:3000";
const favoriteBtn = document.querySelector("#favorite-btn");
const star = document.querySelector("#star");

const favorite = async (e) => {
  e.preventDefault();

  // Sadece post id'yi al
  const match = window.location.pathname.match(/\/post\/(\d+)$/);
  const postId = match ? match[1] : null;

  if (star.classList.contains("fa-solid")) {
    star.classList.remove("fa-solid");
    star.classList.add("fa-regular");
  } else {
    star.classList.add("fa-solid");
    star.classList.remove("fa-regular");
  }

  const res = await fetch(baseUrl + "/favorite/", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      postId: Number(postId),
    }),
  });
};

if (favoriteBtn) {
  favoriteBtn.addEventListener("click", favorite);
}
