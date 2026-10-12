import { test, expect } from '@playwright/test';

test.describe('Todo lifecycle and input validation', () => {
  test('Add one or more todos', async ({ page }) => {
    // Start with an empty TodoMVC list. Enter Buy groceries and submit with Enter.
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    await newTodo.fill('Buy groceries');
    await newTodo.press('Enter');

    const todoTitles = page.getByTestId('todo-title');
    await expect(todoTitles).toHaveText(['Buy groceries']);
    await expect(newTodo).toHaveValue('');
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');

    // Enter Walk the dog and submit with Enter.
    await newTodo.fill('Walk the dog');
    await newTodo.press('Enter');

    await expect(todoTitles).toHaveText(['Buy groceries', 'Walk the dog']);
    await expect(page.getByTestId('todo-count')).toHaveText('2 items left');
  });
});
