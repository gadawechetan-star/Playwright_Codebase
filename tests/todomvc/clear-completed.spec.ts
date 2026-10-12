import { test, expect } from '@playwright/test';

test.describe('Todo lifecycle and input validation', () => {
  test('Clear completed todos without removing active todos', async ({ page }) => {
    // Start empty and add Active task, Completed task one, and Completed task two.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('Active task');
    await newTodo.press('Enter');
    await newTodo.fill('Completed task one');
    await newTodo.press('Enter');
    await newTodo.fill('Completed task two');
    await newTodo.press('Enter');
    const todoTitles = page.getByTestId('todo-title');
    const todoCheckboxes = page.getByRole('checkbox', { name: 'Toggle Todo' });
    const todoCount = page.getByTestId('todo-count');
    await expect(todoTitles).toHaveText(['Active task', 'Completed task one', 'Completed task two']);
    await expect(todoCount).toHaveText('3 items left');

    // Mark both completed-task items complete.
    await todoCheckboxes.nth(1).click();
    await todoCheckboxes.nth(2).click();
    await expect(todoCount).toHaveText('1 item left');
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();

    // Clear completed items.
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(todoTitles).toHaveText(['Active task']);
    await expect(todoCount).toHaveText('1 item left');
    await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);
  });
});
