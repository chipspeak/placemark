/* eslint-disable prefer-destructuring */
import { db } from "../models/db.js";
import { calculateAveragePlacemarksPerUser, calculateTotalPlacemarks, calculateMostPopularCategory, calculatePlacemarksPerCategory, calculateMostActiveUser } from "../analytics-utils.js";

export const adminDashboardController = {
    index: {
        handler: async function (request, h) {
            const users = await db.userStore.getAllUsers();

            // using promise to get placemark count for each user
            // setting the placemarkCount property on each user object to match their placemarks.length for use in the view
            const updatedUsers = await Promise.all(users.map(async (user) => {
                const placemarks = await db.placemarkStore.getPlacemarksByUserId(user._id);
                user.placemarkCount = placemarks.length;
                return user;
            }));

            const viewData = {
                title: "Admin Dashboard",
                users: updatedUsers,
            };
            return h.view("admin-dashboard-view", viewData);
        },
    },

    
    showAnalytics: {
        handler: async function (request, h) {
            const users = await db.userStore.getAllUsers();
            const placemarks = await db.placemarkStore.getAllPlacemarks();
            // Calculate average placemarks per user
            const averagePlacemarksPerUser = await calculateAveragePlacemarksPerUser(users);

            // Calculate total placemarks
            const totalPlacemarks = await calculateTotalPlacemarks(placemarks);

            // Calculate most popular category
            const mostPopularCategory = await calculateMostPopularCategory(placemarks);

            // list placemarks by category
            const placemarksPerCategory = await calculatePlacemarksPerCategory(placemarks);

            const mostActiveUser = await calculateMostActiveUser(users);
    
            const viewData = {
                title: "Placemark Analytics",
                users: users.length,
                placemarks: placemarks.length,
                placemarksPerCategory: placemarksPerCategory,
                mostPopularCategory: mostPopularCategory,
                averagePlacemarksPerUser: averagePlacemarksPerUser,
                mostActiveUser: mostActiveUser,
            };
    
            return h.view("analytics-view", viewData);
        },
    },
    

    deleteUser: {
        handler: async function (request, h) {
        await db.userStore.deleteUserById(request.params.id);
        return h.redirect("/admin");
        },
    },
};