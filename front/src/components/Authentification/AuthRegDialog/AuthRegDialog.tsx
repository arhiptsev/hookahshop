import { Modal } from "react-bootstrap";
import React, { useState } from 'react';
import './AuthRegDialog.scss';
import { AuthRegTabs } from "../AuthRegTabs/AuthRegTabs";

export const AuthRegDialog = ({ onShow }) =>  {
    onShow(() => handleShow())

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Авторизация</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AuthRegTabs></AuthRegTabs>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}



