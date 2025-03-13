const DICTIONARY_CONTENT = {
    TELEGRAM: 'Telegram',
    EMAIL: 'Email',
    PHONE: 'Телефон',
    ABOUT_ME: 'Обо мне',
    PORTFOLIO: 'Портфолио',
}

const DICTIONARY_LINKS = {
    EMAIL: 'akulichev.gamedesign@gmail.com',
    PHONE: '+79910548684',
    TELEGRAM: 'lDemoPlusl',
    ABOUT: '#about',
    PORTFOLIO: '#portfolio'
}

export const BURGER_MENU = [
    {
        id: 1,
        title: DICTIONARY_CONTENT.EMAIL,
        link: `mailto:${DICTIONARY_LINKS.EMAIL}`,
    },
    {
        id: 2,
        title: DICTIONARY_CONTENT.PHONE,
        link: `tel:${DICTIONARY_LINKS.PHONE}`,
    },
    {
        id: 3,
        title: DICTIONARY_CONTENT.TELEGRAM,
        link: `https://t.me/${DICTIONARY_LINKS.TELEGRAM}`,
        target: '_blank',
    },
    {
        id: 4,
        title: DICTIONARY_CONTENT.ABOUT_ME,
        link: DICTIONARY_LINKS.ABOUT,
    },
    {
        id: 5,
        title: DICTIONARY_CONTENT.PORTFOLIO,
        link: DICTIONARY_LINKS.PORTFOLIO,
    }
]

export const HERO_LINKS = [
    {
        id: 1,
        title: DICTIONARY_LINKS.EMAIL,
        link: `mailto:${DICTIONARY_LINKS.EMAIL}`,
    },
    {
        id: 2,
        title: DICTIONARY_LINKS.PHONE,
        link: `tel:${DICTIONARY_LINKS.PHONE}`,
    },
    {
        id: 3,
        title: DICTIONARY_LINKS.TELEGRAM,
        link: `https://t.me/${DICTIONARY_LINKS.TELEGRAM}`,
        target: '_blank',
    },
]