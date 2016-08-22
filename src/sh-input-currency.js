import React, {Component} from 'react';
import * as _ from 'lodash';
require('./sh-input-currency.scss');

class ShInputCurrency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classList: ['sh-input-currency empty'],
            placeholderText: '+'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    getDecimal(value) {
        if (!value) {
            return null;
        }

        var num = value;
        if (!_.isNumber(value)) {
            var isNeg = ('-' && _.includes(value, '-'));

            var regExp = '[^0-9.]';
            var numString = value.toString().replace(new RegExp(regExp, 'g'), '');

            var numList = numString.split('.');

            // numList will always have at least one value in array because we checked for an empty string earlier.
            numList[0] += '.';
            numString = numList.join('');
            num = parseFloat(numString);

            if (!num) {
                num = 0;
            } else if (isNeg) {
                num *= -1;
            }
        }

        return num;
    };


    runFormarters(txt){
        return '$' + (this.formatNumber(Number(this.getDecimal(txt)).toFixed(2)));
    }

    componentDidMount() {
        if (this.props.value) {
            var text = this.runFormarters(this.props.value);
            this.setState(
                {
                    value: text,
                    classList: ['sh-input-currency']
                }
            )
        }

        if (this.props.required) {
            this.state.placeholderText = 'Required Field';
            this.setState(this.state);
        }
    }

    handleChange(event) {
        var text = event.target.value;

        this.setState({value: text});
        event.target.value = this.getDecimal(text);
        this.props.onChange(event);
    };


    handleFocus(event) {
        var text = event.target.value;
        text = text.replace(/[,$]/g, '');

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }

        this.setState(
            {
                value: text
            }
        );
        setTimeout(()=> {
            this.refs.input.select();
        }, 100)
    }

    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    handleBlur(event) {
        var text = event.target.value;

        text = this.runFormarters(text);

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        this.setState(
            {
                value: text,
                classList: ['sh-input-currency']
            }
        );

        if (!this.state.value) {
            this.setState(
                {
                    value: this.state.value,
                    classList: ['sh-input-currency empty']
                }
            )
        }
    }

    render() {
        var {onFocus, onBlur, ...other} = this.props;

        return (
            <div className={this.state.classList}>
                <label>
                    <span className="label">{this.props.label}</span>
                    <input ref="input"
                           className="sh-currency-input"
                           type="text"
                           {...other}
                           placeholder={this.state.placeholderText}
                           onChange={this.handleChange}
                           onFocus={this.handleFocus}
                           onBlur={this.handleBlur}
                           value={this.state.value}
                    />
                </label>
            </div>
        )
    }
}

export default ShInputCurrency;