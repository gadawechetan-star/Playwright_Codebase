# TodoMVC Functional Test Plan

## Application Overview

Validate the TodoMVC demo at https://demo.playwright.dev/todomvc across todo creation, completion, editing, deletion, clearing completed items, filtering, remaining-item counts, input edge cases, and persistence after reload. Each test starts from a blank/fresh application state using the supplied seed file (tests/seed.spec.ts) and runs independently.

## Test Scenarios

### 1. Todo lifecycle and input validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add one or more todos

**File:** `tests/todomvc/add-todos.spec.ts`

**Steps:**
  1. Start with an empty TodoMVC list. Enter “Buy groceries” in the textbox labeled “What needs to be done?” and press Enter.
    - expect: A todo labeled “Buy groceries” appears in the list as active.
    - expect: The entry textbox is cleared.
    - expect: The remaining-items counter displays “1 item left”.
  2. Enter “Walk the dog” in the entry textbox and press Enter.
    - expect: Both todos appear in the list in creation order.
    - expect: The counter displays “2 items left”.

#### 1.2. Do not add empty or whitespace-only todos

**File:** `tests/todomvc/empty-and-whitespace-input.spec.ts`

**Steps:**
  1. Start with an empty list. Leave the entry textbox empty and press Enter.
    - expect: No todo is created.
    - expect: The list, remaining-items counter, filter controls, and clear-completed action do not appear while the list is empty.
  2. Fill the entry textbox with spaces only and press Enter.
    - expect: No todo is created and the list remains empty.
    - expect: The entry textbox is cleared or otherwise remains usable for the next entry.

#### 1.3. Add a very long todo without truncation

**File:** `tests/todomvc/long-todo-text.spec.ts`

**Steps:**
  1. Start with an empty list. Enter a distinctive 500-character string as the todo title and press Enter.
    - expect: Exactly one todo is created.
    - expect: The rendered todo title matches the full submitted string, including its beginning and ending; no text is truncated or corrupted.
    - expect: The counter displays “1 item left”.

#### 1.4. Mark todos complete and validate the remaining-items counter

**File:** `tests/todomvc/complete-todos-and-counter.spec.ts`

**Steps:**
  1. Start with an empty list and add “First task” and “Second task”.
    - expect: Both items are active and the counter displays “2 items left”.
  2. Click the checkbox for “First task”.
    - expect: “First task” is visibly completed and its checkbox is checked.
    - expect: “Second task” remains active.
    - expect: The counter decreases to “1 item left”.
  3. Click the checkbox for “First task” again.
    - expect: “First task” returns to the active state.
    - expect: The counter returns to “2 items left”.
  4. Click the “Mark all as complete” checkbox.
    - expect: Both todos are completed.
    - expect: The remaining-items counter displays “0 items left”.

#### 1.5. Edit a todo by double-clicking its title

**File:** `tests/todomvc/edit-todo.spec.ts`

**Steps:**
  1. Start with an empty list and add “Draft title”. Double-click the todo title.
    - expect: An inline textbox labeled “Edit” appears and contains the existing title.
  2. Replace the title with “Updated title” and press Enter.
    - expect: The inline editor closes.
    - expect: The todo is displayed as “Updated title” and remains active.
    - expect: The remaining-items counter remains “1 item left”.

#### 1.6. Delete a todo

**File:** `tests/todomvc/delete-todo.spec.ts`

**Steps:**
  1. Start with an empty list and add “Keep this” and “Remove this”.
    - expect: Two todos appear and the counter displays “2 items left”.
  2. Reveal and click the Delete control for “Remove this”.
    - expect: “Remove this” is removed from the list while “Keep this” remains.
    - expect: The counter decreases to “1 item left”.
  3. Delete “Keep this”.
    - expect: The list becomes empty and list/footer controls are no longer displayed.

#### 1.7. Clear completed todos without removing active todos

**File:** `tests/todomvc/clear-completed.spec.ts`

**Steps:**
  1. Start with an empty list. Add “Active task”, “Completed task one”, and “Completed task two”.
    - expect: All three todos appear and the counter displays “3 items left”.
  2. Mark both completed-task items complete.
    - expect: The two selected todos show completed state and the counter displays “1 item left”.
    - expect: A “Clear completed” button is available.
  3. Click “Clear completed”.
    - expect: Both completed todos are removed.
    - expect: “Active task” remains active and the counter displays “1 item left”.
    - expect: The clear-completed action is no longer available when no completed items remain.

### 2. Filters and persistence

**Seed:** `tests/seed.spec.ts`

#### 2.1. Filter todos with All, Active, and Completed views

**File:** `tests/todomvc/filters.spec.ts`

**Steps:**
  1. Start with an empty list. Add “Active task” and “Completed task”, then mark “Completed task” complete.
    - expect: Both todos are shown in the All view.
    - expect: The counter displays “1 item left”.
  2. Select the Active filter.
    - expect: Only “Active task” is shown.
    - expect: The counter still reflects the active todo count: “1 item left”.
  3. Select the Completed filter.
    - expect: Only “Completed task” is shown and it remains marked complete.
    - expect: The counter displays “1 item left” because it counts active items, not visible completed items.
  4. Select the All filter.
    - expect: Both todos are shown again with their respective active/completed states unchanged.
    - expect: The counter displays “1 item left”.

#### 2.2. Persist todos and completion state after page reload

**File:** `tests/todomvc/persistence-after-reload.spec.ts`

**Steps:**
  1. Start with an empty list. Add “Still active” and “Still completed”, then mark “Still completed” complete.
    - expect: Both todos are shown in the All view with the correct states.
    - expect: The counter displays “1 item left”.
  2. Reload the page.
    - expect: Both todos remain after reload.
    - expect: “Still active” remains active and “Still completed” remains completed.
    - expect: The counter displays “1 item left”.
  3. Select the Active filter and then the Completed filter.
    - expect: The Active view contains “Still active” only.
    - expect: The Completed view contains “Still completed” only.
  4. Return to All and reload once more.
    - expect: The All view restores both todos with completion states intact.
