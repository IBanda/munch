const mocks = {
  Query: () => ({
    restaurants: () => [
      {
        name: 'Rules',
        place_id: 'ChIJbUnC58oEdkgR4pwzPtYGrbY',
        opening_hours: null,
        geometry: {
          location: {
            lat: 51.5107984,
            lng: -0.1231629,
          },
        },
        vicinity: '34-35 Maiden Ln, London',
        types: [
          'bar',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'SUSHISAMBA Covent Garden',
        place_id: 'ChIJW7PbgAYFdkgRKzZcm_oVjnM',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.5123967,
            lng: -0.1224727,
          },
        },
        vicinity: '35 The Market, London',
        types: [
          'meal_takeaway',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'TGI Fridays - Covent Garden',
        place_id: 'ChIJy3SZHMwEdkgRKE_aVl9IJLY',
        opening_hours: null,
        geometry: {
          location: {
            lat: 51.5102215,
            lng: -0.1241165,
          },
        },
        vicinity: '6 Bedford St, London',
        types: [
          'bar',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'TGI Fridays - Leicester Square',
        place_id: 'ChIJfXuq-80EdkgR2wZJuV13B5k',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.5101582,
            lng: -0.1293771,
          },
        },
        vicinity: '30 Leicester Square, London',
        types: [
          'bar',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'Rosewood London',
        place_id: 'ChIJi-8-gTUbdkgRvgRcAHEwuyc',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.51766900000001,
            lng: -0.1179599,
          },
        },
        vicinity: '252 High Holborn, London',
        types: ['lodging', 'point_of_interest', 'establishment'],
      },
      {
        name: 'Faulty Towers The Dining Experience',
        place_id: 'ChIJ_____84EdkgRit_-iv9jPhU',
        opening_hours: null,
        geometry: {
          location: {
            lat: 51.517488,
            lng: -0.127685,
          },
        },
        vicinity: '9-13, Radisson Blu Hotel, Bloomsbury St, London',
        types: ['point_of_interest', 'establishment'],
      },
      {
        name: 'Artemide GB',
        place_id: 'ChIJdzf_fzIbdkgRWmX34VzxpB0',
        opening_hours: {
          open_now: false,
        },
        geometry: {
          location: {
            lat: 51.5175269,
            lng: -0.1291167,
          },
        },
        vicinity: '106 Great Russell St, London',
        types: ['point_of_interest', 'establishment'],
      },
      {
        name: "Bentley's Oyster Bar & Grill",
        place_id: 'ChIJr-SGMSqm2EcRJzf-wRsCj6E',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.509533,
            lng: -0.137661,
          },
        },
        vicinity: '11-15 Swallow St, London',
        types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      },
      {
        name: 'The Cinnamon Club',
        place_id: 'ChIJewr3utwEdkgRw51-rUzWyVo',
        opening_hours: null,
        geometry: {
          location: {
            lat: 51.497425,
            lng: -0.129625,
          },
        },
        vicinity: 'The Old Westminster Library, Great Smith St, London',
        types: [
          'bar',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'Rooftop',
        place_id: 'ChIJD4EoabsFdkgRSLTHbQSJ6Ao',
        opening_hours: null,
        geometry: {
          location: {
            lat: 51.51379379999999,
            lng: -0.0955343,
          },
        },
        vicinity: '17 New Change, London',
        types: ['bar', 'point_of_interest', 'establishment'],
      },
      {
        name: 'Ligne Roset Westend',
        place_id: 'ChIJi9GWTSobdkgRsUFjUivt9s8',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.51823040000001,
            lng: -0.1382345,
          },
        },
        vicinity: '23-25 Mortimer St, London',
        types: [
          'furniture_store',
          'home_goods_store',
          'point_of_interest',
          'store',
          'establishment',
        ],
      },
      {
        name: 'The Langham, London',
        place_id: 'ChIJj375B9UadkgRkmFrWaFBXww',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.517801,
            lng: -0.1439928,
          },
        },
        vicinity: '1C Portland Pl, London',
        types: ['lodging', 'point_of_interest', 'establishment'],
      },
      {
        name: "Scott's",
        place_id: 'ChIJcf7z3i0FdkgRp8viwzBRRn8',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.5098997,
            lng: -0.1508364,
          },
        },
        vicinity: '20 Mount St, London',
        types: [
          'bar',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'The Goring Hotel',
        place_id: 'ChIJpyeYGW8FdkgRqfqKh8Yxrs8',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.4975718,
            lng: -0.1454684,
          },
        },
        vicinity: '15 Beeston Pl, London',
        types: [
          'lodging',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'The Goring Dining Room',
        place_id: 'ChIJXalKaSEFdkgRFq49_DDicaA',
        opening_hours: null,
        geometry: {
          location: {
            lat: 51.49752609999999,
            lng: -0.145622,
          },
        },
        vicinity: '15 Beeston Pl, London',
        types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      },
      {
        name: 'Afternoon Tea at The Goring',
        place_id: 'ChIJt-jumxEFdkgRfUt94lSVfaw',
        opening_hours: null,
        geometry: {
          location: {
            lat: 51.4974158,
            lng: -0.1459375,
          },
        },
        vicinity: 'Beeston Pl, London',
        types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
      },
      {
        name: 'Leonardo Royal London City',
        place_id: 'ChIJM8Z8DUwDdkgRAfOOreRfemE',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.5109147,
            lng: -0.0768084,
          },
        },
        vicinity: "8-14 Cooper's Row, London",
        types: [
          'lodging',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'The Dining Chair Company',
        place_id: 'ChIJu1lX2RkFdkgRZlprEoouBdM',
        opening_hours: {
          open_now: false,
        },
        geometry: {
          location: {
            lat: 51.4904601,
            lng: -0.1522218,
          },
        },
        vicinity: '4 St Barnabas St, London',
        types: ['point_of_interest', 'establishment'],
      },
      {
        name: 'Market Place Restaurant',
        place_id: 'ChIJn0DHD2wFdkgR78CIVVUmhZo',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.4881085,
            lng: -0.169449,
          },
        },
        vicinity: '125 Sydney St, London',
        types: [
          'restaurant',
          'bar',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
      {
        name: 'Greenberry Café',
        place_id: 'ChIJD8An2-4adkgRWWGhJ0GT-dw',
        opening_hours: {
          open_now: true,
        },
        geometry: {
          location: {
            lat: 51.54199999999999,
            lng: -0.1564528,
          },
        },
        vicinity: "101 Regent's Park Rd, London",
        types: [
          'cafe',
          'bar',
          'restaurant',
          'food',
          'point_of_interest',
          'establishment',
        ],
      },
    ],
    restaurant: () => ({
      name: 'Rules',
      place_id: 'ChIJzSQ5U1cbdkgREjrfEOazWE8',
      formatted_address: '34-35 Maiden Ln, London WC2E 7LB, UK',
      formatted_phone_number: '020 7836 5314',
      geometry: {
        location: {
          lat: 51.5107984,
          lng: -0.1231629,
        },
      },
      website: 'http://www.rules.co.uk/',
      opening_hours: {
        open_now: true,
        weekday_text: [
          'Monday: 9:00 AM – 5:30 PM',
          'Tuesday: 9:00 AM – 5:30 PM',
          'Wednesday: 9:00 AM – 5:30 PM',
          'Thursday: 9:00 AM – 5:30 PM',
          'Friday: 9:00 AM – 5:30 PM',
          'Saturday: Closed',
          'Sunday: Closed',
        ],
      },
    }),
    reviews: () => [
      {
        id: '609187bd7f3bbb3f34abf6f4',
        review:
          'Loved the outdoor brunch experience just as much as I loved the pop-up! Freshly made bagels and donuts, and probably the best shrimp and grits I’ve ever had. My fave brunch of 2020 - thanks Chef Andrew!',
        user: {
          id: '608e48a01e1d61a54c208752',
          name: 'Marco',
        },
        created_on: '1620150183873',
      },
      {
        id: '609186bfacb42d3f40d21c66',
        review:
          'I look forward to Friday so I can place my early to rise order. The last batch of bagels was highly impressive. The bagels have evolved into a fine art with fluff and flavor. The doughnuts are equally impressive and although their descriptions sound heavy they are always light.  The house smoked salmon is flavorful and fresh. Now that outdoor is back open and the weather is getting better my new ritually maybe curbside dining. Thanks Chef & crew!',
        user: {
          id: '608e48a01e1d61a54c208752',
          name: 'John',
        },
        created_on: '1620149753748',
      },
      {
        id: '60918654acb42d3f40d21c64',
        review:
          "Scratch made brunch in a bag..how could this not be great. Everyone talks about New York bagels. I guess that's because they haven't had the home made bagels from Early to Rise (ETR).  Those with the house smoked salmon and brunch is ready to go. At $28 a bag it's an unbelievably good way to support local and enjoy a great Sunday!",
        user: {
          id: '608e48a01e1d61a54c208752',
          name: 'Jane',
        },
        created_on: '1620149753748',
      },
    ],
  }),
};
export default mocks;
