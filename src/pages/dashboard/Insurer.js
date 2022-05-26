import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { UncontrolledButtonDropdown, DropdownToggle } from 'reactstrap';
import CreateCase from './CreateCase';
import { InputGroupAddon, Label, FormGroup, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../constants';

// const Profiles = () => {
//     return

// }

// export default Profiles;

class Profiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            items: [],
            postInsurer: {},
            logout: false,
        };

        this.toggle = this.toggle.bind(this);
        this.openModalWithSize = this.openModalWithSize.bind(this);
        this.openModalWithClass = this.openModalWithClass.bind(this);
    }

    componentDidMount() {
        this.getInsurer();
    }

    getInsurer() {
        fetch(BASE_URL + '/api/insurer', {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
        })
            .then(res => {
                if (res.status === 403) {
                    localStorage.clear();
                    this.setState({ logout: true });
                }
                return res.json();
            })
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                    logout: false,
                });
            });
    }
    /**
     * Show/hide the modal
     */
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
    };

    submitClick() {
        fetch(BASE_URL + '/api/insurer', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
            body: JSON.stringify(this.state.postInsurer),
        })
            .then(res => {
                if (res.status === 403) {
                    localStorage.clear();
                    this.setState({
                        logout: true,
                    });
                }
                return res.json();
            })
            .then(data => {
                console.log('Success:', data);
                this.getInsurer();
                this.setState({
                    postInsurer: {},
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    /**
     * Opens large modal
     */
    openModalWithSize = size => {
        this.setState({ size: size, className: null });
        this.toggle();
    };

    /**
     * Opens modal with custom class
     */
    openModalWithClass = className => {
        this.setState({ className: className, size: null });
        this.toggle();
    };

    render() {
        var { isLoaded, items } = this.state;

        if (this.state.logout) {
            return <Redirect to="/account/logout" />;
        }
        if (!isLoaded) {
            return <div>Loading..</div>;
        } else {
            return (
                <React.Fragment>
                    <div className="spacer-30"></div>
                    <UncontrolledButtonDropdown>
                        <DropdownToggle
                            color="primary"
                            onClick={() => this.openModalWithClass('modal-dialog-scrollable')}
                            className="dropdown-toggle mx-1 mb-4">
                            Add Insurer
                        </DropdownToggle>
                    </UncontrolledButtonDropdown>

                    <Row>
                        {items.map(item => (
                            <Col xl={3}>
                                <Card>
                                    <CardBody className="pb-0">
                                        <div className="text-center mt-3">
                                            <h5 className="mt-2 mb-0">{item.nameOfEntity}</h5>
                                            <h6 className="text-muted font-weight-normal mt-2 mb-4">{item.contact}</h6>

                                            <div className="mt-4 pt-3 border-top text-left">
                                                <p className="text-muted mb-2">{item.address}</p>

                                                <p className="mb-2">
                                                    <label className="badge badge-soft-success mr-1">
                                                        {item.email}
                                                    </label>
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.state.className}
                        size={this.state.size}>
                        <ModalHeader toggle={this.toggle}>Insurer Details</ModalHeader>
                        <ModalBody>
                            <Input
                                name="nameOfEntity"
                                className="mb-2"
                                placeholder="Name  of Entity"
                                id="nameOfEntity"
                                required
                                value={this.state.postInsurer.nameOfEntity}
                                onChange={e =>
                                    this.setState({
                                        postInsurer: { ...this.state.postInsurer, nameOfEntity: e.target.value },
                                    })
                                }
                            />

                            <Input
                                name="address"
                                className="mb-2"
                                placeholder="Address"
                                id="address"
                                required
                                value={this.state.postInsurer.address}
                                onChange={e =>
                                    this.setState({
                                        postInsurer: { ...this.state.postInsurer, address: e.target.value },
                                    })
                                }
                            />

                            <Input
                                name="city"
                                className="mb-2"
                                placeholder="City"
                                id="city"
                                required
                                value={this.state.postInsurer.city}
                                onChange={e =>
                                    this.setState({ postInsurer: { ...this.state.postInsurer, city: e.target.value } })
                                }
                            />

                            <Input
                                name="state"
                                className="mb-2"
                                placeholder="State"
                                id="state"
                                required
                                value={this.state.postInsurer.state}
                                onChange={e =>
                                    this.setState({ postInsurer: { ...this.state.postInsurer, state: e.target.value } })
                                }
                            />

                            <Input
                                name="zipcode"
                                className="mb-2"
                                placeholder="ZIP Code"
                                id="zipcode"
                                required
                                value={this.state.postInsurer.zipcode}
                                onChange={e =>
                                    this.setState({
                                        postInsurer: { ...this.state.postInsurer, zipcode: e.target.value },
                                    })
                                }
                            />
                            <Input
                                name="contact"
                                className="mb-2"
                                placeholder="Telephone No."
                                id="contact"
                                required
                                value={this.state.postInsurer.contact}
                                onChange={e =>
                                    this.setState({
                                        postInsurer: { ...this.state.postInsurer, contact: e.target.value },
                                    })
                                }
                            />
                            <Input
                                name="email"
                                className="mb-2"
                                placeholder="Email"
                                id="email"
                                required
                                value={this.state.postInsurer.email}
                                onChange={e =>
                                    this.setState({ postInsurer: { ...this.state.postInsurer, email: e.target.value } })
                                }
                            />

                            {this.state.className && this.state.className === 'modal-dialog-scrollable' && (
                                <React.Fragment></React.Fragment>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={e => {
                                    this.submitClick();
                                    this.toggle();
                                }}>
                                Add Insurer
                            </Button>
                            <Button color="secondary" className="ml-1" onClick={this.toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </React.Fragment>
            );
        }
    }
}

export default Profiles;
