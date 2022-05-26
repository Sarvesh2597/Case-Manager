import React from 'react';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { components } from 'react-select';

const records = [
    {
        CaseId: 19523,
        patient: 'Joan Rolfe',
        provider: 'GEICO',
        insurance: 'Allstate Insurance Company',
        claimAmount: 1000,
        claimNo: 11,
        status: 'open',
    },
    {
        CaseId: 19525,
        patient: 'Michelle Johnson',
        provider: 'GEICO',
        insurance: 'Allstate Insurance Company',
        claimAmount: 1000,
        claimNo: 11,
        status: 'open',
    },
    {
        CaseId: 19526,
        patient: 'Max Smith',
        provider: 'GEICO',
        insurance: 'Allstate Insurance Company',
        claimAmount: 1000,
        claimNo: 11,
        status: 'open',
    },
    {
        CaseId: 19521,
        patient: 'Glenn Maxwell',
        provider: 'GEICO',
        insurance: 'Allstate Insurance Company',
        claimAmount: 1000,
        claimNo: 11,
        status: 'open',
    },
    {
        CaseId: 19533,
        patient: 'Aaron Finch',
        provider: 'GEICO',
        insurance: 'Allstate Insurance Company',
        claimAmount: 1000,
        claimNo: 11,
        status: 'open',
    },
];

function downloadClick() {
    console.log('clicked');
}

const StripedRowsTable = ({ data }) => {
    console.log(data);
    return (
        <Card>
            <CardBody>
                <Table className="mb-0 mt-0" striped responsive>
                    <thead>
                        <tr>
                            <th>Case ID</th>
                            <th>Patient</th>
                            <th>Provider</th>
                            <th>Insurance</th>
                            <th>Claim Amount</th>
                            <th>Claim No.</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.caseId}</th>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: '/pages/profile/' + record.caseId,
                                            }}>{`${record.insuredFirstName} ${record.insuredLastName}`}</Link>
                                    </td>
                                    <td>{record.provider}</td>
                                    <td>{record.insuranceCompany}</td>
                                    <td>{record.amountInDispute}</td>
                                    <td>{record.insuranceClaimNo}</td>
                                    <td>{record.caseStatus}</td>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: '/pages/A1form/' + record.caseId,
                                            }}>
                                            <i className="uil uil-down-arrow ml-4"></i>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

const Tables = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <StripedRowsTable data={props.data} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Tables;
