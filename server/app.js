const fs = require('fs'),
      path = require('path');

const express = require('express'),
      compression = require('compression'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      app = express();

const pkg = require('../package.json'),
      isDev = process.env.NODE_ENV !== 'production';

// React and Redux.
const React = require('react'),
      ReactDOMServer = require('react-dom/server'),
      { StaticRouter } = require('react-router')
      App = isDev ? null : require('./libs/App').default,
      { createStore, applyMiddleware } = require('redux'), // server side redux
      thunkMiddleware = require('redux-thunk').default,
      { Provider } = require('react-redux'),
      store = isDev ? null : createStore(require('./libs/reducers').default, pkg.cfg.initialState, applyMiddleware(thunkMiddleware));

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
}

app.use(compression());
app.use(favicon(path.resolve(__dirname, '../assets', 'favicon.ico')));
app.use('/', express.static(path.resolve(__dirname, '../assets')));
app.use('/', express.static(path.resolve(__dirname, '../dist')));
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
    res.writeHead(301, {
      Location: context.url
   });
   res.end();
  }
});

if (module == require.main) {
  const port = process.env.PORT || '3000';
  app.listen(port, () => console.log('Listening on port', port));
}
else
  module.exports = app;
