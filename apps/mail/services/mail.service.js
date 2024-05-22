// mail service

// import { storageService } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailList'

localStorage.clear()
console.log(localStorage.getItem(MAIL_KEY))

const mailList = localStorage.getItem(MAIL_KEY) || createMails()
console.log(mailList)

const loggedInUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus',
}

export const mailService = {
  MAIL_KEY,
  mailList,
  loggedInUser,
}

function createMails() {
  const received = [
    {
      id: 'e101',
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      isFavorite: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },

    {
      id: 'e102',
      subject: 'Bla you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      isFavorite: true,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },

    {
      id: 'e102',
      subject: 'Blo you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      isFavorite: true,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },
  ]
  const mails = {
    received: received,
    sent: [],
    draft: [],
    trash: [],
  }

  storageService._save(MAIL_KEY, mails)

  return mails
}

function getDefaultFilter(filterBy = { txt: '' }) {
  return { txt: filterBy.txt }
}
