# rfiv-ui

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This code implements the user interface for the RFIV tracking app. The React components we created are located at [src/components](src/components). The routing between different pages of the app is handled by [src/App.js](src/App.js).

## Setup

`Note`: Node.js is required to run this code. Download it at https://nodejs.org/en/.

In the project directory, run the following commands in the terminal:

### `npm install`

Installs the necessary packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Interaction with the Server

This code serves as the frontend for the RFIV tracking app. The server logic that handles database transactions is located in the [rfiv-server repository](https://github.com/ManeuverOn/rfiv-server). Both `rfiv-ui` and `rfiv-server` must be running for the whole application to work.