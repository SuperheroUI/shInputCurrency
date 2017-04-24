import React, {Component} from 'react';
import * as _ from 'lodash';
import ShCore from 'sh-core';
import './styles.scss';

class ShInputCurrency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            display: '',
            classList: {
                shInputCurrency: true,
                empty: true
            },
            validStatus: 'unknown',
            placeholderText: '$0.00',
            requiredField: {showRequired: false}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(onSubmit) {
        if (onSubmit) {
            this.state.classList.shTouched = true;
        }
        let rtn = {isValid: true};

        this.state.classList.shInvalid = false;

        if (this.props.required && (this.state.value === null || this.state.value === '')) {
            this.state.classList.shInvalid = true;

            rtn.isValid = false;
            rtn.msg = 'Required';
        }

        let newState = _.clone(this.state);
        this.setState(newState);
        return rtn;
    };

    componentWillMount() {
        if (this.props.validator) {
            this.props.validator.register(this, this.validate);
        }
    };

    componentWillUnmount() {
        if (this.props.validator) {
            this.props.validator.unregister(this);
        }
    };

    runFormarters(txt) {
        return '$' + (this.formatNumber(Number(ShCore.getDecimal(txt)).toFixed(2)));
    }

    componentDidMount() {
        let newValue = ShCore.getDecimal(this.props.value);
        let newState = _.clone(this.state);
        newState.value = newValue;
        newState.display = this.runFormarters(newValue);
        newState.classList.empty = false;

        if (this.props.value) {
            this.setState(newState, this.validate);
        }
    }

    componentWillReceiveProps(props) {
        let newValue = ShCore.getDecimal(props.value);

        if (!_.isUndefined(props.value) && !_.isEqual(newValue, this.state.value)) {
            let newState = _.clone(this.state);
            newState.classList.empty = !newValue;
            newState.value = newValue;
            newState.display = this.runFormarters(newValue);
            this.setState(newState, this.validate);
        }
    }

    handleChange(event) {
        event.persist();

        let dec = ShCore.getDecimal(event.target.value);
        this.setState({value: dec, display: event.target.value}, ()=> {
            if (this.props.validator) {
                this.props.validator.validate()
            } else {
                this.validate();
            }

            event.target.value = dec;
            this.props.onChange(event);
        });
    };


    handleFocus(event) {
        let text = event.target.value;
        text = text.toString().replace(/[,$]/g, '');

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }

        let newState = _.clone(this.state);
        newState.classList.shTouched = true;
        newState.value = text;
        newState.placeholderText = '';

        this.setState(newState,
            ()=>{
                this.refs.input.select();
            }
        );
    }

    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    handleBlur(event) {
        this.validate();
        let newState = _.clone(this.state);

        if (event.target.value.length > 0) {
            let text = event.target.value;
            text = this.runFormarters(text);
            newState.display = text;
        }

        newState.placeholderText = newState.placeholderHolder;
        newState.classList.empty = !this.state.value;
        newState.requiredField.showRequired = !this.state.value;

        this.setState(newState);

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    render() {
        let {onFocus, onBlur, className, validator, required, value, ...other} = this.props;

        return (
            <div
                className={this.props.className ? ShCore.getClassNames(this.state.classList) + ' ' + this.props.className : ShCore.getClassNames(this.state.classList)}>
                <label>
                    <span className="label">{this.props.label}</span>
                    <span className={"required-label " + ShCore.getClassNames(this.state.requiredField)}>REQUIRED</span>
                    <input ref="input"
                           className="sh-currency-input"
                           type="text"
                           {...other}
                           placeholder={this.state.placeholderText}
                           onChange={this.handleChange}
                           onFocus={this.handleFocus}
                           onBlur={this.handleBlur}
                           value={this.state.display}
                    />
                </label>
            </div>
        )
    }
}

ShInputCurrency.propTypes = {
    validator: React.PropTypes.object,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    required: React.PropTypes.bool,
};

ShInputCurrency.defaultProps = {
    validator: null,
    onChange: _.noop,
    label: '',
    required: false
};

export default ShInputCurrency;