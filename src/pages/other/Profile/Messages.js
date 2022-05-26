import React from 'react';
import { Media } from 'reactstrap';
import { Loader } from 'react-feather';

import avatar1 from '../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import avatar5 from '../../../assets/images/users/avatar-5.jpg';
import avatar6 from '../../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../../assets/images/users/avatar-8.jpg';

const Message = item => {
    return (
        <Media>
            <div className="mr-3">
                <img src={item.avatar} alt="" className="avatar-md rounded-circle" />
            </div>
            <Media body className="overflow-hidden">
                <h5 className="font-size-15 mt-2 mb-1">
                    <a href="/" className="text-dark">
                        {item.from}
                    </a>
                </h5>
                <p className="text-muted font-size-13 text-truncate mb-0">{item.message}</p>
            </Media>
        </Media>
    );
};

const Messages = () => {
    const messages = [
        { id: 1, from: 'Eitan', avatar: avatar1, message: 'The case is High priority case!!!' },
        { id: 2, from: 'Monica', avatar: avatar2, message: 'Forwarded to Marc.' },
    ];

    return (
        <React.Fragment>
            <div className="message-card">
                <ul className="list-unstyled">
                    {messages.map((item, idx) => {
                        return (
                            <li className="py-3 border-bottom" key={idx}>
                                <Message {...item} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="text-center mt-3">
                <a href="/" className="btn btn-sm btn-primary">
                    Add Notes
                </a>
            </div>
        </React.Fragment>
    );
};

export default Messages;
