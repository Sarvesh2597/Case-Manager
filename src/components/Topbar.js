import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Menu, X, Settings, User, HelpCircle, Lock, LogOut } from 'react-feather';

import { showRightSidebar } from '../redux/actions';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import LanguageDropdown from './LanguageDropdown';

import logo from '../assets/images/logo.png';
import profilePic from '../assets/images/users/avatar-7.jpg';

import 'react-perfect-scrollbar/dist/css/styles.css';

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import * as FeatherIcon from 'react-feather';

const Notifications = [
    {
        id: 1,
        text: 'Case Status Changed.',
        subText: '1 min ago',
        icon: 'uil uil-user-plus',
        bgColor: 'primary',
    },
];

const ProfileMenus = [
    {
        label: 'My Account',
        icon: User,
        redirectTo: '/',
    },
    {
        label: 'Settings',
        icon: Settings,
        redirectTo: '/',
    },
    {
        label: 'Support',
        icon: HelpCircle,
        redirectTo: '/',
    },
    {
        label: 'Lock Screen',
        icon: Lock,
        redirectTo: '/',
    },
    {
        label: 'Logout',
        icon: LogOut,
        redirectTo: '/account/logout',
        hasDivider: true,
    },
];

class Topbar extends Component {
    constructor(props) {
        super(props);

        this.handleRightSideBar = this.handleRightSideBar.bind(this);
    }

    /**
     * Toggles the right sidebar
     */
    handleRightSideBar = () => {
        this.props.showRightSidebar();
    };

    render() {
        return (
            <React.Fragment>
                <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
                    <Container fluid>
                        {/* menu*/}
                        <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
                            <li className="">
                                <button
                                    className="button-menu-mobile open-left mr-0"
                                    onClick={this.props.openLeftMenuCallBack}>
                                    <Menu className="menu-icon" />
                                    <X className="close-icon" />
                                </button>
                            </li>
                        </ul>

                        {/* logo */}
                        <Link to="/" className="navbar-brand mr-0 ml-0 mr-md-2 logo">
                            <span className="logo-lg">
                                <img src={logo} alt="" height="24" />
                                <span className="d-inline h4 ml-2 text-logo">Case Manager</span>
                            </span>
                            <span className="logo-sm">
                                <img src={logo} alt="" height="24" />
                                <span className="d-inline h4 ml-2 text-logo">Case Manager</span>
                            </span>
                        </Link>

                        <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
                            <li className="d-none d-sm-block">
                                <div className="app-search">
                                    <form></form>
                                </div>
                            </li>

                            <NotificationDropdown notifications={Notifications} />

                            {/* <li className="notification-list">
                                <button
                                    className="btn btn-link nav-link right-bar-toggle"
                                    onClick={this.handleRightSideBar}>
                                    <Settings />
                                </button>
                            </li> */}
                            <div className="media user-profile mt-2 mb-2 ">
                                {/* <img src={profilePic} className="avatar-sm rounded-circle mr-2" alt="Shreyu" />
                                <img src={profilePic} className="avatar-xs rounded-circle mr-2" alt="Shreyu" /> */}

                                <div className="media-body mr-4">
                                    <h6 className="pro-user-name mt-0 mb-0">{JSON.parse(localStorage.getItem('user')).name}</h6>
                                    <span className="pro-user-desc">User</span>
                                </div>
                                <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
                                    <DropdownToggle
                                        data-toggle="dropdown"
                                        tag="button"
                                        className="btn btn-link p-0 dropdown-toggle mr-4">
                                        <FeatherIcon.ChevronDown />
                                    </DropdownToggle>
                                    <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                                        <Link to="/" className="dropdown-item notify-item">
                                            <FeatherIcon.User className="icon-dual icon-xs mr-2" />
                                            <span>My Account</span>
                                        </Link>
                                        <Link to="/" className="dropdown-item notify-item">
                                            <FeatherIcon.Settings className="icon-dual icon-xs mr-2" />
                                            <span>Settings</span>
                                        </Link>
                                        <Link to="/" className="dropdown-item notify-item">
                                            <FeatherIcon.HelpCircle className="icon-dual icon-xs mr-2" />
                                            <span>Support</span>
                                        </Link>
                                        <Link to="/" className="dropdown-item notify-item">
                                            <FeatherIcon.Lock className="icon-dual icon-xs mr-2" />
                                            <span>Lock Screen</span>
                                        </Link>
                                        <DropdownItem divider />
                                        <Link to="/account/logout" className="dropdown-item notify-item">
                                            <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
                                            <span>Logout</span>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                            <ProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={'Shreyu N'}
                                description="Administrator"
                            />
                        </ul>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, { showRightSidebar })(Topbar);
