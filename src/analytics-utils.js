import { db } from "./models/db.js";


// function to calculate the average number of placemarks per user
export async function calculateAveragePlacemarksPerUser(users) {
    // if there are no users return 0
    if (!users || users.length === 0) {
        return 0;
    }
    // using map and a callback function to retrieve placemarks for each user asynchronously
    const placemarksPromises = users.map(user => db.placemarkStore.getPlacemarksByUserId(user._id));
    // promises.all is used to wait for all the promises to resolve before assigning the results to placemarksArrays (effectively an array of arrays)
    const placemarksArrays = await Promise.all(placemarksPromises);
    // reduce is used to iterate through the placemarksArrays with a callback function that updates the total count on each iteration
    const totalPlacemarks = placemarksArrays.reduce((total, placemarks) => total + placemarks.length, 0);
    // total users is derived from the length of the users array
    const totalUsers = users.length;
    // we then devide the total placemarks by the total users to get the average before returning it
    return Math.round(totalPlacemarks / totalUsers);
}


// function to calculate the total number of placemarks
export async function calculateTotalPlacemarks(placemarks) {
    // check for placemarks before attempting to return length
    if (!placemarks || placemarks.length === 0) {
        return 0;
    }
    return placemarks.length;
}


// function to calculate the most popular category based on the number of placemarks in each category
export async function calculateMostPopularCategory(placemarks) {
    // check for placemarks before attempting to return length
    if (!placemarks || placemarks.length === 0) {
        return 0;
    }
    // reduce is used to iterate through the placemarks with a callback function that updates the counts object
    const categoryCounts = placemarks.reduce((counts, placemark) => {
        // category is initialised to the category property of the placemark
        // eslint-disable-next-line prefer-destructuring
        const category = placemark.category;
        // incrementing the count for the category including initialising it to 1 if it doesn't exist
        counts[category] = (counts[category] || []) + 1;
        // returning the updated counts object
        return counts;
    }, {});
    let mostPopularCategory = null;
    let maxCount = 0;
    // iterating through the categories of the counts object to check against the maxCount
    Object.keys(categoryCounts).forEach(category => {
        if (categoryCounts[category] > maxCount) {
            // declaring the mostPopularCategory and updating the maxCount on each iteration
            mostPopularCategory = category;
            maxCount = categoryCounts[category];
        }
    });
    // returning the mostPopularCategory
    return mostPopularCategory;
}


// function to calculate the number of placemarks in each category
export async function calculatePlacemarksPerCategory(placemarks) {
    // check for placemarks before attempting to return length
    if (!placemarks || placemarks.length === 0) {
        return [];
    }
    // as above, reduce is used to iterate through the placemarks with a callback function that updates the counts object
    const categoryCounts = placemarks.reduce((counts, placemark) => {
        // eslint-disable-next-line prefer-destructuring
        const category = placemark.category;
        counts[category] = (counts[category] || 0) + 1;
        return counts;
    }, {});

    // map is used to convert the counts object into an array of objects with category and count properties
    const placemarksPerCategory = Object.keys(categoryCounts).map(category => ({
        // category is assgned the current category name being processed
        category: category,
        // count is assigned the value of the categoryCounts object for the current category
        count: categoryCounts[category]
    }));

    // returning the placemarksPerCategory array
    return placemarksPerCategory;
}

// function to calculate the most active user based on the number of placemarks they've created
export async function calculateMostActiveUser(users) {
    // if there are no users return 0
    if (!users || users.length === 0) {
        return 0;
    }
    // promise.all used again to retrieve placemarks for each user asynchronously after mapping the users array
    const placemarksPromises = users.map(user => db.placemarkStore.getPlacemarksByUserId(user._id));
    const placemarksArrays = await Promise.all(placemarksPromises);

    // converting the placemarksArrays into an array of objects with userId and placemarksCount properties
    const placemarksCounts = placemarksArrays.map((placemarks, index) => ({
        userId: users[index]._id,
        placemarksCount: placemarks.length
    }));

    // using reduce again to iterate through the placemarksCounts array with a callback function that updates the mostActive object
    const mostActiveUser = placemarksCounts.reduce((mostActive, current) => {
        // if the current user has more placemarks, it becomes the new mostActive
        if (current.placemarksCount > mostActive.placemarksCount) {
            return current; 
        } 
        // else, keep the current mostActive user
        return mostActive; 
    }, placemarksCounts[0]);

    // retrieving the user object for the mostActiveUser based on the userId property
    const foundUser = users.find(user => user._id === mostActiveUser.userId);
    // declaring the userName and returning it (foundUser is an object, hence the need to return a string with the first and last names concatenated)
    const userName = `${foundUser.firstName} ${foundUser.lastName}`;
    return userName;
}
