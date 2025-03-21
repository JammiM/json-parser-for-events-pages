import { existsSync, readFileSync, readdirSync, readFile } from "fs";

function doesThePathExist(path) {
  return existsSync(path);
}

function containsJsonFile(folderPath) {
  if (!existsSync(folderPath)) return false;

  const files = readdirSync(folderPath);
  return files.some((file) => file.endsWith(".json"));
}

function isValidJsonFile(filePath) {
  if (!existsSync(filePath)) return;

  try {
    const content = readFileSync(filePath, "utf-8");
    JSON.parse(content);
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

function doesItHaveOneEvent(jsonFile) {
  if (!existsSync(jsonFile)) return;
  if (!isValidJsonFile(jsonFile)) return;

  const data = readFileSync(jsonFile);

  const content = JSON.parse(data);

  if (content["data"]["groupByUrlname"]["events"]["edges"].length >= 1) {
    return true;
  } else {
    return false;
  }
}

export {
  doesThePathExist,
  containsJsonFile,
  isValidJsonFile,
  doesItHaveOneEvent,
};
