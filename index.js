import { existsSync, readFileSync, readdirSync } from "node:fs";

function doesThePathExist(path) {
  return existsSync(path);
}

function containsJsonFile(folderPath) {
  if (!existsSync(folderPath)) return false;

  const files = readdirSync(folderPath);
  return files.some((file) => file.endsWith(".json"));
}

function isValidJsonFile(filePath) {
  if (!existsSync(filePath)) return false;

  try {
    const content = readFileSync(filePath, "utf-8");
    JSON.parse(content);
    return true;
  } catch (error) {
    return false;
  }
}

export { doesThePathExist, containsJsonFile, isValidJsonFile };
