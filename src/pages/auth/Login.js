import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Label,
    FormGroup,
    Button,
    Alert,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, Lock } from 'react-feather';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import { BASE_URL } from '../../constants';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            username: 'test',
            password: 'test',
        };
    }

    componentDidMount() {
        this._isMounted = true;

        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.loginUser(values.username, values.password);
    };

    loginUser(email, password) {
        fetch(BASE_URL + '/api/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                localStorage.setItem('user', JSON.stringify({ ...data.user, token: data.token }));
                this.props.loginUser('test', 'test', this.props.history);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages my-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10}>
                                    <Card className="">
                                        <CardBody className="p-0">
                                            <Row>
                                                <Col md={6} className="p-5 position-relative">
                                                    {/* preloader */}
                                                    {this.props.loading && <Loader />}

                                                    <div className="mx-auto mb-5">
                                                        <a href="/">
                                                            <img src={logo} alt="" height="24" />
                                                            <h3 className="d-inline align-middle ml-1 text-logo">
                                                                Case Manager
                                                            </h3>
                                                        </a>
                                                    </div>

                                                    <h6 className="h5 mb-0 mt-4">Welcome back!</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        Enter your email address and password to access admin panel.
                                                    </p>

                                                    {this.props.error && (
                                                        <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                            <div>{this.props.error}</div>
                                                        </Alert>
                                                    )}

                                                    <AvForm
                                                        onValidSubmit={this.handleValidSubmit}
                                                        className="authentication-form">
                                                        <AvGroup className="">
                                                            <Label for="username">Email</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Mail className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    placeholder="Enter your username"
                                                                    //    value={this.state.username}
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="password">Password</Label>
                                                            <Link
                                                                to="/account/forget-password"
                                                                className="float-right text-muted text-unline-dashed ml-1">
                                                                Forgot your password?
                                                            </Link>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="password"
                                                                    name="password"
                                                                    id="password"
                                                                    placeholder="Enter your password"
                                                                    //    value={this.state.password}
                                                                    required
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <FormGroup className="form-group mb-0 text-center">
                                                            <Button color="primary" className="btn-block">
                                                                Log In
                                                            </Button>
                                                        </FormGroup>
                                                        {/* 
                                                        <p className="mt-3">
                                                            <strong>Username:</strong> test &nbsp;&nbsp;{' '}
                                                            <strong>Password:</strong> test
                                                        </p> */}
                                                    </AvForm>
                                                </Col>

                                                <Col md={6} className="d-none d-md-inline-block">
                                                    <div className="auth-page-sidebar">
                                                        <div className="overlay"></div>
                                                        <div className="auth-user-testimonial"></div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        <Link to="/account/register" className="text-primary font-weight-bold ml-1">
                                            Create User
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);
