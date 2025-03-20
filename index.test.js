"use strict";

import { existsSync, mkdirSync } from "fs";
import doesTheFolderExist from "./index";

describe("Check if the folder exists", () => {
  const folderPath = "./json-files";

  beforeAll(() => {
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }
  });

  test("Folder should exist", () => {
    expect(doesTheFolderExist(folderPath)).toBe(true);
  });
});

describe("Check if the folder contains a valid JSON file", () => {});

describe("Check if the JSON file has atleast one event", () => {});

describe("Check if the event(node) has a id, title, eventUrl, and description", () => {});

describe("Check if the event's has a name, address and city", () => {});

describe("Check if the event(node) has a dateTime and endTime", () => {});
