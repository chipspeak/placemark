# Placemark - POI

Placemark is a web application and API for adding and categorising outdoor points of interest.
This application was created for a Full Stack Development module on the HDip in Computer Science at SETU.

## Features

- Create, view, update and delete placemarks via the application or API
- Add and update images to the placemarks for viewing within the application
- Added placemarks are viewable on a map at the bottom of the dashboard with images features when clicking on the placemarks
- Users can view placemarks in their entirety on the dashboard or by category using the appropriate tab and selection
- The administrator can view all current users and analytics relating to their placemarks in addition to deleting users as needed

## User guide
1.  Sign up and log in to view your dashboard. To view some of the seeded sample placemarks you can log in using the following details
email: "homer@simpson.com" password: "secret".
#
![](https://github.com/chipspeak/placemark/blob/main/assets/dashboard.png)
#
2.  Placemarks are expanded by default and within the expanded view you can see the placemark's details. Initially, there won't be an image but click the camera icon to upload one and add it to the placemark
#
![](https://github.com/chipspeak/placemark/blob/main/assets/expanded-view.png)
#
3.  You can collapse the placemark card if you find your dashboard becoming too cluttered. Click the arrow to collapse the card. You can also collapse the images once they've been added by clicking the arrow above them.
#
![](https://github.com/chipspeak/placemark/blob/main/assets/collapsed-view.png)
#
4.  When you first log in, you'll be presented with the add placemark form by default. Once a placemark has been added, the dashboard view will expand to feature a map with the placemark displayed at its location.
Clicking on the placemark will show its title (and image if it has one). The Map defaults to a wide view of Ireland but you can freely adjust its position and level of zoom.
#
![](https://github.com/chipspeak/placemark/blob/main/assets/map-and-add.png)
#
5. Clicking the API tab or adding "/documentation" to the website URL will redirect to the API documentation where you can view all of the available methods, schemas and examples.
Certain actions, such as deleting all users and placemarks, are locked behind Admin privileges. The other methods are available to try out within the swagger interface however most require token authentification.
To do this, simply create a user, then pass the new user's credentials to the authenticate method. You can then log in using the returned token with the authorize button in the top right of the screen.
#
![](https://github.com/chipspeak/placemark/blob/main/assets/api.png)

## Technologies Used

-  JavaScript
-  Hapi
-  Node
-  Handlebars
-  JOI
-  JWT
-  LowDB
-  Mongoose
-  Cloudinary
-  Heroku
-  Axios
-  Chai
-  ESLint
-  Nodemon
-  Bulma
-  Font Awesome
-  Mocha
-  Chai
-  Glitch

## Website URL

https://placemark-poi.glitch.me/
#
