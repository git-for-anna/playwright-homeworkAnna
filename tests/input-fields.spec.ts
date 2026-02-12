import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Update pet type', async ({page}) => {

    // 1.Select the PET TYPES menu item in the navigation bar
    await page.getByRole('link', { name: 'Pet Types' }).click()

    // 2.Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types')

    // 3. Click on "Edit" button for the "cat" pet type
    await (page.getByRole('button', { name: 'Edit' }).first()).click()

    // 4. Add assertion of the "Edit Pet Type" text displayed
    
    await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toHaveText('Edit Pet Type')

    // 5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    const nameField = page.locator('#name')

    await nameField.click()
    await nameField.clear()
    await nameField.fill('rabbit')
    await page.getByRole('button', {name: "Update"}).click()

    // 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    await expect(page.locator('[id="0"]')).toHaveValue('rabbit')
    
    // 7. Click on "Edit" button for the same "rabbit" pet type
    await (page.getByRole('button', { name: 'Edit' }).first()).click()
    await expect (page.getByRole('heading', { name: 'Edit Pet Type' })).toHaveText('Edit Pet Type')

    //  8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await nameField.click()
    await nameField.clear()
    await nameField.fill('cat')
    await page.getByRole('button', {name: "Update"}).click()

    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    await expect(page.locator('[id="0"]')).toHaveValue('cat')



});

test('Cancel pet type update', async ({page}) => {

// 1. Select the PET TYPES menu item in the navigation bar
 await page.getByRole('link', { name: 'Pet Types' }).click()

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
 await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types')

// 3. Click on "Edit" button for the "dog" pet type
 await (page.getByRole('button', { name: 'Edit' }).nth(1)).click()

// 4. Type the new pet type name "moose"
const nameField = page.locator('#name')
 await nameField.click()
 await nameField.clear()
 await nameField.fill('moose')

// 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
 await expect(nameField).toHaveValue('moose')

// 6. Click on "Cancel" button
 await (page.getByRole('button', { name: 'Cancel' })).click()

// 7. Add the assertion the value "dog" is still displayed in the list of pet types
 await  expect(page.locator('[id="1"]')).toHaveValue('dog')

});


test('Validation of Pet type name is required', async ({page}) => {
// 1. Select the PET TYPES menu item in the navigation bar
await page.getByRole('link', { name: 'Pet Types' }).click()

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types')

// 3. Click on "Edit" button for the "lizard" pet type
await (page.getByRole('button', { name: 'Edit' }).nth(2)).click()

// 4. On the Edit Pet Type page, clear the input field
const nameField = page.locator('#name')
await nameField.click()
await nameField.clear()

// 5. Add the assertion for the "Name is required" message below the input field
await expect(page.getByText('Name is required')).toBeVisible()

// 6. Click on "Update" button
await (page.getByRole('button', { name: 'Update' })).click()

// 7. Add assertion that "Edit Pet Type" page is still displayed
await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toHaveText('Edit Pet Type')

// 8. Click on the "Cancel" button
await (page.getByRole('button', { name: 'Cancel' })).click()

// 9. Add assertion that "Pet Types" page is displayed
await expect (page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types')
});