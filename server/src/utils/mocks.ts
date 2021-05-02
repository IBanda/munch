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
  }),
};
export default mocks;
