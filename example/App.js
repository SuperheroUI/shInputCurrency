import React from 'react'
import ReactDOM from 'react-dom';
import ShInputCurrency from '../bin/sh-input-currency'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.state.value = event.target.value;
        this.setState(this.state);
    }

    handleSubmit() {
        alert(this.state.value);
        return false;
    }

    render() {
        return <div>
            <form name="test" onSubmit={this.handleSubmit}>
                <ShInputCurrency label="Enter Amount" value="" onChange={this.handleChange} required></ShInputCurrency>
                <button type="submit">go</button>
            </form>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));