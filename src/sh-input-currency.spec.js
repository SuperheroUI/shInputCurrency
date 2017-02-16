import  React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import * as _ from 'lodash';

var ShInputCurrency = require('./sh-input-currency').default;

describe('root', function () {
    it('renders without problems', function () {
        let value = true;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value}/>);
        expect(root.state).toBeTruthy();
    });

    it('there is a default onChange function', function () {
        let value = true;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value}/>);
        root.handleChange({
            persist: _.noop,
            target: {
                value: 3
            }
        });
    });
    it('things do not explode if there is no onFocus function', function () {
        let value = true;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value}/>);
        root.handleFocus({
            persist: _.noop,
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
        expect(root.state).toBeTruthy();
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        expect(input.value).toBe('$0.00');
    });

    it('works a field is required', function () {
        var root = TestUtils.renderIntoDocument(<ShInputCurrency required/>);
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.blur(input);
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
        let value = 5;
        let changeMe = () => {
            value = 1;
        };
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} onChange={changeMe}/>);
        let rootNode = ReactDOM.findDOMNode(root);
        expect(root.state).toBeTruthy();
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');
        TestUtils.Simulate.blur(input);
        expect(rootNode.classList).not.toContain('empty')
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
            persist: _.noop,
            target: {
                value: 3,
            }
        });

        expect(value).toBe(1);
        expect(input.value).toBe('3');
        TestUtils.Simulate.blur(input);
        expect(input.value).toBe('$3.00');
    });

    it('handle internal changes, if a validator property exists', function () {
        let value = '0';
        let changeMe = () => {
            value = 1;
        };
        var validator = {
            validate: _.noop,
            register: _.noop
        };

        var root = TestUtils.renderIntoDocument(<ShInputCurrency validator={validator} value={value}
                                                                 onChange={changeMe}/>);
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');

        root.handleChange({
            persist: _.noop,
            target: {
                value: 3
            }
        });

        expect(value).toBe(1);
        expect(input.value).toBe('3');
        TestUtils.Simulate.blur(input);
        expect(input.value).toBe('$3.00');
    });

    it('values should still work if there is no on change on the component', function () {
        let value = '0';

        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value}/>);
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');

        root.handleChange({
            persist: _.noop,
            target: {
                value: 3

            }
        });

        expect(input.value).toBe('3');
        TestUtils.Simulate.blur(input);
        expect(input.value).toBe('$3.00');
    });

    it('if the form as been submitted all fields need to be touched', function () {
        var root = TestUtils.renderIntoDocument(<ShInputCurrency required/>);
        root.validate(true);
        expect(root.state.classList.shTouched).toBe(true);
    });

    it('a required field with no value should be invalid', function () {
        var root = TestUtils.renderIntoDocument(<ShInputCurrency required/>);
        expect(root.validate().isValid).toBe(false)
    });

    it('should be able to unmount a plane component', function () {
        let value = null;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} required/>);
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(root).parentNode);
    });

    it('should call unregister if a validator is present', function () {
        let value = null;
        let validator = {
            register: _.noop,
            unregister: _.noop,
        };
        spyOn(validator, 'unregister');
        var root = TestUtils.renderIntoDocument(<ShInputCurrency validator={validator} value={value} required/>);
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(root).parentNode);
        expect(validator.unregister).toHaveBeenCalled();
    });

    it('should have class names passed from parent', function () {
        let value = '0';

        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value}/>);
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');

        root.handleChange({
            persist: _.noop,
            target: {
                value: 3
            }
        });

        expect(input.value).toBe('3');
        TestUtils.Simulate.blur(input);
        expect(input.value).toBe('$3.00');
    });

    it('set classes from parent', function () {
        let value = '';
        var root = TestUtils.renderIntoDocument(<ShInputCurrency className="spam" value={value}/>);
        let rootNode = ReactDOM.findDOMNode(root);
        expect(rootNode.classList).toContain('spam');
    });

    it('should watch for changes to props and update the value state', function () {
        let value = 5;

        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value}/>);
        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');

        root.componentWillReceiveProps({value: 5});
        expect(input.value).toBe('$5.00');
    });

    it('should watch for changes to props and update the value state', function () {

        var root = TestUtils.renderIntoDocument(<ShInputCurrency />);

        let input = TestUtils.findRenderedDOMComponentWithClass(root, 'sh-currency-input');

        root.componentWillReceiveProps({});
        expect(root.state.value).toBe('')
    });

    it('changing props should update state', function () {
        let value = 0;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} required/>);

        var props = {
            value: 0
        };
        root.componentWillReceiveProps(props);
        expect(root.state.display).toBe('$0.00')
    });

    it('changing props should update state', function () {
        let value = 1;
        var root = TestUtils.renderIntoDocument(<ShInputCurrency value={value} required/>);
        var props = {
            value: 0
        };
        root.componentWillReceiveProps(props);
        expect(root.state.display).toBe('$0.00')
    });
});
