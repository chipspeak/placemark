import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCreds, testPlacemarks, testPlacemark } from "../fixtures.js";

suite("Placemark API tests", () => {
let user = null;
let userId = null;
setup(async () => {
  placemarkService.clearAuth();
  user = await placemarkService.createUser(maggie);
  await placemarkService.authenticate(maggieCreds);
  await placemarkService.deleteAllPlacemarks();
  await placemarkService.deleteAllUsers();
  user = await placemarkService.createUser(maggie);
  await placemarkService.authenticate(maggieCreds);
  userId = maggie._id;
});
  teardown(async () => {
  });

  test("create placemark", async () => {
    const placemark = await placemarkService.createPlacemark(testPlacemark);
    assertSubset(testPlacemark, placemark);
  });
  

  test("create multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await placemarkService.createPlacemark(testPlacemarks[i]);
    }
    const returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const placemark = await placemarkService.createPlacemark(testPlacemark);
    const returnedPlacemark = await placemarkService.getPlacemark(placemark._id);
    assert.equal(testPlacemark.description, returnedPlacemark.description);
  });

  test("Delete a placemark - success", async () => {
    const placemark = await placemarkService.createPlacemark(testPlacemark);
    await placemarkService.deletePlacemark(placemark._id);
    try {
      await placemarkService.getPlacemark(placemark._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("create a placemark - invalid placemark", async () => {
    try {
      const newPlacemark = await placemarkService.createPlacemark("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 400);
    }
  });

  test("get a placemark - bad id", async () => {
    try {
      const returnedPlacemark = await placemarkService.getPlacemark("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a placemark - deleted placemark", async () => {
    const placemark = await placemarkService.createPlacemark(testPlacemark);
    await placemarkService.deletePlacemark(placemark._id);
    try {
      const returnedPlacemark = await placemarkService.getPlacemark(placemark._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
