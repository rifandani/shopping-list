import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner,
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items, loading } = this.props.item;

    return (
      <Container>
        {loading ? <Spinner style={{ width: '3rem', height: '3rem' }} /> : null}

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, price }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  {name}
                  <Badge pill color="primary" className="ml-5">
                    Rp {price}.00
                  </Badge>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>

        <Row className="mt-4 justify-content-center">
          <Col sm="4">
            <Card body inverse color="primary">
              <CardHeader
                style={{ backgroundColor: '#000', borderColor: '#fff' }}
                tag="h5"
                className="text-center"
              >
                Total Item
              </CardHeader>
              <CardBody>
                <CardText className="text-center">
                  <Badge color="danger">{items.length}</Badge>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card body inverse color="primary">
              <CardHeader
                style={{ backgroundColor: '#000', borderColor: '#fff' }}
                tag="h5"
                className="text-center"
              >
                Total Price
              </CardHeader>
              <CardBody>
                <CardText className="text-center">
                  <Badge color="danger">
                    Rp {items.reduce((sum, { price }) => sum + price, 0)}.00
                  </Badge>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

// connect() takes 2 arguments, pertama mapStateToProps, kedua mapDispatchToProps
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
