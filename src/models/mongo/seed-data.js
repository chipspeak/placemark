export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  
  placemarks: {
    _model: "Placemark",
    river: {
      "title": "Pinewood River",
      "description": "Beautiful river nestled in a dense pine forest. Perfect place to take stock and drink in nature.",
      "location": "Big Wood, Kilkenny, Ireland",
      "latitude": "52.5175",
      "longitude": "-7.3501",
      "category": "River",
      "userId": "->users.homer",
      "img": "/images/river.jpg"
    },
    maynoothPark: {
      "title" : "Maynooth Park",
      "description" : "Small park and playground within walking distance of the village square and train station.",
      "location" : "Maynooth, County Kildare",
      "latitude" : "53.385",
      "longitude" : "-6.59361",
      "category" : "Park",
      "userId": "->users.homer",
      "img" : "/images/maynooth-playground.jpg"
    },
    woodstownBeach: {
      "title" : "Woodstown Beach",
      "description" : "2 mile long beach with a quaint pub at the halfway point. Less than 20 minutes from Waterford City and has parking at multiple entrances.",
      "location" : "Woodstown, County Waterford",
      "latitude" : "52.190",
      "longitude" : "-6.984",
      "category" : "Beach",
      "userId": "->users.homer",
      "img" : "/images/place-woodstown-beach.jpg"
    },
    riverSuir:{
      "title" : "River Suir",
      "description" : "As seen in the photo, this is a wonderful place to take in the river that flows through Tip and Waterford. Tranquil at any time.",
      "location" : "Holycross, Tipperary",
      "latitude" : "52.6398",
      "longitude" : "-7.8702",
      "category" : "River",
      "userId" : "->users.homer",
      "img" : "/images/suir.jpg"
    },
    phoenixPark: {
      "title" : "Phoenix Park",
      "description" : "Spectacular park with numerous attractions within driving distance of Dublin City. Everything from guided tours to spots to relax and try to spot the native deer!",
      "location" : "Dublin City, Leinster",
      "latitude" : "53.3559",
      "longitude" : "-6.3298",
      "category" : "Park",
      "userId" : "->users.homer",
      "img" : "/images/the-beautiful-and-surprising-phoenix-park-dublin.jpg"
    },
    peoplesPark: {
      "title" : "People's Park",
      "description" : "Nice park in Waterford City with a fantastic cafe on site and numerous amusements for kids. Several car parks near by and within easy walking distance of the city center.",
      "location" : "Waterford City, Munster",
      "latitude" : "52.25513",
      "longitude" : "-7.10174",
      "category" : "Park",
      "userId" : "->users.homer",
      "img" : "/images/peoples_park.jpg"
    },
    glendalough: {
      "title" : "Glendalough",
      "description" : "A truly magical place. The valley and lake are a must see. There are also numerous walking trails and a visitor center.",
      "location" : "Glendalough, County Wicklow",
      "latitude" : "53.0108",
      "longitude" : "-6.3249",
      "category" : "Lake",
      "userId" : "->users.homer",
      "img" : "/images/glendalough.jpg"
    },
    kells: {
      "title" : "Kells",
      "description" : "Beautiful ancient monastory on the outskirts of Kells. There is also a museum and a cafe at the mill nearby.",
      "location" : "Kells, County Kilkenny",
      "latitude" : "52.54815",
      "longitude" : "-7.27987",
      "category" : "Ancient Ruin",
      "userId" : "->users.homer",
      "img" : "/images/kells.jpg"
    },
    cashelCastle: {
      "title" : "Cashel Castle",
      "description" : "The Rock of Cashel is a wondrous place. The visitor center and guided tours are top notch.",
      "location" : "Cashel, County Tipperary",
      "latitude" : "52.5201",
      "longitude" : "-7.8905",
      "category" : "Castle",
      "userId" : "->users.homer",
      "img" : "/images/cashel.jpg"
    },
    croaghPatrick: {
      "title" : "Croagh Patrick",
      "description" : "The mountain is a pilgrimage site and has a church at the top. The views are spectacular and the climb is well worth it.",
      "location" : "Croagh Patrick, County Mayo",
      "latitude" : "53.7600",
      "longitude" : "-9.6592",
      "category" : "Hike",
      "userId" : "->users.marge",
      "img" : "/images/croagh_patrick.jpg"
    },
    dunmoreCave: {
      "title" : "Dunmore Cave",
      "description" : "The cave is a tremendous experience and one I'd recommend to anyone. There are guided tours for those who are a bit unsure of how to navigate.",
      "location" : "Dunmore Cave, County Kilkenny",
      "latitude" : "52.7339",
      "longitude" : "-7.2468",
      "category" : "Cave",
      "userId" : "->users.marge",
      "img" : "/images/dunmore-cave.jpg"
    },
    theBurren: {
      "title" : "The Burren",
      "description" : "The Burren is a one of a kind experience. One of the most unique and spectacular places I've ever been.",
      "location" : "The Burren, County Clare",
      "latitude" : "52.9968",
      "longitude" : "-9.0374",
      "category" : "National Park",
      "userId" : "->users.marge",
      "img" : "/images/burren.jpg"
    },
    roscommonRingfort: {
      "title" : "Roscommon Ringfort",
      "description" : "The ringfort is an incredible sight for anybody interested in ancient history.",
      "location" : "Rathfar, County Roscommon",
      "latitude" : "53.6277",
      "longitude" : "-8.1834",
      "category" : "Ringfort",
      "userId" : "->users.marge",
      "img" : "/images/roscommon-rathrar-ringfort.jpg"
    },
    poulnabroneDolmen: {
      "title" : "Poulnabrone Dolmen",
      "description" : "The dolmen is a marvel of prehistoric engineering and a must see for anyone who wants to experience the ancient history of Ireland.",
      "location" : "Poulnabrone, County Clare",
      "latitude" : "53.0487",
      "longitude" : "-9.1400",
      "category" : "Dolmen",
      "userId" : "->users.bart",
      "img" : "/images/dolmen-clare.jpg"
    },
    newgrange: {
      "title" : "Newgrange",
      "description" : "This ancient tomb is one of Irelands many ancient wonders. The guided tours are wonderful and highly informative.",
      "location" : "Newgrange, County Meath",
      "latitude" : "53.6942",
      "longitude" : "-6.4753",
      "category" : "Ancient Ruin",
      "userId" : "->users.bart",
      "img" : "/images/newgrange-meath.jpg"
    },
    mahonFalls: {
      "title" : "Mahon Falls",
      "description" : "The falls are a beautiful sight and a great place to take a walk and enjoy the natural beauty of Ireland.",
      "location" : "The Comeragh Mountains, County Waterford",
      "latitude" : "52.2025",
      "longitude" : "-7.4658",
      "category" : "Waterfall",
      "userId" : "->users.bart",
      "img" : "/images/mahon-falls.jpg"
    },
    waterfordGreenway: {
      "title" : "Waterford Greenway",
      "description" : "The Greenway is a fantastic place to take a walk or cycle. The views are spectacular and the route is well maintained.",
      "location" : "Waterford City, County Waterford",
      "latitude" : "52.2593",
      "longitude" : "-7.1107",
      "category" : "Walk",
      "userId" : "->users.bart",
      "img" : "/images/greenway.jpg"
    }

  }
}



