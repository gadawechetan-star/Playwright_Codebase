import { test, expect } from '@playwright/test';

test.describe('Filters and persistence', () => {
  test('Persist todos and completion state after page reload', async ({ page }) => {
    // Start empty and add Still active and Still completed, then complete the latter.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('Still active');
    await newTodo.press('Enter');
    await newTodo.fill('Still completed');
    await newTodo.press('Enter');
    const todoTitles = page.getByTestId('todo-title');
    const todoCheckboxes = page.getByRole('checkbox', { name: 'Toggle Todo' });
    const todoCount = page.getByTestId('todo-count');
    await todoCheckboxes.nth(1).click();
    await expect(todoTitles).toHaveText(['Still active', 'Still completed']);
    await expect(todoCheckboxes.nth(0)).not.toBeChecked();
    await expect(todoCheckboxes.nth(1)).toBeChecked();
    await expect(todoCount).toHaveText('1 item left');

    // Reload and verify todos and states persist.
    await page.reload();
    await expect(todoTitles).toHaveText(['Still active', 'Still completed']);
    await expect(todoCheckboxes.nth(0)).not.toBeChecked();
    await expect(todoCheckboxes.nth(1)).toBeChecked();
    await expect(todoCount).toHaveText('1 item left');

    // Select Active and then Completed filters.
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(todoTitles).toHaveText(['Still active']);
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(todoTitles).toHaveText(['Still completed']);

    // Return to All and reload once more.
    await page.getByRole('link', { name: 'All' }).click();
    await page.reload();
    await expect(todoTitles).toHaveText(['Still active', 'Still completed']);
    await expect(todoCheckboxes.nth(0)).not.toBeChecked();
    await expect(todoCheckboxes.nth(1)).toBeChecked();
  });
});
