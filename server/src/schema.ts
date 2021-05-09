import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
  }

  """
  Places from google places API
  """
  type Place {
    place_id: String
    name: String
    icon: String
    photos: [Photo]
    formatted_address: String
    formatted_phone_number: String
    geometry: Geometry
    website: String
    price_level: String
    ratings: [Int]
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

  input PlaceInput {
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

  type PlacesResult {
    places: [Place]
    next_page_token: String
  }

  type RatingsResult {
    placeId: ID
    ratings: [Int]
  }

  type Query {
    places(coordinates: PlaceInput, pagetoken: String): PlacesResult
    place(placeId: ID!): Place
    reviews(placeId: ID!, limit: Int, offset: Int): ReviewsResult
    ratings(placeId: ID!): RatingsResult
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
    getRating(placeId: ID!): RatingsResult
  }
`;

export default typeDefs;
