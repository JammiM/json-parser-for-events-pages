"use strict";

import {
  existsSync,
  mkdirSync,
  rmdirSync,
  writeFileSync,
  unlinkSync,
} from "fs";
import { join } from "path";
import {
  doesThePathExist,
  isValidJsonFile,
  containsJsonFile,
  doesItHaveOneEvent,
} from "./index";

describe("Check if the folder exists contains a valid JSON file", () => {
  const folderPath = "./test-json-files";
  const jsonFile = join(folderPath, "test.json");

  beforeAll(() => {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }

    if (!existsSync(jsonFile)) {
      writeFileSync(jsonFile, '{"glossary":"title"}');
    }
  });

  afterAll(() => {
    unlinkSync(jsonFile);
    rmdirSync(folderPath);
  });

  test("Folder should exist", () => {
    expect(doesThePathExist(folderPath)).toBe(true);
  });

  test("JSON file should exist", () => {
    expect(doesThePathExist(jsonFile)).toBe(true);
  });

  test("should contain atleast one JSON file", () => {
    expect(containsJsonFile(folderPath)).toBe(true);
  });

  test("JSON file should contain valid json", () => {
    expect(isValidJsonFile(jsonFile)).toBe(true);
  });
});

describe("Check if the JSON file has the required properties", () => {
  const folderPath = "./test-json-files";
  const jsonFile = join(folderPath, "singleEventTest.json");

  beforeAll(() => {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }

    if (!existsSync(jsonFile)) {
      writeFileSync(
        jsonFile,
        '{"data": {"groupByUrlname": {"id": "1","events": {"totalCount": 7,"edges": [{"node": { "id": "99999999","title": "Cork|Sec 000"}}],"__typename": "G"},"__typename": "G"}}}'
      );
    }
  });

  afterAll(() => {
    unlinkSync(jsonFile);
    rmdirSync(folderPath);
  });

  test("Check if the JSON file has atleast one event", () => {
    expect(doesItHaveOneEvent(jsonFile)).toBe(true);
  });
});

describe("Check if the event(node) has a id, title, eventUrl, and description", () => {});

describe("Check if the event's has a name, address and city", () => {});

describe("Check if the event(node) has a dateTime and endTime", () => {});
