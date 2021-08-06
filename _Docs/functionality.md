# Functionality (for testing)

## Landing Page
- Nav bar contains log in and sign up links

## Login
- Show error messages upon touch and not enter in fields
- Log in button disabled until all valid inputs
- Sign up link takes user to register page
- On successful login, redirect to inventory
- Error message if could not log in

## Register
- Show error messages upon touch and not enter in fields
- Sign up button disabled until all valid inputs entered
- Log in link takes user to login page
- Show error message if the passwords do not match
- Show error message if could not register
    - Same email not allowed
- On successful register, show success message with log in link
- Fields are cleared only after successfully creating an account

## All pages except login, register, and landing page
- Redirect back to log in page if not logged in
- Only contain information for the currently logged in user
- Nav bar contains log out link and inventory, history, shopping cart, and settings link

## Inventory
- Shows list of all products that have not been consumed/trashed
- Add Product button to add a product
- Edit to edit the particular product
- Delete to delete the product
- Show alert when could not load products
- Show alert when could not delete product

### Add Product
- Name, quantity, unit, category, location are required
- Add button disabled if all required fields not filled in
- On successful add, redirect back to Inventory page
- If could not load categories, units, locations, show alert
- If could not add, show alert

### Edit Product
- Prefills form with current information
- Name, quantity, unit, category, location are required
- Update button disabled if all required fields not filled in
- On successful update, redirect back to Inventory page
- If could not load categories, units, locations, show alert
- If could not update, show alert