// mail service

import { storageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailList'

const mailList = storageService.loadFromStorage(MAIL_KEY) || createMails()

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
  if (!storageService.loadFromStorage(MAIL_KEY)) {
    const mails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
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
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
      },
    ]
    storageService.saveToStorage(MAIL_KEY, mails)
    return mails
  }
}
