"use strict";



define('website/app', ['exports', 'ember', 'website/resolver', 'ember-load-initializers', 'website/config/environment'], function (exports, _ember, _websiteResolver, _emberLoadInitializers, _websiteConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _websiteConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _websiteConfigEnvironment['default'].podModulePrefix,
    Resolver: _websiteResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _websiteConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('website/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define('website/helpers/app-version', ['exports', 'ember', 'website/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _websiteConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _websiteConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('website/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('website/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('website/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'website/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _websiteConfigEnvironment) {
  var _config$APP = _websiteConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('website/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('website/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('website/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('website/initializers/export-application-global', ['exports', 'ember', 'website/config/environment'], function (exports, _ember, _websiteConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_websiteConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _websiteConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_websiteConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('website/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('website/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('website/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("website/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('website/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('website/router', ['exports', 'ember', 'website/config/environment'], function (exports, _ember, _websiteConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _websiteConfigEnvironment['default'].locationType,
    rootURL: _websiteConfigEnvironment['default'].rootURL
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('website/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("website/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "T/U0rgQ8", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"header-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Andrew\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"off\"],[\"flush-element\"],[\"text\",\"Patterson\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"    \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"menu\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"menuitem\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Home\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"menuitem\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"About\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"menuitem\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"CV\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"menuitem\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Projects\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"menuitem\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Blog\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"menuitem\"],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Contact\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu_top\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu_main\"],[\"flush-element\"],[\"text\",\"    \\n            \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Links\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 1\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 2\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 3\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 4\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 5\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 6\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 7\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 8\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 9\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu_bottom\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_top\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_container\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_main\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Some Title\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Template Notes\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"More information\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Another Thing\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_bottom\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/application.hbs" } });
});


define('website/config/environment', ['ember'], function(Ember) {
  var prefix = 'website';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("website/app")["default"].create({"name":"website","version":"0.0.0+e1d84701"});
}
//# sourceMappingURL=website.map
