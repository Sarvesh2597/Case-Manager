import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Progress } from 'reactstrap';
import { Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import { BASE_URL } from '../../../constants';
import { Redirect } from 'react-router-dom';

const UserBox = ({ passedCase, onSave }) => {
    delete passedCase.files;
    const [caseObj, setCase] = useState(passedCase);
    const [toLogout, logout] = useState(false);
    const [loaded, toggleLoaded] = useState(false);
    const [dropdowns, setDropdowns] = useState({
        providers: [],
        admins: [],
        insurers: [],
    });

    console.log(caseObj);
    const saveClicked = () => {
        console.log(caseObj.injuredLastName);
        onSave(caseObj);
    };

    useEffect(() => {
        callDropdownAPI();
    }, []);

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

    const getFormattedDate = (date) => {
        return date[0].getFullYear() + '-' + (date[0].getMonth() + 1) + '-' + date[0].getDate();
    };

    if (toLogout) {
        return <Redirect to="/account/logout" />;
    }

    if (!passedCase && !loaded) {
        return <div>Loading...</div>;
    }
    return (
        <React.Fragment>
            <Col lg={12}>
                <Card>
                    <h4 className="card-title">Case Id: {caseObj.caseId}</h4>
                    <AvForm>
                        <CardBody className="scrollable-card">
                            <Row>
                                <Col lg={6}>
                                    <AvGroup className="position-relative">
                                        <label>Provider:</label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            value={{ value: caseObj.provider, label: caseObj.provider }}
                                            onChange={(e) => setCase({ ...caseObj, provider: e.value })}
                                            //placeholder="Providers"
                                            options={dropdowns.providers}></Select>
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Claimant First Name:</label>
                                        <AvInput
                                            name="claimant-first-name"
                                            //placeholder="Claimant First Name"
                                            id="claimant-first-name"
                                            required
                                            value={caseObj.claimantFirstName}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, claimantFirstName: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Claimant Last Name:</label>
                                        <AvInput
                                            name="claimant-last-name"
                                            //placeholder="Claimant Last Name"
                                            id="claimant-first-name"
                                            required
                                            value={caseObj.claimantLastName}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, claimantLastName: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Claimant Address:</label>
                                        <AvInput
                                            name="Claimant Address"
                                            //placeholder="Claimant Last Name"
                                            id="claimant-address"
                                            required
                                            value={caseObj.claimantAddress}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, claimantAddress: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Insured First Name:</label>
                                        <AvInput
                                            name="Insured first name"
                                            //placeholder="Injured First Name"
                                            id="insured-first-name"
                                            required
                                            value={caseObj.insuredFirstName}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, insuredFirstName: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Insured Last Name:</label>
                                        <AvInput
                                            name="insured last name"
                                            //placeholder="Injured Last Name"
                                            id="insured-last-name"
                                            required
                                            value={caseObj.insuredLastName}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, insuredLastName: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Insured Address:</label>
                                        <AvInput
                                            name="insured address"
                                            //placeholder="Injured Last Name"
                                            id="insured-address"
                                            required
                                            value={caseObj.insuredAddress}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, insuredAddress: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Policy No:</label>
                                        <AvInput
                                            name="policy-no"
                                            //placeholder="Policy No."
                                            id="policy-no"
                                            required
                                            value={caseObj.policyNo}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, policyNo: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Insurance Company:</label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            value={{ value: caseObj.insuranceCompany, label: caseObj.insuranceCompany }}
                                            onChange={(e) => setCase({ ...caseObj, insuranceCompany: e.value })}
                                            //placeholder="Insurance Company"
                                            options={dropdowns.insurers}></Select>
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Case Status:</label>
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            value={{ value: caseObj.caseStatus, label: caseObj.caseStatus }}
                                            onChange={(e) => setCase({ ...caseObj, caseStatus: e.value })}
                                            //placeholder="Case Status"
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
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Claim Amount:</label>
                                        <AvInput
                                            name="claim amount"
                                            //placeholder="Insurance Claim No."
                                            id="claim-amount"
                                            required
                                            value={caseObj.claimAmount}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, claimAmount: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Paid:</label>
                                        <AvInput
                                            name="paid"
                                            //placeholder="Paid"
                                            id="paid"
                                            required
                                            value={caseObj.paid}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, paid: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Amount in Despute:</label>
                                        <AvInput
                                            name="amount in dispute"
                                            //placeholder="Amount in Dispute"
                                            id="amount-in-dispute"
                                            required
                                            value={caseObj.amountInDispute}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, amountInDispute: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Insurance Claim No:</label>
                                        <AvInput
                                            name="insurance claim no"
                                            //placeholder="Insurance Claim No."
                                            id="insurance-claim-no"
                                            required
                                            value={caseObj.insuranceClaimNo}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, insuranceClaimNo: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Date of Accident:</label>
                                        <Flatpickr
                                            value={new Date(caseObj.dateOfAccident)}
                                            options={{
                                                //  altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, dateOfAccident: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    dateOfAccident: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                            placeholder="MM/DD/YYYY"
                                            id="date-of-accident"
                                            className="form-control"
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>AAA # :</label>
                                        <AvInput
                                            name="aaa number"
                                            //placeholder="AAA #"
                                            id="aaa-number"
                                            required
                                            value={caseObj.AAA}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, AAA: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>AAA Award Date:</label>
                                        <Flatpickr
                                            value={new Date(caseObj.AAA_awardDate)}
                                            options={{
                                                //  altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, AAA_awardDate: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    AAA_awardDate: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                            id="aaa-award-date"
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Case Age:</label>
                                        <AvInput
                                            name="case age"
                                            //placeholder="Case Age"
                                            id="case-age"
                                            required
                                            value={caseObj.caseAge}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, caseAge: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Interest:</label>
                                        <AvInput
                                            name="interest"
                                            //placeholder="Case Age"
                                            id="interest"
                                            required
                                            value={caseObj.interest}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, interest: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Number of Bills:</label>
                                        <AvInput
                                            name="number of bills"
                                            //placeholder="Case Age"
                                            id="number-of-bills"
                                            required
                                            value={caseObj.numberOfBills}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, numberOfBills: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Minimum Date of Service:</label>
                                        <Flatpickr
                                            name="min-date of service"
                                            options={{
                                                //  altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            value={new Date(caseObj.minDateOfService)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, minDateOfService: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    minDateOfService: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                            placeholder="MM/DD/YYYY"
                                            id="min-date of service"
                                            className="form-control"
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Maximum Date of Service:</label>
                                        <Flatpickr
                                            name="max-date of service"
                                            options={{
                                                // altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            placeholder="MM/DD/YYYY"
                                            id="max-date-of-service"
                                            className="form-control"
                                            value={new Date(caseObj.maxDateOfService)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, maxDateOfService: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    maxDateOfService: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
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
                                            required
                                            value={caseObj.arbitary}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, arbitary: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Adjuster:</label>
                                        <AvInput
                                            name="adjuster"
                                            //placeholder="Adjuster"
                                            id="adjuster"
                                            required
                                            value={caseObj.adjuster}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, adjuster: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Representative Contact:</label>
                                        <AvInput
                                            name="representative contact"
                                            //placeholder="Representative Contact"
                                            id="representative-contact"
                                            required
                                            value={caseObj.representativeContact}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, representativeContact: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Service Rendered Location:</label>
                                        <AvInput
                                            name="service rendered location"
                                            //placeholder="Service Rendered Location"
                                            id="service-rendered-location"
                                            required
                                            value={caseObj.serviceRenderedLocation}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, serviceRenderedLocation: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Hearing Date:</label>
                                        <Flatpickr
                                            name="hearing date"
                                            options={{
                                                //  altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="hearing-date"
                                            value={new Date(caseObj.hearingDate)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, hearingDate: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    hearingDate: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Defendant Attorney File No:</label>
                                        <AvInput
                                            name="defendant attorney file no"
                                            //placeholder="Defendant Attorney File No."
                                            id="defendant-attorney-file-no"
                                            required
                                            value={caseObj.DefendantAttorneyFileNo}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, DefendantAttorneyFileNo: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Settlement Adjuster:</label>
                                        <AvInput
                                            name="settlement adjuster"
                                            //placeholder="Settlement Notice"
                                            id="settlement-adjuster"
                                            required
                                            value={caseObj.settlementAdjuster}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, settlementAdjuster: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Settlement Amount:</label>
                                        <AvInput
                                            name="settlement amount"
                                            //placeholder="Settlement Notice"
                                            id="settlement-amount"
                                            required
                                            value={caseObj.settlementAmount}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, settlementAmount: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Settlement Date:</label>
                                        <Flatpickr
                                            name="settlement date"
                                            options={{
                                                //  altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="settlement-date"
                                            value={new Date(caseObj.settlementDate)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, settlementDate: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    settlementDate: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
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
                                            value={new Date(caseObj.settlementOfferDate)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, settlementOfferDate: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    settlementOfferDate: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Settlement Notice:</label>
                                        <AvInput
                                            name="settlement notice"
                                            //placeholder="Settlement Notice"
                                            id="settlement-notice"
                                            required
                                            value={caseObj.settlementNotice}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, settlementNotice: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Date Bills Sent Start:</label>
                                        <Flatpickr
                                            name="date bills sent start"
                                            options={{
                                                //   altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="date-bills-sent-start"
                                            value={new Date(caseObj.dateBillSentStart)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, dateBillSentStart: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    dateBillSentStart: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Date Bill Sent End:</label>
                                        <Flatpickr
                                            options={{
                                                // altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            name="date bill sent end"
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="date-bill-sent-end"
                                            value={new Date(caseObj.dateBillSentEnd)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, dateBillSentEnd: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    dateBillSentEnd: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Date AAA ARB filed:</label>
                                        <Flatpickr
                                            options={{
                                                //   altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            name="date aaa arb filed"
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="date-aaa-arb-filed"
                                            value={new Date(caseObj.date_AAA_ARB_field)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, date_AAA_ARB_field: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    date_AAA_ARB_field: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Denial Reason:</label>
                                        <AvInput
                                            name="denial reason"
                                            //placeholder="Paid"
                                            id="denial-reason"
                                            required
                                            value={caseObj.denialReason}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, denialReason: e.target.value });
                                            }}
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
                                            value={new Date(caseObj.dateExtension)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, dateExtension: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    dateExtension: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>AAA Confirmed Date:</label>
                                        <Flatpickr
                                            options={{
                                                //   altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            name="aaa confirmed date"
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="aaa-confirmed-date"
                                            value={new Date(caseObj.AAA_ConfirmedDate)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, AAA_ConfirmedDate: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    AAA_ConfirmedDate: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Date Affidavit Filed:</label>
                                        <Flatpickr
                                            options={{
                                                //  altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            name="date affidavit filed"
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="date-affidavit-filed"
                                            value={new Date(caseObj.dateAffidavitField)}
                                            onChange={(date) =>
                                                setCase({ ...caseObj, dateAffidavitField: getFormattedDate(date) })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    dateAffidavitField: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Date AAA Response Received:</label>
                                        <Flatpickr
                                            options={{
                                                //  altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            name="date aaa response recieved"
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="date-aaa-response-recieved"
                                            value={new Date(caseObj.date_AAA_response_received)}
                                            onChange={(date) =>
                                                setCase({
                                                    ...caseObj,
                                                    date_AAA_response_received: getFormattedDate(date),
                                                })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    date_AAA_response_received: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Date AAA Conciliation Over:</label>
                                        <Flatpickr
                                            options={{
                                                // altInput: true,
                                                altFormat: 'F j, Y',
                                                dateFormat: 'm/d/Y',
                                                allowInput: true,
                                            }}
                                            name="date aaa conciliation over"
                                            placeholder="MM/DD/YYYY"
                                            className="form-control"
                                            id="date-aaa-conciliatio-over"
                                            value={new Date(caseObj.date_AAA_concilliationOver)}
                                            onChange={(date) =>
                                                setCase({
                                                    ...caseObj,
                                                    date_AAA_concilliationOver: getFormattedDate(date),
                                                })
                                            }
                                            onClose={(selectedDates, dateStr, fp) => {
                                                setCase({
                                                    ...caseObj,
                                                    date_AAA_concilliationOver: getFormattedDate([new Date(dateStr)]),
                                                });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Attorney Fee:</label>
                                        <AvInput
                                            name="attorney fee"
                                            //placeholder="Arbitrary"
                                            id="attorney-fee"
                                            required
                                            value={caseObj.attorneyFee}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, attorneyFee: e.target.value });
                                            }}
                                        />
                                    </AvGroup>

                                    <AvGroup className="position-relative">
                                        <label>Court Name:</label>
                                        <AvInput
                                            name="court name"
                                            //placeholder="Case Age"
                                            id="court-name"
                                            required
                                            value={caseObj.courtName}
                                            onChange={(e) => {
                                                setCase({ ...caseObj, courtName: e.target.value });
                                            }}
                                        />
                                    </AvGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </AvForm>

                    <div className="card-footer">
                        <Button color="primary" type="submit" onClick={saveClicked}>
                            Save
                        </Button>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default UserBox;
