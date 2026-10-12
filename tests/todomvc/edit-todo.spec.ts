import { test, expect } from '@playwright/test';

test.describe('Todo lifecycle and input validation', () => {
  test('Edit a todo by double-clicking its title', async ({ page }) => {
    // Start empty, add Draft title, and double-click the title.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('Draft title');
    await newTodo.press('Enter');
    await page.getByTestId('todo-title').dblclick();
    const editor = page.getByRole('textbox', { name: 'Edit' });
    await expect(editor).toHaveValue('Draft title');

    // Replace the title with Updated title and press Enter.
    await editor.fill('Updated title');
    await editor.press('Enter');

    await expect(editor).toHaveCount(0);
    await expect(page.getByTestId('todo-title')).toHaveText(['Updated title']);
    await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).not.toBeChecked();
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
  });
});
