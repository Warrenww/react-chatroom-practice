This project is for the purposes of practice the react with the socket

## Install
Use `npm install` to install all dependencies.
This app is created by `npx created-react-app`.
This app also use the [Material UI](https://material-ui.com/) package to handle all the UI.

## Usage
Run the command `npm run server` to open the server at 8000 port
Run the command `npm run client` to open the client render server at 3000 port

In `package.json` there set a proxy to proxy `io.connect()` of socket from port 3000 to port 8000.
So there is no need to explicitly set the connect parameter in `io.connect()`.
Make the code is useable both in development and production.

## Implementation
* a fake user register and login
* a setting page render base on login state
* a useless index page

## ToDo
* chat room
* multiple user chat rooms
* create chat room group
