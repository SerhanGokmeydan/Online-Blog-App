const profilePic = document.querySelector("#profile-pic");
const fileInput = document.querySelector("#file-inp");
const uploadForm = document.querySelector("#upload-form")

profilePic.addEventListener("click", () => {
  fileInput.click()
})

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0]
  if(file){
    uploadForm.submit();
  }
})