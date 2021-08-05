# Functionality (for testing)

# Landing Page
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