'use strict';

define('website/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'app.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
define('website/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('website/tests/helpers/destroy-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/destroy-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/destroy-app.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
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
define('website/tests/helpers/module-for-acceptance.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/module-for-acceptance.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/module-for-acceptance.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
define('website/tests/helpers/resolver', ['exports', 'website/resolver', 'website/config/environment'], function (exports, _websiteResolver, _websiteConfigEnvironment) {

  var resolver = _websiteResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _websiteConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _websiteConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('website/tests/helpers/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/resolver.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
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
define('website/tests/helpers/start-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/start-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/start-app.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
define('website/tests/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'resolver.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
define('website/tests/router.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - router.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
define('website/tests/test-helper', ['exports', 'website/tests/helpers/resolver', 'ember-qunit'], function (exports, _websiteTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_websiteTestsHelpersResolver['default']);
});
define('website/tests/test-helper.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - test-helper.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'test-helper.js should pass ESLint.\n1:1  - Parsing error: The keyword \'import\' is reserved (null)');
  });
});
require('website/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
