import { test, expect } from '@playwright/test';

test.describe('Todo lifecycle and input validation', () => {
  test('Delete a todo', async ({ page }) => {
    // Start empty and add Keep this and Remove this.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('Keep this');
    await newTodo.press('Enter');
    await newTodo.fill('Remove this');
    await newTodo.press('Enter');
    const todoTitles = page.getByTestId('todo-title');
    const todoCount = page.getByTestId('todo-count');
    await expect(todoTitles).toHaveText(['Keep this', 'Remove this']);
    await expect(todoCount).toHaveText('2 items left');

    // Reveal and click Delete for Remove this.
    await todoTitles.nth(1).hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(todoTitles).toHaveText(['Keep this']);
    await expect(todoCount).toHaveText('1 item left');

    // Reveal and click Delete for Keep this.
    await todoTitles.hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(todoTitles).toHaveCount(0);
    await expect(todoCount).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'All' })).toHaveCount(0);
  });
});
