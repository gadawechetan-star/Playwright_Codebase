import { test, expect } from '@playwright/test';

test.describe('Todo lifecycle and input validation', () => {
  test('Add a very long todo without truncation', async ({ page }) => {
    // Start with an empty list. Enter a distinctive 500-character todo title and submit it.
    await page.goto('https://demo.playwright.dev/todomvc');
    const longTodo = 'A'.repeat(500);
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill(longTodo);
    await newTodo.press('Enter');

    const todoTitles = page.getByTestId('todo-title');
    await expect(todoTitles).toHaveCount(1);
    await expect(todoTitles).toHaveText([longTodo]);
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
  });
});
