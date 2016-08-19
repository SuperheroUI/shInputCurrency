
var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');

var ShInputCheckbox = require('./sh-input-currency').default;

describe('root', function() {
  it('renders without problems', function() {
    let value = true;
    var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} />);
    expect(root.state).toBeTruthy();
  });
});
