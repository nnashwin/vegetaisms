const vegetaisms = require('./data/en.json');
const languages = new Set([
    'en'
]);

const repoUrl = "https://github.com/ru-lai/vegetaisms";

function getLocalizedList(lang) {
    if (!lang || lang === 'en') {
        return vegetaisms;
    }

    if (!languages.has(lang)) {
        throw new Error(`The localization list does not have the language ${lang}.  Please make a pull request to see your language here! ${repoUrl}`);
    }

    return require(`./data/${lang.toLowerCase()}`);
}

const getRandomQuote = lang => {
    const list = getLocalizedList(lang);

    return list[Math.floor(Math.random() * list.length)];
}

function getQuoteById(id, lang) {
    const list = getLocalizedList(lang);
    // subtract by one in order to factor in Arrays starting from 0
    const quote = list[id - 1];

    if (!quote) {
        throw new Error(`Quote with the id ${id} does not exist`);
    }

    return quote;
}

function getIdByQuote(quote, lang) {
    const list = getLocalizedList(lang);

    const id = list.indexOf(quote);

    if (id === -1) {
        throw new Error(`The Quote '${quote}' does not exist in the json.  Please feel free to submit a submit a pull request at ${repoUrl}`);
    }

    return id;
}

exports.getQuote = getQuoteById;

exports.getId = getIdByQuote;

exports.all = getLocalizedList;

exports.random = getRandomQuote;

exports.languages = languages;
