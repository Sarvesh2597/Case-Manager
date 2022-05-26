import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { useEffect, useState } from 'react';
import FileUploader from '../../components/FileUploader';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../constants';

import Select from 'react-select';
import Flatpickr from 'react-flatpickr';

const CreateCase = () => {
    const [formData, setData] = useState({});
    const [toDashboard, toggleDashboard] = useState(false);
    const [submitDisabled, disableSubmit] = useState(false);
    const [toLogout, logout] = useState(false);
    const [loaded, toggleLoaded] = useState(false);
    const [dropdowns, setDropdowns] = useState({
        providers: [],
        admins: [],
        insurers: [],
    });

    useEffect(() => {
        callDropdownAPI();
    }, []);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const callDropdownAPI = () => {
        fetch(BASE_URL + '/api/dropdownfields', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
        })
            .then((res) => {
                if (res.status === 403) {
                    localStorage.clear();
                    logout(true);
                }
                return res.json();
            })
            .then((data) => {
                console.log('Success:', data);
                setDropdowns({
                    providers: data.providers.map((element) => {
                        return { value: element, label: element };
                    }),
                    insurers: data.insurers.map((element) => {
                        return { value: element, label: element };
                    }),
                    admins: data.admins.map((element) => {
                        return { value: element, label: element };
                    }),
                });
                toggleLoaded(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        createCase();
    };

    const getFormattedDate = (date) => {
        return date[0].getFullYear() + '-' + (date[0].getMonth() + 1) + '-' + date[0].getDate();
    };

    const createCase = () => {
        fetch(BASE_URL + '/api/case', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (res.status === 403) {
                    localStorage.clear();
                    logout(true);
                }
                return res.json();
            })
            .then((data) => {
                console.log('Success:', data);
                toggleDashboard(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    if (toDashboard) {
        return <Redirect to="/" />;
    }

    if (toLogout) {
        return <Redirect to="/account/logout" />;
    }

    if (!loaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <React.Fragment>
                <div className="spacer-30"></div>
                <Col lg={12}>
                    <Card>
                        <h4 className="card-title">Create Case</h4>
                        <AvForm onSubmit={handleSubmit}>
                            <CardBody className="scrollable-card">
                                <Row>
                                    <Col lg={6}>
                                        <AvGroup className="position-relative">
                                            <label>Provider:</label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                onChange={(e) => setData({ ...formData, provider: e.value })}
                                                //placeholder="Providers"
                                                options={dropdowns.providers}></Select>
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Claimant First Name:</label>
                                            <AvInput
                                                name="claimant first name"
                                                //placeholder="Claimant First Name"
                                                id="claimant-first-name"
                                                value={formData.claimantFirstName}
                                                onChange={(e) =>
                                                    setData({ ...formData, claimantFirstName: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Claimant Last Name:</label>
                                            <AvInput
                                                name="claimant last name"
                                                //placeholder="Claimant Last Name"
                                                id="claimant-last-name"
                                                value={formData.claimantLastName}
                                                onChange={(e) =>
                                                    setData({ ...formData, claimantLastName: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Claimant Address:</label>
                                            <AvInput
                                                name="claimant address"
                                                //placeholder="Claimant Last Name"
                                                id="claimant-address"
                                                value={formData.claimantAddress}
                                                onChange={(e) =>
                                                    setData({ ...formData, claimantAddress: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Insured First Name:</label>
                                            <AvInput
                                                name="insured first name"
                                                //placeholder="Injured First Name"
                                                id="insured-first-name"
                                                value={formData.insuredFirstName}
                                                onChange={(e) =>
                                                    setData({ ...formData, insuredFirstName: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Insured Last Name:</label>
                                            <AvInput
                                                name="insured last name"
                                                //placeholder="Injured Last Name"
                                                id="insured-last-name"
                                                value={formData.insuredLastName}
                                                onChange={(e) =>
                                                    setData({ ...formData, insuredLastName: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Insured Address:</label>
                                            <AvInput
                                                name="insured address"
                                                //placeholder="Injured Last Name"
                                                id="insured-address"
                                                value={formData.insuredAddress}
                                                onChange={(e) =>
                                                    setData({ ...formData, insuredAddress: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Policy No:</label>
                                            <AvInput
                                                name="policy-no"
                                                //placeholder="Policy No."
                                                id="policy-no"
                                                value={formData.policyNo}
                                                onChange={(e) => setData({ ...formData, policyNo: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Insurance Company:</label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                onChange={(e) => setData({ ...formData, insuranceCompany: e.value })}
                                                //placeholder="Insurance Company"
                                                options={dropdowns.insurers}></Select>
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Case Status:</label>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                onChange={(e) => setData({ ...formData, caseStatus: e.value })}
                                                //placeholder="Case Status"
                                                options={[
                                                    { value: 'Completed', label: 'Completed' },
                                                    { value: 'Filed', label: 'Filed' },
                                                    { value: 'Litigation', label: 'Litigation' },
                                                    { value: 'Not to file', label: 'Not to file' },
                                                    { value: 'Pulled Out', label: 'Pulled Out' },
                                                    { value: 'Hearing Schedule', label: 'Hearing Schedule' },
                                                    { value: 'Case Settled', label: 'Case Settled' },
                                                    { value: 'Arb Lost', label: 'Arb Lost' },
                                                    { value: 'Arb Won', label: 'Arb Won' },
                                                    { value: 'Query', label: 'Query' },
                                                ]}></Select>
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Claim Amount:</label>
                                            <AvInput
                                                name="claim amount"
                                                //placeholder="Insurance Claim No."
                                                id="claim-amount"
                                                value={formData.claimAmount}
                                                onChange={(e) => setData({ ...formData, claimAmount: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Paid:</label>
                                            <AvInput
                                                name="paid"
                                                //placeholder="Paid"
                                                id="paid"
                                                value={formData.paid}
                                                onChange={(e) => setData({ ...formData, paid: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Amount In Dispute:</label>
                                            <AvInput
                                                name="amount in dispute"
                                                //placeholder="Amount in Dispute"
                                                id="amount-in-dispute"
                                                value={formData.amountInDispute}
                                                onChange={(e) =>
                                                    setData({ ...formData, amountInDispute: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Insurance Claim No:</label>
                                            <AvInput
                                                name="insurance claim no"
                                                //placeholder="Insurance Claim No."
                                                id="insurance-claim-no"
                                                value={formData.insuranceClaimNo}
                                                onChange={(e) =>
                                                    setData({ ...formData, insuranceClaimNo: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            {/* <AvInput
                                            name="date of accident"
                                            
                                            //placeholder="Date of Accident"
                                            id="date-of-accident"
                                            value={formData.dateOfAccident}
                                            onChange={e => setData({ ...formData, dateOfAccident: e.target.value })} 
                                             
                                            />  */}

                                            <div className="form-group mb-sm-0 mr-2">
                                                <label>Date Of Accident:</label>
                                                <Flatpickr
                                                    value={new Date(formData.dateOfAccident)}
                                                    options={{
                                                        // altInput: true,
                                                        altFormat: 'F j, Y',
                                                        dateFormat: 'm/d/Y',
                                                        allowInput: true,
                                                    }}
                                                    onChange={(date) =>
                                                        setData({ ...formData, dateOfAccident: getFormattedDate(date) })
                                                    }
                                                    onClose={(selectedDates, dateStr, fp) => {
                                                        setData({
                                                            ...formData,
                                                            dateOfAccident: getFormattedDate([new Date(dateStr)]),
                                                        });
                                                    }}
                                                    placeholder="MM/DD/YYYY"
                                                    id="date-of-accident"
                                                    className="form-control"
                                                />
                                            </div>
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>AAA # :</label>
                                            <AvInput
                                                name="aaa number"
                                                //placeholder="AAA #"
                                                id="aaa-number"
                                                value={formData.AAA}
                                                onChange={(e) => setData({ ...formData, AAA: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            {/* <AvInput
                                            name="aaa award date"
                                            //placeholder="AAA Award Date"
                                            id="aaa-award-date"
                                            value={formData.AAA_awardDate}
                                            onChange={e => setData({ ...formData, AAA_awardDate: e.target.value })}
                                        /> */}
                                            <div className="form-group mb-sm-0 mr-2">
                                                <label>AAA Award Date:</label>
                                                <Flatpickr
                                                    value={new Date(formData.AAA_awardDate)}
                                                    options={{
                                                        //   altInput: true,
                                                        altFormat: 'F j, Y',
                                                        dateFormat: 'm/d/Y',
                                                        allowInput: true,
                                                    }}
                                                    onClose={(selectedDates, dateStr, fp) => {
                                                        setData({
                                                            ...formData,
                                                            AAA_awardDate: getFormattedDate([new Date(dateStr)]),
                                                        });
                                                    }}
                                                    onChange={(date) =>
                                                        setData({ ...formData, AAA_awardDate: getFormattedDate(date) })
                                                    }
                                                    id="aaa-award-date"
                                                    placeholder="MM/DD/YYYY"
                                                    className="form-control"
                                                />
                                            </div>
                                        </AvGroup>
                                        <Row>
                                            <Col lg={6}>
                                                <AvGroup className="position-relative">
                                                    {/* <AvInput
                                                    name="min-date of service"
                                                    //placeholder="Min-Date of Service"
                                                    id="min-date-of-service"
                                                    value={formData.minDateOfService}
                                                    onChange={e =>
                                                        setData({ ...formData, minDateOfService: e.target.value })
                                                    }
                                                /> */}
                                                    <label>Min Date Of Service:</label>
                                                    <Flatpickr
                                                        name="min-date of service"
                                                        options={{
                                                            //   altInput: true,
                                                            altFormat: 'F j, Y',
                                                            dateFormat: 'm/d/Y',
                                                            allowInput: true,
                                                        }}
                                                        value={new Date(formData.minDateOfService)}
                                                        onClose={(selectedDates, dateStr, fp) => {
                                                            setData({
                                                                ...formData,
                                                                minDateOfService: getFormattedDate([new Date(dateStr)]),
                                                            });
                                                        }}
                                                        onChange={(date) =>
                                                            setData({
                                                                ...formData,
                                                                minDateOfService: getFormattedDate(date),
                                                            })
                                                        }
                                                        placeholder="MM/DD/YYYY"
                                                        id="min-date of service"
                                                        className="form-control"
                                                    />
                                                </AvGroup>
                                            </Col>
                                            <Col lg={6}>
                                                <AvGroup className="position-relative">
                                                    <label>Max Date Of Service:</label>
                                                    <Flatpickr
                                                        name="max-date of service"
                                                        options={{
                                                            // //altInput: true,
                                                            altFormat: 'F j, Y',
                                                            dateFormat: 'm/d/Y',
                                                            allowInput: true,
                                                        }}
                                                        //placeholder=" Max-Date of Service"
                                                        id="max-date-of-service"
                                                        className="form-control"
                                                        value={new Date(formData.maxDateOfService)}
                                                        placeholder="MM/DD/YYYY"
                                                        onClose={(selectedDates, dateStr, fp) => {
                                                            setData({
                                                                ...formData,
                                                                maxDateOfService: getFormattedDate([new Date(dateStr)]),
                                                            });
                                                        }}
                                                        onChange={(date) =>
                                                            setData({
                                                                ...formData,
                                                                maxDateOfService: getFormattedDate(date),
                                                            })
                                                        }
                                                    />
                                                </AvGroup>
                                            </Col>
                                        </Row>

                                        <AvGroup className="position-relative">
                                            <label>Case Age:</label>
                                            <AvInput
                                                name="case age"
                                                //placeholder=" Case Age"
                                                id="case-age"
                                                value={formData.caseAge}
                                                onChange={(e) => setData({ ...formData, caseAge: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Interest:</label>
                                            <AvInput
                                                name="interest"
                                                //placeholder=" Case Age"
                                                id="interest"
                                                value={formData.interest}
                                                onChange={(e) => setData({ ...formData, interest: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Number of Bills:</label>
                                            <AvInput
                                                name="number of bills"
                                                //placeholder=" Case Age"
                                                id="number-of-bills"
                                                value={formData.numberOfBills}
                                                onChange={(e) =>
                                                    setData({ ...formData, numberOfBills: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Attorney Fee:</label>
                                            <AvInput
                                                name="attorney fee"
                                                //placeholder=" Case Age"
                                                id="attorney-fee"
                                                value={formData.attorneyFee}
                                                onChange={(e) => setData({ ...formData, attorneyFee: e.target.value })}
                                            />
                                        </AvGroup>
                                    </Col>

                                    <Col lg={6}>
                                        <AvGroup className="position-relative">
                                            <label>Arbitrary:</label>
                                            <AvInput
                                                name="arbitrary"
                                                //placeholder="Arbitrary"
                                                id="arbitrary"
                                                value={formData.arbitary}
                                                onChange={(e) => setData({ ...formData, arbitary: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Adjuster:</label>
                                            <AvInput
                                                name="adjuster"
                                                //placeholder="Adjuster"
                                                id="adjuster"
                                                value={formData.adjuster}
                                                onChange={(e) => setData({ ...formData, adjuster: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Representative Contact:</label>
                                            <AvInput
                                                name="representative contact"
                                                //placeholder="Representative Contact"
                                                id="representative-contact"
                                                value={formData.representativeContact}
                                                onChange={(e) =>
                                                    setData({ ...formData, representativeContact: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Service Rendered Location:</label>
                                            <AvInput
                                                name="service rendered location"
                                                //placeholder="Service Rendered Location"
                                                id="service-rendered-location"
                                                value={formData.serviceRenderedLocation}
                                                onChange={(e) =>
                                                    setData({ ...formData, serviceRenderedLocation: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Hearing Date:</label>
                                            <Flatpickr
                                                name="hearing date"
                                                options={{
                                                    //altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="hearing-date"
                                                value={new Date(formData.hearingDate)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        hearingDate: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, hearingDate: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Defendant Attorney File No:</label>
                                            <AvInput
                                                name="defendant attorney file no"
                                                //placeholder="Defendant Attorney File No."
                                                id="defendant-attorney-file-no"
                                                value={formData.DefendantAttorneyFileNo}
                                                onChange={(e) =>
                                                    setData({ ...formData, DefendantAttorneyFileNo: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Settlement Adjuster:</label>
                                            <AvInput
                                                name="settlement adjuster"
                                                //placeholder="Settlement Notice"
                                                id="settlement-adjuster"
                                                value={formData.settlementAdjuster}
                                                onChange={(e) =>
                                                    setData({ ...formData, settlementAdjuster: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Settlement Amount:</label>
                                            <AvInput
                                                name="settlement amount"
                                                //placeholder="Settlement Notice"
                                                id="settlement-amount"
                                                value={formData.settlementAmount}
                                                onChange={(e) =>
                                                    setData({ ...formData, settlementAmount: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Settlement Date:</label>
                                            <Flatpickr
                                                name="settlement date"
                                                options={{
                                                    //   altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                //placeholder="Date Bills Submitted"
                                                className="form-control"
                                                placeholder="MM/DD/YYYY"
                                                id="settlement-date"
                                                value={new Date(formData.settlementDate)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        settlementDate: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, settlementDate: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Settlement Offer Date:</label>
                                            <Flatpickr
                                                name="settlement offer date"
                                                options={{
                                                    //   altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="settlement-offer-date"
                                                value={new Date(formData.settlementOfferDate)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        settlementOfferDate: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({
                                                        ...formData,
                                                        settlementOfferDate: getFormattedDate(date),
                                                    })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Settlement Notice:</label>
                                            <AvInput
                                                name="settlement notice"
                                                //placeholder="Settlement Notice"
                                                id="settlement-notice"
                                                value={formData.settlementNotice}
                                                onChange={(e) =>
                                                    setData({ ...formData, settlementNotice: e.target.value })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Date Bills Sent Start:</label>
                                            <Flatpickr
                                                name="date bills sent Start"
                                                options={{
                                                    // altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="date-bills-sent-start"
                                                value={new Date(formData.dateBillSentStart)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        dateBillSentStart: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, dateBillSentStart: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Date Bill Sent End:</label>
                                            <Flatpickr
                                                name="date bill sent end"
                                                options={{
                                                    //     altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="date-bill-sent-end"
                                                value={new Date(formData.dateBillSentEnd)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        dateBillSentEnd: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, dateBillSentEnd: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Date AAA ARB Filed:</label>
                                            <Flatpickr
                                                options={{
                                                    //  altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                name="date aaa arb filed"
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="date-aaa-arb-filed"
                                                value={new Date(formData.date_AAA_ARB_field)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        date_AAA_ARB_field: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, date_AAA_ARB_field: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Denial Reason:</label>
                                            <AvInput
                                                name="denial reason"
                                                //placeholder="Paid"
                                                id="denial-reason"
                                                value={formData.denialReason}
                                                onChange={(e) => setData({ ...formData, denialReason: e.target.value })}
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Date Extension:</label>
                                            <Flatpickr
                                                options={{
                                                    //   altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                name="date extension"
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="date-extension"
                                                value={new Date(formData.dateExtension)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        dateExtension: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, dateExtension: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>AAA Confirmed Date:</label>
                                            <Flatpickr
                                                options={{
                                                    //  altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                name="aaa confirmed date"
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="aaa-confirmed-date"
                                                value={new Date(formData.AAA_ConfirmedDate)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        AAA_ConfirmedDate: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, AAA_ConfirmedDate: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Date Affidavit Filed:</label>
                                            <Flatpickr
                                                options={{
                                                    //     altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                name="date affidavit filed"
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="date-affidavit-filed"
                                                value={new Date(formData.dateAffidavitField)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        dateAffidavitField: getFormattedDate([new Date(dateStr)]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({ ...formData, dateAffidavitField: getFormattedDate(date) })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Date AAA Response Received:</label>
                                            <Flatpickr
                                                options={{
                                                    //   altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                name="date aaa response recieved"
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="date-aaa-response-recieved"
                                                value={new Date(formData.date_AAA_response_received)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        date_AAA_response_received: getFormattedDate([
                                                            new Date(dateStr),
                                                        ]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({
                                                        ...formData,
                                                        date_AAA_response_received: getFormattedDate(date),
                                                    })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Date AAA Conciliation Over:</label>
                                            <Flatpickr
                                                options={{
                                                    //  altInput: true,
                                                    altFormat: 'F j, Y',
                                                    dateFormat: 'm/d/Y',
                                                    allowInput: true,
                                                }}
                                                name="date aaa conciliation over"
                                                placeholder="MM/DD/YYYY"
                                                className="form-control"
                                                id="date-aaa-conciliatio-over"
                                                value={new Date(formData.date_AAA_concilliationOver)}
                                                onClose={(selectedDates, dateStr, fp) => {
                                                    setData({
                                                        ...formData,
                                                        date_AAA_concilliationOver: getFormattedDate([
                                                            new Date(dateStr),
                                                        ]),
                                                    });
                                                }}
                                                onChange={(date) =>
                                                    setData({
                                                        ...formData,
                                                        date_AAA_concilliationOver: getFormattedDate(date),
                                                    })
                                                }
                                            />
                                        </AvGroup>

                                        <AvGroup className="position-relative">
                                            <label>Court Name:</label>
                                            <AvInput
                                                name="court name"
                                                //placeholder=" Case Age"
                                                id="court-name"
                                                value={formData.courtName}
                                                onChange={(e) => setData({ ...formData, courtName: e.target.value })}
                                            />
                                        </AvGroup>
                                    </Col>
                                </Row>

                                <Row className="card-center mt-5">
                                    <FileUploader
                                        startFileUpload={() => {
                                            disableSubmit(true);
                                        }}
                                        onFileUpload={(files) => {
                                            setData({ ...formData, files: files });
                                            disableSubmit(false);
                                        }}
                                    />
                                </Row>
                            </CardBody>

                            <div className="card-footer">
                                <Button color="primary" type="submit" disabled={submitDisabled}>
                                    Submit
                                </Button>
                            </div>
                        </AvForm>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
};

export default CreateCase;
