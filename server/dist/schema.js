"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type Query {
    ping: String
  }

  type Restaurant {
    place_id: String
    name: String
    icon: String
    formatted_address: String
    formatted_phone_number: String
    geometry: Geometry
    website: String
    price_level: String
    opening_hours: OpenHours
  }

  type Geometry {
    location: Location
  }

  type Location {
    lat: Int
    lng: Int
  }

  type OpenHours {
    open_now: Boolean
  }
`;
exports.default = typeDefs;
