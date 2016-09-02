var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');

var ShInputCurrency = require('./sh-input-currency').default;

describe('root', function () {
    it('renders without problems', function () {
        let value = true;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value}/>);
        expect(root.state).toBeTruthy();
    });

    it('things do No explode if there is no onChange function', function() {
        let value = true;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} />);
        root.handleChange({
            target: {
                value: 3
            }
        });
    });
    it('things do No explode if there is no onFocus function', function() {
        let value = true;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} />);
        root.handleFocus({
            target: {
                value: 3
            }
        });
    });

    it('works with on change, initial state and formats currency with dollar', function () {
        let what = '0';
        let changeMe = () => {
            value = 1;
        };
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={what} onChange={changeMe}/>);
        let rootNode = ReactDOM.findDOMNode(root);
        expect(root.state).toBeTruthy();
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        expect(input.value).toBe('$0.00');
    });

    it('works a field is required', function () {
        let what = '0';
        let changeMe = () => {
            value = 1;
        };
        var root = TestUtils.renderIntoDocument(<ShInputCurrency required value={what} onChange={changeMe}/>);
        let rootNode = ReactDOM.findDOMNode(root);
        expect(root.state.requiredField.showRequired).toBeTruthy();
    });

    it('input styles be set to empty if there is no value', function () {
        var root = TestUtils.renderIntoDocument(<ShInputCurrency  />);
        let rootNode = ReactDOM.findDOMNode(root);
        expect(root.state).toBeTruthy();
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        TestUtils.Simulate.blur(input);
        expect(rootNode.classList[1]).toBe('empty')
    });

    it('input styles not be set to empty if there is a value', function () {
        let value = '0';
        let changeMe = () => {
            value = 1;
        };
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} onChange={changeMe}/>);
        let rootNode = ReactDOM.findDOMNode(root);
        expect(root.state).toBeTruthy();
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        TestUtils.Simulate.blur(input);
        expect(rootNode.classList.length).toBe(1)
    });

    it('handle having outside onBlur', function () {
        let value = '0';
        let blurTest = 0;
        let onBlur = ()=> {
            blurTest = 1;
        };

        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} onBlur={onBlur}/>);
        expect(root.state).toBeTruthy();
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        TestUtils.Simulate.blur(input);
        expect(blurTest).toBe(1)
    });

    it('handle having outside onFocus', function () {
        let value = '0';
        let focusTest = 0;
        let onFocus = ()=> {
            focusTest = 1;
        };

        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} onFocus={onFocus}/>);
        expect(root.state).toBeTruthy();
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        TestUtils.Simulate.focus(input);
        expect(focusTest).toBe(1)
    });

    it('handle internal changes, then format text to a currency', function () {
        let value = '0';
        let changeMe = () => {
            value = 1;
        };
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} onChange={changeMe}/>);
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');

        root.handleChange({
            target: {
                value: 3
            }
        });

        expect(value).toBe(1);
        expect(input.value).toBe('3');
        TestUtils.Simulate.blur(input);
        expect(input.value).toBe('$3.00');
    });
});
