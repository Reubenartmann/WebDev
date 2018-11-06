import React, { Component } from 'react';
import '../App.css';
import firebase from '../firebase.js';

class DisplayItem extends Component {
    componentDidMount() {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
              user: items[item].user
            });
          }
          this.props.onNewState({
            items: newState
          });
        });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }

    editItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        const item = {
          title: this.props.currentItem,
          user: this.props.user.displayName || this.props.user.email
        };
        itemRef.update(item);
    }

    render() {
        return (
            <section className='display-item'>
                <div className='wrapper'>
                    <ul>
                        {this.props.items.map((item) => {
                          return (
                              <li key={item.id}>
                              <h3>{item.title}</h3>
                              <p>brought by: {item.user}</p>
                              <button onClick={() => this.editItem(item.id)}>Edit Item</button>
                              {item.user === this.props.user.displayName || item.user === this.props.user.email ?
                                <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                                :
                                null
                              }
                              </li>
                          )
                        })}
                    </ul>
                </div>
            </section>
        )
    }
}

export default DisplayItem;
