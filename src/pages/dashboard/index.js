import React, { Component } from 'react';
import { Row, Col, UncontrolledButtonDropdown, DropdownToggle } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

import Tables from '../tables/Basic';
import Validation from '../forms/Validation';
import HorizontalForm from '../forms/Basic';
import { BASE_URL } from '../../constants';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            logout: false,
        };
    }

    componentDidMount() {
        this.callCaseAPI({});
    }

    search(query) {
        console.log(query);
        this.callCaseAPI(query)
    }

    callCaseAPI(params) {
        const user = JSON.parse(localStorage.getItem('user'));
        let queryString = ''
        Object.keys(params).forEach((key, index) => params[key] ? index === 0 ? queryString = `${key}=${params[key]}` : queryString += `&${key}=${params[key]}` : '');
        fetch(BASE_URL + '/api/case?' + queryString, {
            headers: {
                Authorization: 'Bearer ' + user.token,
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
                console.log(json);
                this.setState({
                    data: json,
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.logout) {
            return <Redirect to="/account/logout" />;
        }

        return (
            <React.Fragment>
                <div className="">
                    <UncontrolledButtonDropdown>
                        <Link to="/CreateCase">
                            {' '}
                            <DropdownToggle color="primary" style={dropdownBox} className="dropdown-toggle mx-1 mb-4">
                                Create Case
                            </DropdownToggle>
                        </Link>
                    </UncontrolledButtonDropdown>

                    <Row>
                        <Col xl={9}>
                            <Tables data={this.state.data} />
                        </Col>

                        <Col xl={3}>
                            <HorizontalForm paramQuery={(query) => this.search(query)}/>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

const dropdownBox = {
    marginTop: '20px',
};

export default Dashboard;
