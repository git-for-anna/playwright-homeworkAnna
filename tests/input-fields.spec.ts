import { test, expect } from '@playwright/test';
import { endianness } from 'os';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Update pet type', async ({page}) => {

    // 1.Select the PET TYPES menu item in the navigation bar
    const petTypesMenu = page.getByRole('link', { name: 'Pet Types' })
    await petTypesMenu.click()

    // 2.Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    const headerPetTypes = page.getByRole('heading', { name: 'Pet Types' })
    expect(headerPetTypes).toContainText('Pet Types')

    // 3. Click on "Edit" button for the "cat" pet type
    const editButtonFirstName = page.getByRole('button', { name: 'Edit' }).first()
    await editButtonFirstName.click()

    // 4. Add assertion of the "Edit Pet Type" text displayed
    const headerEditPetType = page.getByRole('heading', { name: 'Edit Pet Type' })
    expect(headerEditPetType).toContainText('Edit Pet Type')

    // 5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    const nameField = page.locator('#name')
    const newPetTypeName = 'rabbit'
    const updateButton = page.getByRole('button', {name: "Update"})

    await nameField.click()
    await nameField.clear()
    await nameField.fill(newPetTypeName)
    await updateButton.click()

    // 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    const firstPetInAList = page.locator('[id="0"]')
    await expect(firstPetInAList).toHaveValue(newPetTypeName)
    
    // 7. Click on "Edit" button for the same "rabbit" pet type
    await editButtonFirstName.click()
    expect(headerEditPetType).toContainText('Edit Pet Type')

    //  8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
     const petTypeNameCat = 'cat'
    await nameField.click()
    await nameField.clear()
    await nameField.fill(petTypeNameCat)
    await updateButton.click()

    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    await expect(firstPetInAList).toHaveValue(petTypeNameCat)



});

test('Cancel pet type update', async ({page}) => {

// 1. Select the PET TYPES menu item in the navigation bar
 const petTypesMenu = page.getByRole('link', { name: 'Pet Types' })
await petTypesMenu.click()

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
 const headerPetTypes = page.getByRole('heading', { name: 'Pet Types' })
    expect(headerPetTypes).toContainText('Pet Types')


// 3. Click on "Edit" button for the "dog" pet type
const editButtonFirstName = page.getByRole('button', { name: 'Edit' }).nth(1)
   await editButtonFirstName.click()

// 4. Type the new pet type name "moose"
const nameField = page.locator('#name')
    const petTypeNameMoose = 'moose'
    await nameField.click()
    await nameField.clear()
    await nameField.pressSequentially(petTypeNameMoose)

// 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
  await expect(nameField).toHaveValue(petTypeNameMoose)

// 6. Click on "Cancel" button
const cancelButton = page.getByRole('button', { name: 'Cancel' })
await cancelButton.click()

// 7. Add the assertion the value "dog" is still displayed in the list of pet types
const originalSecondPetName = 'dog'
const dogPetInAList = page.locator('[id="1"]')
 await  expect(dogPetInAList).toHaveValue(originalSecondPetName)


});

test('Validation of Pet type name is required', async ({page}) => {
// 1. Select the PET TYPES menu item in the navigation bar
const petTypesMenu = page.getByRole('link', { name: 'Pet Types' })
await petTypesMenu.click()

// 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
const headerPetTypes = page.getByRole('heading', { name: 'Pet Types' })
await expect(headerPetTypes).toContainText('Pet Types')

// 3. Click on "Edit" button for the "lizard" pet type
const editButtonLizzard = page.getByRole('button', { name: 'Edit' }).nth(2)
await editButtonLizzard.click({timeout: 5000})

// 4. On the Edit Pet Type page, clear the input field
const nameField = page.locator('#name')
await nameField.click()
await nameField.clear()

// 5. Add the assertion for the "Name is required" message below the input field
const validationMessage = page.getByText('Name is required')
await expect(validationMessage).toBeVisible()

// 6. Click on "Update" button
const updateBttn = page.getByRole('button', { name: 'Update' })
await updateBttn.click()

// 7. Add assertion that "Edit Pet Type" page is still displayed
const headerEditPetType = page.getByRole('heading', { name: 'Edit Pet Type' })
await expect(headerEditPetType).toContainText('Edit Pet Type')

// 8. Click on the "Cancel" button
const cancelButton = page.getByRole('button', { name: 'Cancel' })
await cancelButton.click()

// 9. Add assertion that "Pet Types" page is displayed
    await expect(headerPetTypes).toContainText('Pet Types')
});