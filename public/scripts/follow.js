const baseUrl = "http://localhost:3000";
const followBtn = document.querySelector("#follow-btn");

const follow = async (e) => {
  const followBtnTextContent = followBtn.textContent;
  followBtn.textContent =
    followBtnTextContent == "follow" ? "unfollow" : "follow";

  e.preventDefault();

  // Sadece post id'yi al
  const match = window.location.pathname.match(/\/profile\/(\d+)$/);
  const followedId = match ? match[1] : null;

  const res = await fetch(baseUrl + "/follow", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      followedId: Number(followedId),
    }),
  });
};

if (followBtn) {
  followBtn.addEventListener("click", follow);
}
