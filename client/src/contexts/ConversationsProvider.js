import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContex = React.createContext()

export function useConversations() {
  return useContext(ConversationsContex)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [ selectConversationIndex, setSelectConversationIndex ] = useState(0)
  const { contacts } = useContacts()
  

  const createConversation = (recipients) => {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = ({ recipients, text, sender }) => {

  }

  const sendMessage = (recipients, text) => {
    addMessageToConversation({ recipients, text, sender: id })

  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })
    const selected = index === selectConversationIndex
    return { ...conversation, recipients, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectConversationIndex,
    createConversation
  }

  return (
    <ConversationsContex.Provider value={value}>
      {children}
    </ConversationsContex.Provider>
  )
}
