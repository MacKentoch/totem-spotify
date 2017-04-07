# Totem spotify

This application uses spotify API through NodeJS-express backend. Front is React + Redux.

*Accent is put into code structure in both server and front app.*

**Content summary:**

*front:*
- ReactJS
- react-router
- redux
- bootstrap
- react-bootstrap

*back:*
- NodesJS
- express js

*toolchain:*
- npm (or yarn)
- webpack
- react-hot-reload
- nodemon

## prerequisite

This application was build with:

### NodeJS version

```bash
node -v
```

> v6.9.1

### npm version

```bash
npm -v
```

> 4.4.4

### yarn version

```bash
yarn --version
```

> 0.22.0


## install

```bash
yarn install
```

or

```bash
npm install
```

## fast launch

**Launch server:**
```bash
npm run serve-prod
```

Then in your browser go
 > http://localhost:8080/

**If you want to see a more verbose server, dev one:**
```bash
npm run serve-dev
```

## build

### front bundle dev mode (+ redux-devtools)

```bash
npm run dev
```

### front bundle prod mode (+ redux-devtools)

```bash
npm run prod
```

### back dev mode (+ nodemon)

```bash
npm run serve-dev
```

### back prod mode

```bash
npm run serve-prod
```
