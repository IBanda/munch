// /* eslint-disable @typescript-eslint/no-explicit-any */
// import db from '../db';
// import User from '../models/user';
// import Review from '../models/review';

// import { testClient, gql } from './__utils/testClient';

// const { connect, disconnect } = db();

// beforeEach(async () => await connect());
// afterAll(async () => await disconnect());

// afterEach(async () => {
//   await User.deleteMany();
//   await Review.deleteMany();
// });

// const USER_SIGNUP = gql`
//   mutation UserSignup($user: UserInput) {
//     signup(user: $user) {
//       name
//       email
//     }
//   }
// `;
// const USER_SIGNIN = gql`
//   mutation UserSignin($user: UserInput) {
//     signin(user: $user) {
//       name
//       email
//     }
//   }
// `;

// const POST_REVIEW = gql`
//   mutation PostReview($review: ReviewInput) {
//     postReview(review: $review) {
//       id
//       review
//       user {
//         id
//       }
//       placeId
//     }
//   }
// `;

// const DELETE_REVIEW = gql`
//   mutation DeleteReview($id: ID!, $hasImages: Boolean, $placeId: ID!) {
//     deleteReview(id: $id, hasImages: $hasImages, placeId: $placeId) {
//       id
//     }
//   }
// `;

// describe('Mutations', () => {
//   test(mutationTestName('User signup'), async () => {
//     const res = await testSignUp();
//     expect(res.data).toEqual({
//       signup: {
//         name: 'John Doe',
//         email: 'john@mail.com',
//       },
//     });
//     const numOfSignedUpUsers = await User.estimatedDocumentCount();
//     expect(numOfSignedUpUsers).toBe(1);
//   });
//   test(mutationTestName('User SignIn'), async () => {
//     const res = await testSignIn();
//     expect(res.data).toEqual({
//       signin: {
//         name: 'John Doe',
//         email: 'john@mail.com',
//       },
//     });
//   });

//   test(mutationTestName('Post a Review'), async () => {
//     await postReview();
//     const reviewCount = await Review.estimatedDocumentCount();
//     expect(reviewCount).toBe(1);
//   });
//   test(mutationTestName('Delete a Review'), async () => {
//     const result = (await postReview()) as any;
//     const { mutate } = await testClient();

//     const reviewID = result.data.postReview.id;

//     const res = await mutate(DELETE_REVIEW, {
//       variables: {
//         id: reviewID,
//       },
//     });

//     expect(res.data).toEqual({
//       deleteReview: {
//         id: reviewID,
//       },
//     });
//     const reviewCount = await Review.estimatedDocumentCount();
//     expect(reviewCount).toBe(0);
//   });
// });

// async function testSignUp() {
//   const { mutate } = await testClient();
//   const res = await mutate(USER_SIGNUP, {
//     variables: {
//       user: { email: 'john@mail.com', name: 'John Doe', password: '123456' },
//     },
//   });
//   return res;
// }
// async function testSignIn() {
//   await testSignUp();
//   const { mutate } = await testClient();
//   const res = await mutate(USER_SIGNIN, {
//     variables: { user: { email: 'john@mail.com', password: '123456' } },
//   });
//   return res;
// }

// async function postReview() {
//   await testSignIn();
//   const { mutate } = await testClient();

//   const res = await mutate(POST_REVIEW, {
//     variables: {
//       review: {
//         review: 'Great place to eat',
//         user: {
//           id: '608d32b1f4856c6b341652c6',
//         },
//         placeId: 'ChIJ-SBdDCRZwokRu0x9Neuuoow',
//       },
//     },
//   });
//   return res;
// }

// function mutationTestName(desscription: string) {
//   return `[Mutation]: ${desscription}`;
// }
