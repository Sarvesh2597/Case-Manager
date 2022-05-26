import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { UncontrolledButtonDropdown, DropdownToggle } from 'reactstrap';
import CreateCase from './CreateCase';
import { InputGroupAddon, Label, FormGroup, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../constants';



class Profiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            logout: false,
            postAdmin: {},
            items: [],
    
        };

        this.toggle = this.toggle.bind(this);
        this.openModalWithSize = this.openModalWithSize.bind(this);
        this.openModalWithClass = this.openModalWithClass.bind(this);
    }

    componentDidMount() {
        this.getAdmin();
      }

      getAdmin() {
        fetch(BASE_URL + '/api/admin', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
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
        fetch(BASE_URL + '/api/admin', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
            body: JSON.stringify(this.state.postAdmin),
        })
            .then(res => {
                if (res.status === 403) {
                    localStorage.clear();
                    this.setState({
                        logout: true,
                    })
                }
                return res.json();
            })
            .then(data => {
                console.log('Success:', data);
                this.getAdmin();
                this.setState ({
                
                    postAdmin: {},
                
                
                })
                    
             
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
        var {isLoaded, items} = this.state;

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
                        Add Admin
                    </DropdownToggle>
                </UncontrolledButtonDropdown>

                {/* API INTEGRATION */}

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
                <label className="badge badge-soft-success mr-1">{item.email}</label>
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
                    <ModalHeader toggle={this.toggle}>Admin Details</ModalHeader>
                    <ModalBody>
                        <Input
                            name="nameOfEntity"
                            className="mb-2"
                            placeholder="Name of Entity"
                            id="nameOfEntity"
                            required
                            value={this.state.postAdmin.nameOfEntity}
                            onChange={e => this.setState({postAdmin: {...this.state.postAdmin,nameOfEntity: e.target.value }})}
                        />

                        <Input name="address" className="mb-2" placeholder="Address" id="address" required 
                        
                        value={this.state.postAdmin.address}
                        onChange={e => this.setState({postAdmin: {...this.state.postAdmin,address: e.target.value }})}/>

                        <Input name="city" className="mb-2" placeholder="City" id="city" required 
                          value={this.state.postAdmin.city}
                          onChange={e => this.setState({postAdmin: {...this.state.postAdmin,city: e.target.value }})}/>

                        <Input name="state" className="mb-2" placeholder="State" id="state" required 
                          value={this.state.postAdmin.state}
                          onChange={e => this.setState({postAdmin: {...this.state.postAdmin,state: e.target.value }})}/>

                        <Input name="zipcode" className="mb-2" placeholder="ZIP Code" id="zipcode" required 
                          value={this.state.postAdmin.zipcode}
                          onChange={e => this.setState({postAdmin: {...this.state.postAdmin,zipcode: e.target.value }})}/>

                        <Input name="contact" className="mb-2" placeholder="Telephone No." id="contact" required 
                          value={this.state.postAdmin.contact}
                          onChange={e => this.setState({postAdmin: {...this.state.postAdmin,contact: e.target.value }})}/>

                        <Input name="email" className="mb-2" placeholder="Email" id="email" required 
                          value={this.state.postAdmin.email}
                          onChange={e => this.setState({postAdmin: {...this.state.postAdmin,email: e.target.value }})}/>

                        {this.state.className && this.state.className === 'modal-dialog-scrollable' && (
                            <React.Fragment></React.Fragment>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={e => {this.submitClick();this.toggle()}}>
                            Add ADMIN
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
