import { waitForElementToBeRemoved, screen } from '@testing-library/react';
export async function load() {
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
}
