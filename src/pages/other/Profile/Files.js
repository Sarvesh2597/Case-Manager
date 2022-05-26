// @flow
import React from 'react';
import { Row, Col, Card, UncontrolledTooltip, Button } from 'reactstrap';
import { Loader } from 'react-feather';
import FileUploader from '../../../components/FileUploader';

// import { files } from './Data';

// File
const File = file => {
    return (
        <Card className="mb-2 shadow-none border">
            <div className="py-1 px-2">
                <Row className="align-items-center">
                    <Col className="col-auto">
                        <div className="avatar-sm font-weight-bold mr-3">
                            <span className="avatar-title rounded bg-soft-primary text-primary">
                                <i className="uil-file-plus-alt font-size-18"></i>
                            </span>
                        </div>
                    </Col>
                    <Col className="pl-0">
                        <a href="/" className="text-muted font-weight-bold">
                            {file.originalname}
                        </a>
                        <p className="mb-0">{file.size}</p>
                    </Col>
                    <Col className="col-auto">
                        <a href="/" className="btn btn-link text-muted btn-lg p-0" id={`download-${file.id}`}>
                            <i className="uil uil-cloud-download font-size-14"></i>
                        </a>
                        <UncontrolledTooltip placement="bottom" target={`download-${file.id}`}>
                            Download
                        </UncontrolledTooltip>
                        <a href="/" className="btn btn-link text-danger btn-lg p-0 ml-1" id={`delete-${file.id}`}>
                            <i className="uil uil-multiply font-size-14"></i>
                        </a>
                        <UncontrolledTooltip placement="bottom" target={`delete-${file.id}`}>
                            Delete
                        </UncontrolledTooltip>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

const Files = ({files, startFileUpload, onFileUpload}) => {
    console.log(files)
    return (
        <React.Fragment>
            <div className="files-card">
                {files.map((file, i) => {
                    return <File {...file} key={i} />;
                })}
            </div>

            <Row className="mb-3 mt-4 scrollable-card">
                <Col lg={2}></Col>
                <Col lg={8}>
                    <FileUploader
                        startFileUpload={startFileUpload}
                            onFileUpload={files => onFileUpload(files)}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Files;
