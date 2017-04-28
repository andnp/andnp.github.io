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
define("website/components/content-container", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Component.extend({
        size: 70,
        style: ""
    });
});
define('website/components/project-square', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
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

  Router.map(function () {
    this.route('about');
    this.route('home');
    this.route('cv');
    this.route('projects');
    this.route('blog');
  });

  Router.reopen({
    location: 'hash'
  });

  exports['default'] = Router;
});
define('website/routes/about', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('website/routes/blog', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('website/routes/cv', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('website/routes/home', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('website/routes/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        beforeModel: function beforeModel() {
            this.replaceWith('home');
        }
    });
});
define('website/routes/projects', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('website/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("website/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "KVxJhhsN", "block": "{\"statements\":[[\"block\",[\"content-container\"],null,[[\"size\"],[80]],0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Who Am I\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Work\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"I am a software engineer at heart. After a couple of years working on personal projects that end in unmanagably mangled code, I began improving my engineering skills. I now focus on making a working product quickly, then considering ways to optimize and generalize. Redundant code terrifies me, and as such I avoid repeating work unnecessarily.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"I focus on building modularized libraries. In the spirit of avoiding code duplication, I try to make my code as generic as possible. I also recognize that eventually I will learn more about my system, improve my programming skills, and refine the problem that I am attempting to solve. In recognition of these, modular code allows me to replace chunks of code while maintaining a working system. To me, consistent and meaningful APIs are a necessity to ever-changing codebases to allow for easy modularity, extensibility, and maintenance.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Research\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"My focus on Machine Learning is driven by my desire to understand a human's ability to learn. Education is the most unifying factor for long-term equality, and a perfect understand on human learning means a perfect ability to educate the world's population. I believe that there are many latent factors influencing learning, and would love to focus on the study of Statistical Machine Learning to analyse and discover these latent factors.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"I always have preferred the theoretical side of Machine Learning over the applications, but I know that one cannot exist without the other. Most of my research is focused on the theory behind Machine Learning algorithms, where my personal projects focus on their applications. I spend quite a lot of time pacing in front of my white board or reading research papers.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Home\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"I sing. All the time. I'm sure my roommates love it, but I've always been afraid to ask. I enjoy making music, and use the guitar, piano, and ukelele as ways to relax when I'm stressed. I particularly enjoy playing jazz guitar, contemporary piano, and happy ukelele music (can the ukelele play anything other than happy music?).\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"I'm getting married quite soon. My partner and I love discussing statistics and psychology at depth. We also enjoy playing card and board games, and I am forever attempting to teach her the joys of hard board games.\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/about.hbs" } });
});
define("website/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cmXnNVN4", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"header-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Andrew\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"off\"],[\"flush-element\"],[\"text\",\"Patterson\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"    \\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"menu\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"home\"],[[\"class\"],[\"menuitem\"]],3],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"about\"],[[\"class\"],[\"menuitem\"]],2],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"method\",\"get\"],[\"static-attr\",\"action\",\"cv.pdf\"],[\"flush-element\"],[\"text\",\"\\n                \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"menubutton clearbutton\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"CV\"],[\"close-element\"],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"projects\"],[[\"class\"],[\"menuitem\"]],1],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"blog\"],[[\"class\"],[\"menuitem\"]],0],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Blog\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Projects\"]],\"locals\":[]},{\"statements\":[[\"text\",\"About\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/application.hbs" } });
});
define("website/templates/blog", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gVknPqbp", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/blog.hbs" } });
});
define("website/templates/components/content-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LEiY+Ag6", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content\"],[\"dynamic-attr\",\"style\",[\"concat\",[\"width: \",[\"unknown\",[\"size\"]],\"%; \",[\"unknown\",[\"style\"]]]]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_top\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_container\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_main\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"yield\",\"default\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"content_bottom\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/components/content-container.hbs" } });
});
define("website/templates/components/project-square", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "25HG7JEv", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/components/project-square.hbs" } });
});
define("website/templates/cv", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "sULAZYWb", "block": "{\"statements\":[[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/cv.hbs" } });
});
define("website/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "JwuHNk0R", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu_top\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu_main\"],[\"flush-element\"],[\"text\",\"    \\n        \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"sidemenu-link\"],[\"static-attr\",\"href\",\"cv.pdf\"],[\"static-attr\",\"download\",\"cv.pdf\"],[\"flush-element\"],[\"text\",\"Download CV\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"sidemenu-link\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 2\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"sidemenu-link\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 3\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"class\",\"sidemenu-link\"],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Link 4\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"leftmenu_bottom\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"content-container\"],null,[[\"size\"],[60]],1],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"portrait-container\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"portrait\"],[\"static-attr\",\"src\",\"portrait.jpg\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"content-container\"],null,[[\"size\",\"style\"],[23,\"float:right\"]],0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"About me\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"I enjoy working on personal projects. My focus tends to be on automation of menial tasks. I recently built an aquarium filter using neural networks to predict water levels and temperatures over time. I also use machine learning to build bots to play MMO games.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"In a previous life, I spent all of my time in my recording studio. Though most of my musical projects will forever remain private, my love for professional audio shapes my perspective for future work.\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Research\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Machine Learning\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"My current research focus is in Reinforcement Learning and Representation Learning. I am specifically interested in the integration of these two fields. Modern machine learning research has been dominated by deep learning, but the mentality of increasing the number of parameters to improve performance is not going to continue being computationally tractable. It is important to find more meaningful representations to allow use of lower free-parameter models to preserve computational tractability.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"Supervised Autoencoders and Supervised Dictionary Learning for representation learning.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\" Can the incorporation of the reconstructive loss improve the generalization of supervised learning algorithms, and can the inclusion of the predictive loss improve the discriminability of the reconstruction of unsupervised algorithms?\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"text\",\"General Value Functions for predictive knowledge\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"By learning generalized value functions from the Reinforcement Learning domain, can we create useful predictive representations? We specify interesting questions by altering the \"],[\"open-element\",\"emph\",[]],[\"flush-element\"],[\"text\",\"gamma\"],[\"close-element\"],[\"text\",\" returns, the \"],[\"open-element\",\"emph\",[]],[\"flush-element\"],[\"text\",\"policy\"],[\"close-element\"],[\"text\",\", and the \"],[\"open-element\",\"emph\",[]],[\"flush-element\"],[\"text\",\"rewards\"],[\"close-element\"],[\"text\",\" for each GVF. We show that by using Temporal-Difference learning methods, we can make one-step predictions answering the specified questions. These questions could be myopic questions (questions specifying the immediate next observation following some policy), horizon questions (observation in some number of steps following some policy), or termination questions (observation after some event following a policy).\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Neuroscience\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"My current work involves the analysis of diffusion data. I am assisting in the development of an open-source data warehouse for diffusion data derivatives (o3d). I develop data analysis pipelines for rotating neuro-images, fasicle extraction, and tract classification.\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/home.hbs" } });
});
define("website/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2F2uD+zm", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/index.hbs" } });
});
define("website/templates/projects", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "abVDzeLz", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "website/templates/projects.hbs" } });
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
  require("website/app")["default"].create({"name":"website","version":"0.0.0+08510c64"});
}
//# sourceMappingURL=website.map
