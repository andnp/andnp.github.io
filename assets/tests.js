'use strict';

define('website/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('components/content-container.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/content-container.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('components/dataset-square.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/dataset-square.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('components/modal-window.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/modal-window.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('components/project-square.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/project-square.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'resolver.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/about.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('routes/blog.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/blog.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('routes/cv.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/cv.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('routes/datasets.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/datasets.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('routes/home.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/home.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('routes/projects.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/projects.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
define('website/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('website/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'website/tests/helpers/start-app', 'website/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _websiteTestsHelpersStartApp, _websiteTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _websiteTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _websiteTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('website/tests/helpers/resolver', ['exports', 'website/resolver', 'website/config/environment'], function (exports, _websiteResolver, _websiteConfigEnvironment) {

  var resolver = _websiteResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _websiteConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _websiteConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('website/tests/helpers/start-app', ['exports', 'ember', 'website/app', 'website/config/environment'], function (exports, _ember, _websiteApp, _websiteConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _websiteConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _websiteApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('website/tests/integration/components/content-container-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('content-container', 'Integration | Component | content container', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'CbRvi1R9',
      'block': '{"statements":[["append",["unknown",["content-container"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'RvP0kvQh',
      'block': '{"statements":[["text","\\n"],["block",["content-container"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('website/tests/integration/components/dataset-square-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('dataset-square', 'Integration | Component | dataset square', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '3sTS50D8',
      'block': '{"statements":[["append",["unknown",["dataset-square"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'VyVdUphB',
      'block': '{"statements":[["text","\\n"],["block",["dataset-square"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('website/tests/integration/components/modal-window-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('modal-window', 'Integration | Component | modal window', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'WYIjlv9G',
      'block': '{"statements":[["append",["unknown",["modal-window"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'ulcuO/QR',
      'block': '{"statements":[["text","\\n"],["block",["modal-window"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('website/tests/integration/components/project-square-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('project-square', 'Integration | Component | project square', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'lDUwuqUz',
      'block': '{"statements":[["append",["unknown",["project-square"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': '1UXpGVQy',
      'block': '{"statements":[["text","\\n"],["block",["project-square"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('website/tests/test-helper', ['exports', 'website/tests/helpers/resolver', 'ember-qunit'], function (exports, _websiteTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_websiteTestsHelpersResolver['default']);
});
define('website/tests/tests.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/destroy-app.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/module-for-acceptance.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/resolver.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/start-app.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('integration/components/content-container-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/components/content-container-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('integration/components/dataset-square-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/components/dataset-square-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('integration/components/modal-window-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/components/modal-window-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('integration/components/project-square-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'integration/components/project-square-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'test-helper.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('unit/routes/about-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/routes/about-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('unit/routes/blog-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/routes/blog-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('unit/routes/cv-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/routes/cv-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('unit/routes/datasets-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/routes/datasets-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('unit/routes/home-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/routes/home-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/routes/index-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });

  QUnit.test('unit/routes/projects-test.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/routes/projects-test.js should pass ESLint\n\n1:1 - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
define('website/tests/unit/routes/about-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('website/tests/unit/routes/blog-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:blog', 'Unit | Route | blog', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('website/tests/unit/routes/cv-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:cv', 'Unit | Route | cv', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('website/tests/unit/routes/datasets-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:datasets', 'Unit | Route | datasets', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('website/tests/unit/routes/home-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:home', 'Unit | Route | home', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('website/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('website/tests/unit/routes/projects-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:projects', 'Unit | Route | projects', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('website/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
