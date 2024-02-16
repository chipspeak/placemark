import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, testPlacemarks, testPlacemark } from "../fixtures.js";

suite("Placemark API tests", () => {
  setup(async () => {
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllPlacemarks();
  });
  teardown(async () => {
  });

  test("create placemark", async () => {
    const user = await placemarkService.createUser(maggie);
    const newPlacemark = await placemarkService.createPlacemark(user._id, testPlacemark);
    assertSubset(testPlacemark, newPlacemark);
    assert.isDefined(newPlacemark._id);
  });

  test("create multiple placemarks", async () => {
    const user = await placemarkService.createUser(maggie);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await placemarkService.createPlacemark(user._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const user = await placemarkService.createUser(maggie);
    const placemark = await placemarkService.createPlacemark(user._id, testPlacemark);
    const returnedPlacemark = await placemarkService.getPlacemark(placemark._id);
    assert.equal(testPlacemark.description, returnedPlacemark.description);
  });

  test("Delete a placemark - success", async () => {
    const user = await placemarkService.createUser(maggie);
    const placemark = await placemarkService.createPlacemark(user._id, testPlacemark);
    await placemarkService.deletePlacemark(placemark._id);
    try {
      await placemarkService.getPlacemark(placemark._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("create a placemark - bad id", async () => {
    try {
      const newPlacemark = await placemarkService.createPlacemark("1234", testPlacemark);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "Database Error - check that a valid user id was provided");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a placemark - bad id", async () => {
    try {
      const returnedPlacemark = await placemarkService.getPlacemark("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a placemark - deleted placemark", async () => {
    const user = await placemarkService.createUser(maggie);
    const placemark = await placemarkService.createPlacemark(user._id, testPlacemark);
    await placemarkService.deletePlacemark(placemark._id);
    try {
      const returnedPlacemark = await placemarkService.getPlacemark(placemark._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
