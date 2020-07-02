import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addItem } from '../actions/itemActions';

export class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    price: 0,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      price: this.state.price,
    };

    // add item via addItem actions
    this.props.addItem(newItem);

    // close modal
    this.toggle();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.price]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Login to Add Item</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            className="align-self-center text-danger"
          >
            Add To The List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add an item to the list"
                  onChange={this.onChange}
                ></Input>
                <Label className="mt-2" for="price">
                  Price
                </Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Specify the price of the item"
                  onChange={this.onChange}
                ></Input>
                <Button color="primary" style={{ marginTop: '1rem' }} block>
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
