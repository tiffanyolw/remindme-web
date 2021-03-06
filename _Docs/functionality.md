# Functionality (for testing)

## Landing Page ("/")
- Nav bar contains log in and sign up links if note logged in
- Redirects to Log In page if not logged in, redirects to Inventory page if logged in

## Login
- Show error messages upon touch and not enter in fields
- Log in button disabled until all valid inputs
- Sign up link takes user to register page
- On successful login, redirect to inventory
- Error message if could not log in

<img src="screenshots/account/login.PNG" height="300">

## Register
- Show error messages upon touch and not enter in fields
- Sign up button disabled until all valid inputs entered
- Log in link takes user to login page
- Show error message if the passwords do not match
- Show error message if could not register
    - Same email not allowed
- On successful register, show success message with log in link
- Fields are cleared only after successfully creating an account

<img src="screenshots/account/register.PNG" height="300">

## All pages except login, register, and landing page
- Redirect back to log in page if not logged in
- Only contain information for the currently logged in user
- Nav bar contains log out link and inventory, history, shopping cart, and settings link
- Title link redirects to inventory page

## Inventory
- Shows list of all products
- Dropdown with options to show all, expired, or unexpired products
- Able to filter by categories and locations, and order
- Add Product button to add a product
- Action button on each product shows 4 options
    - Consume or Trash shows a modal to consume/trash
    - Edit to edit the particular product
    - Delete to delete the product
- Show alert when could not load products
- Show alert when could not delete product

<img src="screenshots/inventory/inventory.PNG" height="300"> <img src="screenshots/inventory/filter.PNG" height="300"> <img src="screenshots/inventory/consume-product.PNG" height="300">

### Add Product
- Name, quantity, unit, category, location are required
- Add button disabled if all required fields not filled in
- Show error messages on required fields if touched and not filled in
- On successful add, redirect back to Inventory page
- If could not load categories, units, locations, show alert
- If could not add, show alert

<img src="screenshots/inventory/add-product.PNG" height="300">

### Edit Product
- Prefills form with current information
- Name, quantity, unit, category, location are required
- Update button disabled if all required fields not filled in
- On successful update, redirect back to Inventory page
- If could not load categories, units, locations, show alert
- If could not update, show alert

<img src="screenshots/inventory/edit-product.PNG" height="300">

## History
- List of all consumed/trashed products
- Able to filter by categories and locations, and order
- Action button
    - View to view product details
    - Delete to delete product

<img src="screenshots/history/history.PNG" height="300">

### View Product
- Header contains product name
- Done button to go back to history page

<img src="screenshots/history/view-product.PNG" height="300">

## Shopping List
- Shows list of items
- Dropdown with options to show to buy items or cleared items
- Able to filter by categories, and order
- Add Item button to add a product
- Checkbox only on To Buy list and indicates the item is bought or not
- Action button on each product shows 2 options
    - Edit to edit the particular item
    - Delete to delete the product
- Clear button only shown on To Buy list to clear the to buy list

<img src="screenshots/shopping-list/shopping-list.PNG" height="300"> <img src="screenshots/shopping-list/archive.PNG" height="300">

### Add Item
- Only name and category required
- Category is No Category by default
- Add button disabled until all required fields are filled and valid
- Show error messages on required fields if touched and not filled in

<img src="screenshots/shopping-list/add-item.PNG" height="300">

### Edit Item
- Prefills form with current information
- Name and category are required
- Update button disabled if all required fields not filled in
- On successful update, redirect back to Inventory page

<img src="screenshots/shopping-list/edit-item.PNG" height="300">

## Account Settings
- Pre-filled with current user information, except password
- Update buttons disabled if fields not filled in or invalid
- Update password unsuccessful if current password is incorrect

<img src="screenshots/account/settings.PNG" height="300">

## Log Out
- Log out current user and redirects to log in page
