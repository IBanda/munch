export function mockGeolocation() {
  Object.defineProperty(global.navigator, 'geolocation', {
    value: {
      ...global.navigator.geolocation,
      getCurrentPosition: jest.fn().mockImplementation((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: 40.73061,
              longitude: -73.935242,
            },
          })
        )
      ),
    },
  });
}
