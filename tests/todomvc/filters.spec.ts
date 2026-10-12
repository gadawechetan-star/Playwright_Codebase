import { test, expect } from '@playwright/test';

test.describe('Filters and persistence', () => {
  test('Filter todos with All, Active, and Completed views', async ({ page }) => {
    // Start empty; add Active task and Completed task, then complete the latter.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('Active task');
    await newTodo.press('Enter');
    await newTodo.fill('Completed task');
    await newTodo.press('Enter');
    const todoTitles = page.getByTestId('todo-title');
    const todoCount = page.getByTestId('todo-count');
    const todoCheckboxes = page.getByRole('checkbox', { name: 'Toggle Todo' });
    await todoCheckboxes.nth(1).click();
    await expect(todoTitles).toHaveText(['Active task', 'Completed task']);
    await expect(todoCount).toHaveText('1 item left');

    // Select the Active filter.
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(todoTitles).toHaveText(['Active task']);
    await expect(todoCount).toHaveText('1 item left');

    // Select the Completed filter.
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(todoTitles).toHaveText(['Completed task']);
    await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
    await expect(todoCount).toHaveText('1 item left');

    // Return to All.
    await page.getByRole('link', { name: 'All' }).click();
    await expect(todoTitles).toHaveText(['Active task', 'Completed task']);
    await expect(todoCheckboxes.nth(0)).not.toBeChecked();
    await expect(todoCheckboxes.nth(1)).toBeChecked();
    await expect(todoCount).toHaveText('1 item left');
  });
});
