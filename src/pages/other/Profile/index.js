import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane, UncontrolledAlert } from 'reactstrap';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';

import UserBox from './UserBox';
import Activities from './Activities';
import Messages from './Messages';
import Projects from './Projects';
import Tasks from './Tasks';
import Files from './Files';
import { BASE_URL } from '../../../constants';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1',
            case: {},
            files: [],
            logout: false,
            loaded: false,
            saveEnabled: true,
            caseEditObj: {},
            saving: false,
            saved: false,
        };
    }

    componentDidMount() {
        this.callCaseGetAPI();
    }

    callCasePutAPI() {
        const { caseId } = this.props.match.params
        fetch(BASE_URL + '/api/case/' + caseId, {
            body: JSON.stringify({ ...this.state.caseEditObj }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            method: 'PUT',
        })
            .then(res => {
                if (res.status === 403) {
                    localStorage.clear();
                    this.setState({ logout: true });
                }
                return res.json();
            })
            .then(json => {
                console.log(json)
                if (json.success) {
                    this.callCaseGetAPI();
                    this.setState({saved: true, saving: false});
                    setTimeout(()=>{
                        this.setState({saved: false})
                    }, 2000)
                }
            });
    }

    saveCase(caseObj) {
        this.setState({ caseEditObj: { ...this.state.caseEditObj, ...caseObj } }, () => {
            this.callCasePutAPI();
            this.setState({saving: true})
        })
    }

    callCaseGetAPI() {
        const { caseId } = this.props.match.params
        fetch(BASE_URL + '/api/case/' + caseId, {
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
                console.log(json)
                this.setState({
                    case: json,
                    logout: false,
                    files: json.files,
                    loaded: true,
                });
            });
    }

    /**
     * Toggles tab
     * @param {*} tab
     */
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        if (!this.state.loaded) {
            return <div>Loading...</div>;
        }
        return (
            <React.Fragment>
                <Row className="page-title">
                    <Col md={12}></Col>
                </Row>

                {this.state.saving ? <UncontrolledAlert color='info'>
                    <strong>Saving...</strong>
                </UncontrolledAlert> : ''}

                {this.state.saved ?  <UncontrolledAlert color='success'>
                    <strong>Case saved!</strong>
                </UncontrolledAlert> : ''}

                <Row>
                    <Col lg={7}>
                        {/* User information */}
                        <UserBox passedCase={this.state.case} onSave={(caseObj) => {
                            this.saveCase(caseObj)
                        }} />
                    </Col>

                    <Col lg={5}>
                        <Card>
                            <CardBody>
                                <Nav className="nav nav-pills navtab-bg nav-justified">
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '1' })}
                                            onClick={() => {
                                                this.toggleTab('1');
                                            }}>
                                            Logs
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '2' })}
                                            onClick={() => {
                                                this.toggleTab('2');
                                            }}>
                                            Notes
                                        </NavLink>
                                    </NavItem>
                                    {/* <NavItem>
                                        {/* <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggleTab('3'); }}
                                        >Projects</NavLink>
                                    </NavItem> */}
                                    {/* <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '4' })}
                                            onClick={() => { this.toggleTab('4'); }}
                                        >Tasks</NavLink>
                                    </NavItem> */}
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            className={classNames({ active: this.state.activeTab === '5' })}
                                            onClick={() => {
                                                this.toggleTab('5');
                                            }}>
                                            Documents
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Activities />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Messages />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Projects />
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <Tasks />
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <Files files={this.state.files}
                                            startFileUpload={() => {
                                                this.setState({ saveEnabled: false });
                                            }}
                                            onFileUpload={files => {
                                                console.log(files)
                                                console.log(this.state.case)
                                                this.setState({ caseEditObj: { ...this.state.caseEditObj, files: [...files, ...this.state.files] } })
                                                this.setState({ saveEnabled: true });
                                            }} />
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                            {/* <div className="spacer-30"></div> */}
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Profile;
