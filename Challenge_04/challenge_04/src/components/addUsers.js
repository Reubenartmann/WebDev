import React, {Component} from 'react';
import firebase from '../firebase.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  };
class Friends extends Component {

    componentDidMount() {
        const friendsRef = firebase.database().ref('friends');
        friendsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              name: items[item].name,
              phone: items[item].phone,
              color: items[item].color,
              icon: items[item].icon
            });
          }
          this.setState({
            items: newState
          });
        });
      }

    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/friends/${itemId}`);
        itemRef.remove();}

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('friends');
        const item = {
          name: this.state.name,
          phone: this.state.phone,
          color: this.state.color,
          icon: this.state.icon
        }
        itemsRef.push(item);
        this.setState({
          name: '',
          phone: '',
          color: '',
          icon: ''
        });
      }

      editItem(itemId){
        const itemtoedit =firebase.database().ref('friends/'+itemId);
        itemtoedit.on('value', (snapshot) => {
          let items = snapshot.val();
          console.log(items);
          const item = {
            name: this.state.name,
            phone: this.state.phone,
            color: this.state.color,
            icon: this.state.icon
          }
          itemtoedit.update(item);
        })
            //console.log("edit shoul occur")


        }



      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      constructor() {

        super();
        this.state = {
          name: '',
          phone: '',
          color: '',
          icon: '',
          items: []
        }
        //this.editItem=this.editItem.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
      }
    render() {
        return (
        <div className="friends">
        friends page
        <section className="add-item">
        <form onSubmit={this.handleSubmit}>
        <FormControl>
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input type="text" name="name" placeholder="What's your name?" onChange={this.handleChange} value={this.state.name} />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="component-simple">Number</InputLabel>
        <Input type="text" name="phone" placeholder="What's your number?" onChange={this.handleChange} value={this.state.number} />
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="component-simple">Color</InputLabel>
        <Input type="text" name="color" placeholder="What's your color?" onChange={this.handleChange} value={this.state.color} />
        <FormHelperText id="component-helper-text">color in HEX code</FormHelperText>
        </FormControl>
        <FormControl>
        <InputLabel htmlFor="component-simple">Icon</InputLabel>
        <Input type="text" name="icon" placeholder="What's your icon?" onChange={this.handleChange} value={this.state.icon} />
        <FormHelperText id="component-helper-text">e.g. fa fa-circle</FormHelperText>
        </FormControl>
        <Button id="addFriend" onClick={this.handleSubmit}>Add Friend</Button>

        </form>
        </section>
        <section className="display-friends">
        <div class="container>">
        <div class="cards">
      {this.state.items.map((item) => {
        return (
            <Card id="friend-card">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography component="p">
                <p>phone:{item.phone}</p>
            <p>color:{item.color}</p>
            <p>icon:{item.icon}</p>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=> this.removeItem(item.id)}>
                Remove
              </Button>
              <Button size="small" color="primary" onClick={()=> this.editItem(item.id)}>
                edit
              </Button>
            </CardActions>
          </Card>
        )
      })}
        </div>
        </div>
        </section>
        </div>
        )
    }
}
export default Friends;
