import { existsSync } from "fs";

function doesTheFolderExist(path) {
  return existsSync(path);
}

export default doesTheFolderExist;
