const favoriteBtn = document.querySelector("#favorite-btn");
const baseUrl = "http://localhost:3000";

const addFavorite = async (e) => {
  e.preventDefault();

  // Sadece post id'yi al
  const match = window.location.pathname.match(/\/post\/(\d+)$/);
  const postId = match ? match[1] : null;

  const res = await fetch(baseUrl + "/favorite", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      postId: Number(postId),
    }),
  });
  
  const data = await res.json()
  console.log(data)
};

// Doğru event listener
favoriteBtn.addEventListener("click", addFavorite);
