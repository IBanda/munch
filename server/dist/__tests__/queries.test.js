'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const db_1 = __importDefault(require('../db'));
const testClient_1 = require('./__utils/testClient');
const GET_PLACES = testClient_1.gql`
  query GetPlaces($coordinates: PlaceInput) {
    places(coordinates: $coordinates) {
      places {
        name
        place_id
        formatted_address
        opening_hours {
          open_now
        }
      }
      next_page_token
    }
  }
`;
const GET_PLACE = testClient_1.gql`
  query GetPlace($placeId: ID!) {
    place(placeId: $placeId) {
      name
      place_id
      formatted_address
      opening_hours {
        open_now
      }
    }
  }
`;
describe('Queries', () => {
  test('[Query]:Should get list of places', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { query } = yield testClient_1.testClient();
      const res = yield query(GET_PLACES, {
        variables: { coordinates: { lat: 40.73061, lng: -73.935242 } },
      });
      expect(res.data).toEqual({
        places: {
          places: [
            {
              name: 'Court Square Diner',
              place_id: 'ChIJN6wFwihZwokRMtxwzGii9PI',
              formatted_address: null,
              opening_hours: {
                open_now: true,
              },
            },
            {
              name: 'Bellwether',
              place_id: 'ChIJ-SBdDCRZwokRu0x9Neuuoow',
              formatted_address: null,
              opening_hours: {
                open_now: false,
              },
            },
          ],
          next_page_token: null,
        },
      });
    }));
  test('[Query]:Should get place details', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const { query } = yield testClient_1.testClient();
      const { connect, disconnect } = db_1.default();
      yield connect();
      const res = yield query(GET_PLACE, {
        variables: { placeId: 'ChIJN6wFwihZwokRMtxwzGii9PI' },
      });
      expect(res.data).toEqual({
        place: {
          name: 'Court Square Diner',
          place_id: 'ChIJN6wFwihZwokRMtxwzGii9PI',
          formatted_address: null,
          opening_hours: {
            open_now: true,
          },
        },
      });
      yield disconnect();
    }));
});
