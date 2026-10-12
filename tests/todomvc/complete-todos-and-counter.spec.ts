import { test, expect } from '@playwright/test';

test.describe('Todo lifecycle and input validation', () => {
  test('Mark todos complete and validate the remaining-items counter', async ({ page }) => {
    // Start empty; add First task and Second task.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('First task');
    await newTodo.press('Enter');
    await newTodo.fill('Second task');
    await newTodo.press('Enter');

    const todoItems = page.getByRole('list').filter({ has: page.getByRole('checkbox', { name: 'Toggle Todo' }) }).getByRole('listitem');
    const todoCheckboxes = page.getByRole('checkbox', { name: 'Toggle Todo' });
    const todoCount = page.getByTestId('todo-count');
    await expect(page.getByTestId('todo-title')).toHaveText(['First task', 'Second task']);
    await expect(todoCount).toHaveText('2 items left');

    // Check First task.
    await todoCheckboxes.nth(0).click();
    await expect(todoCheckboxes.nth(0)).toBeChecked();
    await expect(todoCheckboxes.nth(1)).not.toBeChecked();
    await expect(todoCount).toHaveText('1 item left');

    // Uncheck First task.
    await todoCheckboxes.nth(0).click();
    await expect(todoCheckboxes.nth(0)).not.toBeChecked();
    await expect(todoCount).toHaveText('2 items left');

    // Click Mark all as complete.
    await page.getByRole('checkbox', { name: '❯Mark all as complete' }).click();
    await expect(todoCheckboxes).toHaveCount(2);
    await expect(todoCheckboxes.nth(0)).toBeChecked();
    await expect(todoCheckboxes.nth(1)).toBeChecked();
    await expect(todoCount).toHaveText('0 items left');
    await expect(todoItems).toHaveCount(2);
  });
});
