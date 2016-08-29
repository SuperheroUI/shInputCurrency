import React, {Component} from 'react';
import * as _ from 'lodash';
import sh from 'sh-core';
require('./sh-input-currency.scss');

class ShInputCurrency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            classList: 'sh-input-currency empty',
            placeholderText: '+'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }


    runFormarters(txt){
        return '$' + (this.formatNumber(Number(sh.getDecimal(txt)).toFixed(2)));
    }

    componentDidMount() {
        if (this.props.value) {
            var text = this.runFormarters(this.props.value);
            this.setState(
                {
                    value: text,
                    classList: 'sh-input-currency'
                }
            )
        }

        if (this.props.required) {
            this.state.placeholderText = 'Required Field';
            this.setState(this.state);
        }
        this.state.placeholderHolder = this.state.placeholderText;
    }

    handleChange(event) {
        var text = event.target.value;

        this.setState({value: text});
        event.target.value = sh.getDecimal(text);
        if(this.props.onChange){
            this.props.onChange(event);
        }
    };


    handleFocus(event) {
        var text = event.target.value;
        text = text.toString().replace(/[,$]/g, '');

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }

        this.setState(
            {
                value: text,
                placeholderText: ''
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
                placeholderText: this.state.placeholderHolder,
                classList: 'sh-input-currency'
            }
        );

        if (!this.state.value) {
            this.setState(
                {
                    value: this.state.value,
                    classList: 'sh-input-currency empty'
                }
            )
        }
    }

    render() {
        var {onFocus, onBlur, className, ...other} = this.props;

        return (
            <div className={this.props.className ? this.props.className +' '+this.state.classList : this.state.classList}>
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