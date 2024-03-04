import dotenv from "dotenv";

dotenv.config();

export const serviceUrl = "http://localhost:3000";

export const maggie = {
  firstName: "Maggie",
  lastName: "Simpson",
  email: "maggie@simpson.com",
  password: "secret"
};

export const maggieCreds = {
  email: "maggie@simpson.com",
  password: "secret"
};

export const testAdminCreds = {
  email : process.env.email,
  password : process.env.password
}

export const testUsers = [
  {
    firstName: "Homer",
    lastName: "Simpson",
    email: "homer@simpson.com",
    password: "secret"
  },
  {
    firstName: "Marge",
    lastName: "Simpson",
    email: "marge@simpson.com",
    password: "secret"
  },
  {
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret"
  }
];

export const testPlacemark = {
  "title" : "River Lee",
  "description" : "River running through Cork city",
  "location" : "Cork, Ireland",
  "latitude" : "53.381290",
  "longitude" : "-6.591850",
  "category" : "River",
};

export const incorrectPlaceMark = {
  "title" : "",
  "description" : "test",
  "location" : "test",
  "latitude" : "test",
  "longitude" : "test",
  "category" : "test",
};

export const testPlacemarks = [
  {
    "title" : "Pinewood River",
    "description" : "Beautiful river nestled in a dense pine forest. Perfect place to take stock and drink in nature.",
    "location" : "Big Wood, Kilkenny, Ireland",
    "latitude" : "53.38129",
    "longitude" : "-6.59185",
    "category" : "River",
  },
  {
  "title" : "Maynooth Park",
  "description" : "Small park and playground within walking distance of the village square and train station.",
  "location" : "Maynooth, County Kildare",
  "latitude" : "40.30858",
  "longitude" : "-3.1883",
  "category" : "Park",
  },
  {
  "title" : "Woodstown Beach",
  "description" : "2 mile long beach with a quaint pub at the halfway point. Less than 20 minutes from Waterford City and has parking at multiple entrances.",
  "location" : "Woodstown, County Waterford",
  "latitude" : "63.3812",
  "longitude" : "-2.1686",
  "category" : "Beach",
  },
  {
  "title" : "River Suir",
  "description" : "As seen in the photo, this is a wonderful place to take in the river that flows through Tip and Waterford. Tranquil at any time.",
  "location" : "Holycross, Tipperary",
  "latitude" : "55.9533",
  "longitude" : "-3.1883",
  "category" : "River",
  },
  {
  "title" : "Phoenix Park",
  "description" : "Spectacular park with numerous attractions within driving distance of Dublin City. Everything from guided tours to spots to relax and try to spot the native deer!",
  "location" : "Dublin City, Leinster",
  "latitude" : "32.9533",
  "longitude" : "-6.1876",
  "category" : "Park",
  },
  {
  "title" : "People's Park",
  "description" : "Nice park in Waterford City with a fantastic cafe on site and numerous amusements for kids. Several car parks near by and within easy walking distance of the city center.",
  "location" : "Waterford City, Munster",
  "latitude" : "55.9533",
  "longitude" : "-8.1883",
  "category" : "Park",
  }
];

const riverImage = "http://res.cloudinary.com/dyi6tqhuo/image/upload/v1709432585/sqxpqzhokkdnutgynlfs.jpg";
const maynoothImage = "http://res.cloudinary.com/dyi6tqhuo/image/upload/v1709432693/vvcbhvhwdbqt9eds1dvx.jpg";
const woodstownImage = "http://res.cloudinary.com/dyi6tqhuo/image/upload/v1709432842/stsq0dftvkygopr2dne4.jpg";
const suirImage = "http://res.cloudinary.com/dyi6tqhuo/image/upload/v1709433197/rjl1dvfukxcrzbezlzsm.jpg";
const phoenixImage = "http://res.cloudinary.com/dyi6tqhuo/image/upload/v1709433431/icw1kozx29krncrra0f8.jpg";
const peoplesParkImage = "http://res.cloudinary.com/dyi6tqhuo/image/upload/v1709433551/effolcu2iy0lar33fwc7.jpg";

export const testPlacemarkImages = [ riverImage, maynoothImage, woodstownImage, suirImage, phoenixImage, peoplesParkImage ]


