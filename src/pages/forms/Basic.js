import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CustomInput, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import Select from 'react-select';
import { BASE_URL } from '../../constants';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
//import Flatpickr from 'react-flatpickr';

const HorizontalForm = ({ paramQuery }) => {
    const [query, setQuery] = useState({
        caseId: '',
        claimantFirstName: '',
        claimantLastName: '',
        policyNo: '',
        AAA: '',
        insuranceClaimNo: '',
        dateOfAccident: '',
    });
    //   const [formData, setData] = useState({});
    //  const [toDashboard, toggleDashboard] = useState(false);
    //  const [submitDisabled, disableSubmit] = useState(false);
    const [toLogout, logout] = useState(false);
    const [loaded, toggleLoaded] = useState(false);
    const [dropdowns, setDropdowns] = useState({
        providers: [],
        insurers: [],
    });

    useEffect(() => {
        callDropdownAPI();
    }, []);

    useEffect(() => {
        console.log(query);
    }, [query]);

    const callDropdownAPI = () => {
        fetch(BASE_URL + '/api/dropdownfields', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
        })
            .then(res => {
                if (res.status === 403) {
                    localStorage.clear();
                    logout(true);
                }
                return res.json();
            })
            .then(data => {
                console.log('Success:', data);
                setDropdowns({
                    providers: data.providers.map(element => {
                        return { value: element, label: element };
                    }),
                    insurers: data.insurers.map(element => {
                        return { value: element, label: element };
                    }),
                    //  admins: data.admins.map(element => { return { value: element, label: element } }),
                });
                toggleLoaded(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    // const handleSubmit = event => {
    //     HorizontalForm();
    // };

    const submitClicked = () => {
        paramQuery(query);
    };

    // const getFormattedDate = date => {
    //     return date[0].getFullYear() + '-' + (date[0].getMonth() + 1) + '-' + date[0].getDate();
    // };
    // const HorizontalForm = () => {
    //     fetch(BASE_URL + '/api/case', {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    //         },
    //         body: JSON.stringify(query),
    //     })
    //         .then(res => {
    //             if (res.status === 403) {
    //                 localStorage.clear();
    //                 logout(true);
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log('Success:', data);
    //             toggleDashboard(true);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // };
    // if (toDashboard) {
    //     return <Redirect to="/" />;
    // }

    if (toLogout) {
        return <Redirect to="/account/logout" />;
    }

    // if (!loaded) {
    //     return <div>Loading...</div>;
    // } else {
    return (
        <Card>
            <h5 className="text-center mb-2">Advanced Search</h5>

            <CardBody className="scrollable-card2">
                <Form className=" pl-3 pr-3">
                    <FormGroup row>
                        <Input
                            type="text"
                            placeholder="Case ID"
                            value={query.caseId}
                            onChange={e => setQuery({ ...query, caseId: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Input
                            type="text"
                            placeholder="Claimant First Name"
                            value={query.claimantFirstName}
                            onChange={e => setQuery({ ...query, claimantFirstName: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Input
                            type="text"
                            placeholder="Claimant Last Name"
                            value={query.claimantLastName}
                            onChange={e => setQuery({ ...query, claimantLastName: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Input
                            type="text"
                            placeholder="Policy Number"
                            value={query.policyNo}
                            onChange={e => setQuery({ ...query, policyNo: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Input
                            type="text"
                            placeholder="AAA Number"
                            value={query.AAA}
                            onChange={e => setQuery({ ...query, AAA: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Input
                            type="text"
                            placeholder="Claim Number"
                            value={query.insuranceClaimNo}
                            onChange={e => setQuery({ ...query, insuranceClaimNo: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup row>
                        <Input
                            type="text"
                            placeholder="Date of Accident"
                            value={query.dateOfAccident}
                            onChange={e => setQuery({ ...query, dateOfAccident: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup Row>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            onChange={e => setQuery({ ...query, provider: e.value })}
                            placeholder="Provider"
                            options={dropdowns.providers}></Select>
                    </FormGroup>

                    <FormGroup>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            onChange={e => setQuery({ ...query, insuranceCompany: e.value })}
                            placeholder="Insurance"
                            options={dropdowns.insurers}></Select>
                    </FormGroup>

                    <FormGroup>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            onChange={e => setQuery({ ...query, caseStatus: e.value })}
                            placeholder="Case Status"
                            options={[
                                { value: 'Completed', label: 'Completed' },
                                { value: 'Filed', label: 'Filed' },
                                { value: 'Litigation', label: 'Litigation' },
                                { value: 'Not to file', label: 'Not to file' },
                                { value: 'Pulled Out', label: 'Pulled Out' },
                                { value: 'Query', label: 'Query' },
                                { value: 'Hearing Schedule', label: 'Hearing Schedule' },
                                { value: 'Case Settled', label: 'Case Settled' },
                                { value: 'Arb Lost', label: 'Arb Lost' },
                                { value: 'Arb Won', label: 'Arb Won' },
                            ]}></Select>
                    </FormGroup>
                </Form>

                <div className="card-center">
                    <Button color="primary" type="submit" onClick={submitClicked}>
                        Submit
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
    // }
};

export default HorizontalForm;
