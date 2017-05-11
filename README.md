React-Startup Project
=====================

Most of the React startup projects are either too simple or away too complicate.  If you also feel the same, perhaps you can check out my React startup project.

The main different from the other React startup projects is the server side.  For some reasons I don't like to use babel-node to run the server side code. I use Webpack to compile the JSX when it is needed.

I used to use Bootstrap CSS for my applications, but for some reasons I decided not to.  Therefore, I created my own NavBar component (it is Font Awesome ready).  Although I didn't include the Bootstrap nor Font Awesome in the project, it is very easy to add those libraries if you ever need them.  My goal is try not to over complicate the project.

The other thing that I would like to point out is I didn't use jQuery in the project at all.  This is one of the reasons why I decided not to use Bootstrap any more.  Anyway, using jQuery defects the purpose of React.

## Features:
- React Isomorphic (universal) Single Page Application
- ES6 Javascript
- Webpack 2 + Express (https)
- React Router 4 (dynamic component)
- Lazy load components
- Hot reload across browsers in multiple devices at the same time
- Redux (async actions)
- REST API
- Sass (style)
- No jQuery
- Server/Client Unit Testing (Karma Mocha Chai Sinon react-dom/test-utils)

## Installation
```bash
git clone https://github.com/taichi-master/react-startup.git <<your new project name>>
cd <<your new project name>>
git remote set-url origin <<your own git repository>>
```
Either
```bash
yarn install
```
or
```bash
npm install
```

## Running in development
```bash
npm run dev
```

## Build/Dist. project
```bash
npm run build
```
or
```bash
npm run dist
```

## Running in production
```bash
npm start
```
p.s. Before running the project in production for the first time or made some changes to the project, you would need to either build or dist the project first.

License:
-------
ISC &copy; 2017 Kei Sing Wong
