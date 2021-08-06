# Remind Me
An inventory and shopping list to keep track of what to buy and what is expiring.

- [Ionic Mobile App](https://github.com/tiffanyolw/remindme-app)
- [Node.js Server](https://github.com/tiffanyolw/remindme-server)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Important
- No actual authentication implemented; log in only to separate the data between the different users
    - Can easily add/change values in the local storage
    - Can also call backend with any user and manipulate data without being logged in

## Contents
- [Functionality](_Docs/functionality.md)
- [Backlog](_Docs/backlog.md)

## Steps to run
1. `npm install` to install dependencies.
2. Follow the steps to run the [server](https://github.com/tiffanyolw/remindme-server).
3. Update `environment.ts` and `environment.prod.ts` in the `environments` folder if needed
4. `ng serve -o`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Technology
- Angular using Bootstrap

## For future Reference
Using ng-bootstrap: https://ng-bootstrap.github.io/#/getting-started
```
npm install bootstrap
ng add @ng-bootstrap/ng-bootstrap
```

Global Events: https://stackoverflow.com/questions/34700438/global-events-in-angular
