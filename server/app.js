const fs = require('fs'),
      path = require('path');

const express = require('express'),
      compression = require('compression'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      app = express();

const pkg = require('../package.json'),
      initialState = {value:'init'},
      built = {
        'main.css': 'main.css',
        'manifest.js': 'manifest.js',
        'vendor.js': 'vendor.js',
        'main.js': 'main.js'
      },
      isDev = process.env.NODE_ENV !== 'production';

// React and Redux.
const React = require('react'),
      ReactDOMServer = require('react-dom/server'),
      { StaticRouter } = require('react-router')
      App = isDev ? null : require('./libs/App').default,
      { createStore, applyMiddleware } = require('redux'), // server side redux
      thunkMiddleware = require('redux-thunk').default,
      { Provider } = require('react-redux'),
      store = isDev ? null : createStore(require('./libs/reducers').default, initialState, applyMiddleware(thunkMiddleware));

if (isDev) {
  try {
    // Hot reload
    const webpack = require('webpack'),
          webpackDevMiddleware = require('webpack-dev-middleware'),
          webpackHotMiddleware = require('webpack-hot-middleware');
          config = require('../webpack.development.config.js')();
          compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      noInfo: true,
      stats: {colors: true}
    }));

    app.use(webpackHotMiddleware(compiler, {
      log: console.log
    }));
  } catch (err) {
    console.error(err);
  }
} else {
  const manifest = require('../build/manifest.json');
  Object.keys(built).forEach(k => built[k] = manifest[k]);
}

app.use(compression());
app.use(favicon(path.resolve(__dirname, '../assets', 'favicon.ico')));
app.use('/', express.static(path.resolve(__dirname, '../assets')));
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// REST API
app.use('/api/features', require('./api/features'));

// main
app.get('*', function (req, res) {
  const context = {};
  const appHtml = isDev ? '<h1>Loading...</h1>' : ReactDOMServer.renderToString(
    React.createElement(Provider, {store},
      React.createElement(StaticRouter, {location:req.url, context},
        React.createElement(App)
      )
    )
  );
  if (context.url) {
    console.log('context', context.url);
    res.writeHead(301, {
      Location: context.url
   });
   res.end();
  } else {
    res.send(createPage(pkg, isDev ? '' : `<link rel="stylesheet" href="/${built['main.css']}" />`, initialState, appHtml));
  }
});

function createPage(pkg, style, initialState, appHtml) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${pkg.name}</title>
        <meta charset="UTF-8">
        <meta name="description" content="${pkg.description}">
        <meta name="keywords" content="${pkg.keywords.join(', ')}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${style}
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script src="/${built['manifest.js']}"></script>
        <script src="/${built['vendor.js']}"></script>
        <script src="/${built['main.js']}"></script>
      </body>
    </html>
  `
}

if (module == require.main) {
  const port = process.env.PORT || '3000';
  app.listen(port, () => console.log('Listening on port', port));
}
else
  module.exports = app;
