import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsContex'

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }
  return (
    <>
      <Modal.Header closeButton>Add Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nickname</Form.Label>
            <Form.Control type='text' ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>Add +</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
