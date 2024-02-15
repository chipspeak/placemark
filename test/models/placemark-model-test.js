import { assert } from "chai";
import { db } from "../../src/models/db.js";
import {  testPlacemarks, testPlacemark, maggie } from "../fixtures.js";

suite("Placemark Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.userStore.deleteAll();
    await db.userStore.addUser(maggie);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(maggie._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const placemark = await db.placemarkStore.addPlacemark(maggie._id, testPlacemark);
    assert.isNotNull(placemark._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length + 1);
  });

  test("create multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const placemarkToAdd = testPlacemark;
    const addedPlacemark = await db.placemarkStore.addPlacemark(maggie._id, placemarkToAdd);
    const retrievedPlacemark = await db.placemarkStore.getPlacemarkById(addedPlacemark._id);
    assert.equal(retrievedPlacemark.title, placemarkToAdd.title);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemark._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemark._id);
    assert.isNull(deletedPlacemark);
  });

  test("delete all placemarks", async () => {
    const user = await db.userStore.addUser(maggie);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(user._id, testPlacemarks[i]);
    }
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
  });
});