import { expect } from '@playwright/test';
import { customtest } from './utils/Fixtures.js';

customtest('fixture creates an event visible to the authenticated user', async ({ authenticatedPage, createEvent }) => {
    // The fixture has already logged in; only navigation is needed here.
    await authenticatedPage.goto('https://eventhub.rahulshettyacademy.com/events');
    // The fixture-created event is exposed through createEvent.
    await expect(authenticatedPage.getByText(createEvent.title)).toBeVisible();
});