import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPlacemarks, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {
  let beethovenCategory = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks();
    beethovenCategory = await db.categoryStore.addCategory(beethoven);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(beethovenCategory._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const mozartCategory = await db.categoryStore.addCategory(mozart);
    const placemark = await db.placemarkStore.addPlacemark(mozartCategory._id, concerto);
    assert.isNotNull(placemark._id);
    assertSubset(concerto, placemark);
  });

  test("create multiple placemarks", async () => {
    const placemarks = await db.categoryStore.getCategoryById(beethovenCategory._id);
    assert.equal(testPlacemarks.length, placemarks.length);
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const mozartCategory = await db.categoryStore.addCategory(mozart);
    const placemark = await db.placemarkStore.addPlacemark(mozartCategory._id, concerto);
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(concerto, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategories.length);
  });
});