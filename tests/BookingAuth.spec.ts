import { test, expect, type Page } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

type UserCredentials = {
	email: string;
	password: string;
};

type LoginResponse = {
	token?: string;
	data?: {
		token?: string;
	};
};

type EventsResponse = {
	data: Array<{
		id: string | number;
	}>;
};

type BookingResponse = {
	data: {
		id: string | number;
	};
};

const YAHOO_USER: UserCredentials = {
	email: process.env.YAHOO_EMAIL || 'Wastegonnahoiya@yahoo.com',
	password: process.env.YAHOO_PASSWORD || 'Wastegonnahoiya@1',
};

const GMAIL_USER: UserCredentials = {
	email: process.env.GMAIL_EMAIL || 'Wastegonnahoiya@gmail.com',
	password: process.env.GMAIL_PASSWORD || 'Wastegonnahoiya@1',
};

async function loginAs(page: Page, user: UserCredentials): Promise<void> {
	await page.goto(`${BASE_URL}/login`);
	await page.getByLabel('Email').fill(user.email);
	await page.getByPlaceholder('••••••').fill(user.password);
	await page.locator('#login-btn').click();
	await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Gmail user cannot view Yahoo user booking', async ({ page, request }) => {
	expect(YAHOO_USER.email).toBeTruthy();
	expect(YAHOO_USER.password).toBeTruthy();

	const yahooLoginResponse = await request.post(`${API_URL}/auth/login`, {
		data: YAHOO_USER,
	});
	await expect(yahooLoginResponse).toBeOK();
	const yahooLoginBody = (await yahooLoginResponse.json()) as LoginResponse;
	const yahooToken = yahooLoginBody.token || yahooLoginBody.data?.token;
	expect(yahooToken).toBeTruthy();

	const eventsResponse = await request.get(`${API_URL}/events`, {
		headers: {
			Authorization: `Bearer ${yahooToken}`,
		},
	});
	await expect(eventsResponse).toBeOK();
	const eventsBody = (await eventsResponse.json()) as EventsResponse;
	const eventId = eventsBody.data[0].id;

	const bookingResponse = await request.post(`${API_URL}/bookings`, {
		headers: {
			Authorization: `Bearer ${yahooToken}`,
		},
		data: {
			eventId,
			customerName: 'Yahoo User',
			customerEmail: YAHOO_USER.email,
			customerPhone: '9876543210',
			quantity: 1,
		},
	});
	await expect(bookingResponse).toBeOK();
	const bookingBody = (await bookingResponse.json()) as BookingResponse;
	const yahooBookingId = bookingBody.data.id;

	await loginAs(page, GMAIL_USER);
	await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, {
		waitUntil: 'networkidle',
	});

	await expect(page.getByText('Access Denied')).toBeVisible();
	await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
});
