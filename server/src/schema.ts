import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    jwt: String
  }
  type Restaurant {
    place_id: String
    name: String
    icon: String
    photos: [Photo]
    formatted_address: String
    formatted_phone_number: String
    geometry: Geometry
    website: String
    price_level: String
    opening_hours: OpenHours
    reviews: [Review]
  }

  type Review {
    id: ID!
    review: String
    name: String
    userId: String
    placeId: String
    created_on: String
  }

  input RestaurantInput {
    lat: Float
    lng: Float
  }

  input UserInput {
    email: String
    name: String
    password: String
  }

  input ReviewInput {
    review: String
    userId: String
    placeId: String
  }

  type Geometry {
    location: Location
  }

  type Location {
    lat: Float
    lng: Float
  }

  type OpenHours {
    open_now: Boolean
  }

  type Photo {
    width: Int
    height: Int
    photo_reference: String
  }

  type Query {
    restraurants(coordinates: RestaurantInput): [Restaurant]
    restraurant(id: ID!): Restaurant
    reviews(placeId: String): [Review]
  }

  type Mutation {
    signup(user: UserInput): User
    signin(user: UserInput): User
    postReview(review: ReviewInput): Review
  }

  type Subscription {
    getReview(id: String): Review
  }
`;

export default typeDefs;
