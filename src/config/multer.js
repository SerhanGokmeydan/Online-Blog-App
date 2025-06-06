import multer from "multer"
import path from "path"

const stroge = multer.diskStorage({
  destination: (req, file, done) => {
    done(null, "public/uploads/")
  },
  filename: (req, file, done) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    done(null, uniqueName + ext)
  }
})

const upload = multer({storage: stroge})
export default upload;