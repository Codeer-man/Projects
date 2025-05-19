import multer, { diskStorage, memoryStorage } from "multer";

const storage = memoryStorage();

const uploadFile = multer({ storage }).single("file");

export default uploadFile;
