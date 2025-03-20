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
