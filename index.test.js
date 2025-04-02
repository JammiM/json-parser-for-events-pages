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
  doesEventHaveAllProps,
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
  const jsonString =
    '{"id": "294055134", "title": "Cork|Sec 121","eventUrl": "https://www.meetup.com/corksec/events/294055134/", "description": "1-2 talks  [http://corksec.com/.](http://corksec.com/) are.\n\nEmail us at DefconCork@gmail.com.\n\nDoors open at 19:00.\n\n**~~TALK 1: Gerard Barrett~~**\n~~Gerard.~~\n\n**~~TALK 2: Business ~~**\n~~A real life case study .~~","venue": {    "id": "27405729",    "name": "Aye",    "address": "9 Anglesea Street","city": "Cork",    "state": "CO",    "country": "ie",    "__typename": "Venue"},"dateTime": "2023-07-11T19:00:00+01:00","createdTime": "2023-06-08T01:32:29-04:00","endTime": "2023-07-11T21:00:00+01:00","__typename": "Event"}';

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

  test("Check if the event has the requied properties", () => {
    // id, title, eventUrl, description, dateTime and endTime and
    // venue v name, address and city
    // dateTime and endTime
    expect(doesEventHaveAllProps(jsonString)).toBe(true);
  });
});
