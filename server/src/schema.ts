import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
  }

  """
  Restaurants from google places API
  """
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
    vicinity: String
    types: [String]
  }

  type Review {
    id: ID!
    review: String
    user: User
    rating: Int
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
    user: String
    rating: Int
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
    weekday_text: [String]
  }

  """
  Photo to match the google Photo
  using the photo_reference to fetch the original photo
  from the place photo API
  """
  type Photo {
    width: Int
    height: Int
    photo_reference: String
  }

  type ReviewsResult {
    reviews: [Review]
    hasMore: Boolean
  }
  type Query {
    restaurants(coordinates: RestaurantInput): [Restaurant]
    restaurant(id: ID!): Restaurant
    reviews(placeId: ID!, limit: Int, offset: Int): ReviewsResult
  }

  type Mutation {
    signup(user: UserInput): User
    signin(user: UserInput): User
    postReview(review: ReviewInput): Review
    deleteReview(id: ID!): ID
    editReview(review: String!, id: ID!): Review
  }

  type Subscription {
    getReview(placeId: ID!): Review
  }
`;

export default typeDefs;
