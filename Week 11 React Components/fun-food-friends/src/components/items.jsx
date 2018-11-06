import React, { Component } from 'react';
import '../App.css';
import AddItem from './addItem';
import DisplayItem from './displayItem';

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: '',
            username: '',
            items: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(change) {
        this.setState(change);
    }

    render() {
        return (
            <div className='container'>
                <AddItem
                    user={this.props.user}
                    currentItem={this.state.currentItem}
                    onAddItemChange={this.handleChange}
                />
                <DisplayItem
                    user={this.props.user}
                    items={this.state.items}
                    currentItem={this.state.currentItem}
                    onNewState={this.handleChange}
                />
            </div>
        )
    }
}

export default Items;
