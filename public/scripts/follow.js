const followBtn = document.querySelector("#follow-btn");
const baseUrl = "http://localhost:3000";

const follow = async (e) => {
  e.preventDefault();

  // Sadece post id'yi al
  const match = window.location.pathname.match(/\/profile\/(\d+)$/);
  const profileId = match ? match[1] : null;

  const res = await fetch(baseUrl + "/follow", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      profileId: Number(profileId),
    }),
  });
  
  const data = await res.json()
  console.log(data)
};

// Doğru event listener
followBtn.addEventListener("click", follow);