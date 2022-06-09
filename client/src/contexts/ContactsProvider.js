import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContex = React.createContext()

export const useContacts = () => {
  return useContext(ContactsContex)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  const createContact = (id, name) => {
    setContacts(prevContacts => {
      return [...prevContacts, { id, name }]
    })
  }
  return (
    <ContactsContex.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContex.Provider>
  )
}
