// mail service

// import { storageService } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailList'

// localStorage.clear()

const mailList = localStorage.getItem(MAIL_KEY) || createMails()

const loggedInUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus',
}

export const mailService = {
  MAIL_KEY,
  mailList,
  loggedInUser,
  getDefaultFilter,
  save,
  _setNextPrevMailId,
  get,
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
      isRead: true,
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
      isRead: true,
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
      isRead: true,
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
      isRead: true,
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
      isRead: true,
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
      isRead: true,
      isReceived: false,
      isFavorite: false,
      isSent: true,
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
      isReceived: true,
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

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    mail = _setNextPrevMailId(mail)
    return mail
  })
}

function _setNextPrevMailId(mail) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevMail = mails[mailIdx - 1]
      ? mails[mailIdx - 1]
      : mails[mails.length - 1]
    mail.nextMailId = nextMail.id
    mail.prevMailId = prevMail.id
    return mail
  })
}
