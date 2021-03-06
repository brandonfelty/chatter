import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
const rug = require('random-username-generator');

export default function Login( {onIdSubmit }) {
  const idRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()

    onIdSubmit(idRef.current.value)
  }

  const createNewUsername = () => {
    onIdSubmit(rug.generate())
  }

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter your Id</Form.Label>
          <Form.Control type='text' ref={idRef} required></Form.Control>
        </Form.Group>
        <Button type='submit'>Login</Button>
        <Button onClick={createNewUsername} variant='secondary'>Create a new Id</Button>
      </Form>
    </Container>
  )
}
