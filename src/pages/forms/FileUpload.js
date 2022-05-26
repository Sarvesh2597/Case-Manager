import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { UncontrolledButtonDropdown, DropdownToggle } from 'reactstrap';

import FileUploader from '../../components/FileUploader';

const FileUpload = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                  
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>

                        <CardBody>
                        <h2>Upload Case FIles</h2>

                            <FileUploader
                                onFileUpload={files => {
                                    console.log(files);
                                }}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <UncontrolledButtonDropdown>
                                    <DropdownToggle color="primary"  className = "dropdown-toggle mx-1">Upload
                                           
                                    </DropdownToggle>
                                  
                                </UncontrolledButtonDropdown>
        </React.Fragment>
    );
};

export default FileUpload;
