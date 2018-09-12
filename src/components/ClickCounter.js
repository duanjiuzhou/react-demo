import React , {Component} from 'react';

class ClickCounter extends Component {
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        this.state = {count: 0};
    }

    onClickButton() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        const index = 1;
        return (
            <div>
                <button onClick={this.onClickButton}>Click Me</button>
                <div>
                    Click Count: {this.state.count}
                </div>
                <div>
                    {`ddd${index}`}
                </div>
            </div>
        )
    }
}

export default ClickCounter;