import { test as base, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';
const USER_EMAIL = process.env.GMAIL_EMAIL || 'Wastegonnahoiya@gmail.com';
const USER_PASSWORD = process.env.GMAIL_PASSWORD || 'Wastegonnahoiya@1';

exports.customtest = base.extend({
	// Logs in through the UI and yields a page that is ready for test steps.
	authenticatedPage: async ({ page }, use) => {
		await page.goto(`${BASE_URL}/login`);
		await page.getByLabel('Email').fill(USER_EMAIL);
		await page.getByPlaceholder('••••••').fill(USER_PASSWORD);
		await page.locator('#login-btn').click();
		await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
		await use(page);
	},

	// Authenticates through the API, creates an event, and yields its response data.
	createEvent: async ({ request }, use) => {
		const eventTitle = `Fixture Event ${Date.now()}`;
		const loginResponse = await request.post(`${API_URL}/auth/login`, {
			data: {
				email: USER_EMAIL,
				password: USER_PASSWORD,
			},
		});

		if (!loginResponse.ok()) {
			throw new Error(`Fixture login failed with status ${loginResponse.status()}: ${await loginResponse.text()}`);
		}

		const loginBody = await loginResponse.json();
		const token = loginBody.token || loginBody.data?.token;
		const response = await request.post(`${API_URL}/events`, {
			data: {
				title: eventTitle,
				description: 'Event created by a Playwright fixture',
				category: 'Conference',
				city: 'Bangalore',
				venue: 'Fixture Venue',
				eventDate: '2027-12-31T10:00',
				price: 100,
				totalSeats: 50,
			},
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok()) {
			throw new Error(`Event creation failed with status ${response.status()}: ${await response.text()}`);
		}

		const responseBody = await response.json();
		await use(responseBody.data || responseBody);
	},
});
