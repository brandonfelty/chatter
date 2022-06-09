import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactedIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  const handleSubmit = (e) => {
    e.preventDefault()

    createConversation(selectedContactIds)
    closeModal()
  }

  const handleCheckboxChange = (contactId) => {
    setSelectedContactedIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }
  return (
    <>
    <Modal.Header closeButton>New Chat</Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        {contacts.map(contact => (
          <Form.Group controlId={contact.id} key={contact.id}>
            <Form.Check
              type='checkbox'
              value={selectedContactIds.includes(contact.id)}
              label={contact.name}
              onChange={() => handleCheckboxChange(contact.id)}
            />
          </Form.Group>
        ))}
        <Button type='submit'>Add +</Button>
      </Form>
    </Modal.Body>
  </>
  )
}
