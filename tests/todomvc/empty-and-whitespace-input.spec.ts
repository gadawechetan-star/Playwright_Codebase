import { test, expect } from '@playwright/test';

test.describe('Todo lifecycle and input validation', () => {
  test('Do not add empty or whitespace-only todos', async ({ page }) => {
    // Start with an empty list. Leave the entry textbox empty and press Enter.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.press('Enter');

    const todoTitles = page.getByTestId('todo-title');
    await expect(todoTitles).toHaveCount(0);
    await expect(page.getByTestId('todo-count')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'All' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);

    // Fill the entry textbox with spaces only and press Enter.
    await newTodo.fill('   ');
    await newTodo.press('Enter');

    await expect(todoTitles).toHaveCount(0);
   // await expect(newTodo).toHaveValue('');
  });
});
