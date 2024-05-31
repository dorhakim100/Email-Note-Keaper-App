// mail service

// import { storageService } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailList'
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
  // _setNextPrevMailId,
  get,
  getComposeFromSearchParams,
}

function createMails() {
  const mails = [
    {
      id: 'e101',
      subject: 'Miss you!',
      body: `Would love to catch up sometimes, They are enjoying their vacation in Hawaii. He is studying for his upcoming exams.
      She isn’t attending the party tonight.
      They‘re not participating in the competition.
      We aren’t going out for dinner this evening.
      He‘s not wearing a jacket despite the cold weather.`,
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },

    {
      id: 'e102',
      subject: `I'm happy.`,
      body: 'His dog barks loudly.',
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },

    {
      id: 'e103',
      subject: 'My school starts at 8:00.',
      body: 'We always eat dinner together.',
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
    {
      id: 'e104',
      subject: 'They take the bus to work.',
      body: `He doesn't like vegetables.`,
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
    {
      id: 'e105',
      subject: `I don’t want anything to drink.`,
      body: `Those kids don’t speak English.`,
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
    {
      id: 'e106',
      subject: 'They will not complete the assignment on time.',
      body: `We‘ll have dinner at a fancy restaurant tonight.`,
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
    {
      id: 'e107',
      subject: 'They are enjoying their vacation in Hawaii.',
      body: 'Fla plo love to catch up sometimes',
      isRead: true,
      isReceived: true,
      isFavorite: false,
      isSent: false,
      isDraft: false,
      isTrash: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'user@appsus.com',
      to: 'random2@user.com',
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
    {
      id: 'e109',
      subject: 'They are enjoying their vacation in Hawaii.',
      body: 'Thank you.',
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
    {
      id: 'e110',
      subject: `We aren’t going out for dinner this evening.`,
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
    {
      id: 'e111',
      subject: 'Thank you!',
      body: `We aren’t going out for dinner this evening.`,
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
      profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
        1,
        8
      )}.svg`,
    },
  ]

  storageService._save(MAIL_KEY, mails)

  return mails
}

function getDefaultFilter(filterBy = { txt: '', readStatus: 'All' }) {
  // console.log(filterBy)
  return { txt: '', readStatus: 'All' }
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
    // mail = _setNextPrevMailId(mail)
    return mail
  })
}

function getComposeFromSearchParams(searchParams) {
  return {
    to: +searchParams.get('to') || '',
    subject: searchParams.get('subject') || '',
    body: searchParams.get('body') || '',
  }
}

// function _setNextPrevMailId(mail) {
//   return storageService.query(MAIL_KEY).then((mails) => {
//     const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
//     const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
//     const prevMail = mails[mailIdx - 1]
//       ? mails[mailIdx - 1]
//       : mails[mails.length - 1]
//     mail.nextMailId = nextMail.id
//     mail.prevMailId = prevMail.id
//     return mail
//   })
// }
