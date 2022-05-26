import React from 'react';

const Activity = item => {
    return (
        <div className="pb-4">
            <div className="media">
                <div className="event-date text-center mr-4">
                    <div className="bg-soft-primary p-1 rounded text-primary font-size-14">{item.date}</div>
                </div>
                <div className="media-body">
                    <h6 className="font-size-15 mt-0 mb-1">{item.title}</h6>
                    <p className="text-muted font-size-14">{item.description}</p>
                </div>
            </div>
        </div>
    );
};

const Activities = () => {
    const activities = [
        {
            id: 1,
            title: 'File Uploaded',
            description: 'Monica uploaded Doc1.pdf',
            date: '02:03 PM',
        },
        {
            id: 2,
            title: 'Case Status Changed',
            description: 'Esha changed the status from OPEN to IN PROGRESS',
            date: '09:56 PM',
        },
        {
            id: 3,
            title: 'File Uploaded',
            description: 'Monica uploaded Doc1.pdf',
            date: '03:36 PM',
        },
    ];

    return (
        <React.Fragment>
            <div className="logs-card">
                <h5 className="mt-3">3rd April, 2018</h5>
                <div className="left-timeline mt-3 mb-3 pl-4">
                    <ul className="list-unstyled events mb-0">
                        {activities.map((item, idx) => {
                            return (
                                <li className="event-list" key={idx}>
                                    <Activity {...item} />
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <h5 className="mt-3">4th January, 2018</h5>
                <div className="left-timeline mt-3 mb-3 pl-4">
                    <ul className="list-unstyled events mb-0">
                        {activities.map((item, idx) => {
                            return (
                                <li className="event-list" key={idx}>
                                    <Activity {...item} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Activities;
