import { existsSync, readFileSync, readdirSync } from "fs";

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

function doesEventHaveAllProps(evObjectStr) {
  if (!evObjectStr) return;

  // Replaces the '\n\n' within the 'description' as it's caused problems when parsing to JSON
  const cleanedevObjectStr = evObjectStr
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");

  const eventObject = JSON.parse(cleanedevObjectStr);

  const requiredProps = [
    "id",
    "title",
    "description",
    "eventUrl",
    "dateTime",
    "endTime",
    "venue",
  ];

  const hasAllElements = requiredProps.every((elem) =>
    Object.keys(eventObject).includes(elem)
  );

  return hasAllElements;
}

export {
  doesThePathExist,
  containsJsonFile,
  isValidJsonFile,
  doesItHaveOneEvent,
  doesEventHaveAllProps,
};
