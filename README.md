React-Starter Project
=====================

Most of the React starter projects are either too simple or way too complicated.  If you also feel the same, perhaps you should check out my React starter project.

The main different from the other React starter projects is the server side.  For some reasons I don't like to use babel-node to run the server. Since it is isomorphic, I use Webpack to compile the JSX when it is needed.

## Features:
- React 18 Isomorphic (universal) Single Page Application
- ESnext Javascript
- Webpack 5.xx + Express (https)
- React Router 6 (dynamic component)
- Lazy load components
- Hot reload across browsers in multiple devices at the same time
- Redux (async actions)
- REST API
- Sass
- No jQuery
- Server/Client Unit Testing (Mocha Mocha-Webpack Chai Sinon jsdom Enzyme)

## Installation
```bash
git clone https://github.com/taichi-master/react-starter.git <<your new project name>>
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

Update Package.json:
-------------------
```bash
npm install -g npm-check-updates
ncu -u
npm update
npm install
```

License:
-------
ISC &copy; 2022 Kei Sing Wong
