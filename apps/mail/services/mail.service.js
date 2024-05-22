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
  const mails = [
    {
      id: 'e101',
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      isReceived: true,
      isFavorite: true,
      isSent: false,
      isDraft: false,
      isTrash: false,
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
      isReceived: true,
      isFavorite: true,
      isSent: false,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },

    {
      id: 'e103',
      subject: 'Blo you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      isReceived: true,
      isFavorite: false,
      isSent: false,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },
    {
      id: 'e104',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: true,
      isFavorite: true,
      isSent: false,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },
    {
      id: 'e105',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: true,
      isFavorite: true,
      isSent: false,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },
    {
      id: 'e106',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: false,
      isFavorite: true,
      isSent: true,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'user@appsus.com',
      to: 'random@user.com',
    },
    {
      id: 'e107',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: false,
      isFavorite: false,
      isSent: true,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'user@appsus.com',
      to: 'random2@user.com',
    },
    {
      id: 'e108',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: false,
      isFavorite: false,
      isSent: true,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'user@appsus.com',
      to: 'momo@mimi.com',
    },
    {
      id: 'e109',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: false,
      isFavorite: false,
      isSent: false,
      isDraft: true,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },
    {
      id: 'e110',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: false,
      isFavorite: false,
      isSent: false,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },
    {
      id: 'e111',
      subject: 'Thank you!',
      body: 'Fla plo love to catch up sometimes',
      isRead: false,
      isReceived: false,
      isFavorite: false,
      isSent: false,
      isDraft: false,
      isTrash: true,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user@appsus.com',
    },
  ]

  storageService._save(MAIL_KEY, mails)

  return mails
}

function getDefaultFilter(filterBy = { txt: '' }) {
  return { txt: filterBy.txt }
}
