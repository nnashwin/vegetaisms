const uniqueRandomArray = require('unique-random-array');

const vegetaisms = require('./data/quotes/en.json');

const vegetaQA = require('./data/qa/qa-en.json');

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

    return require(`./data/quotes/${lang.toLowerCase()}`);
}

function getRandomQuote (lang) {
    const list = getLocalizedList(lang);

    return uniqueRandomArray(list);
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

    return id + 1;
}

/* 
 ** QA Section
*/

function getLocalizedQAObj(lang) {
    if (!lang || lang === 'en') {
        return vegetaQA;
    }

    if (!languages.has(lang)) {
        throw new Error(`The localization list does not have the language ${lang}.  Please make a pull request to add your language here! ${repoUrl}`);
    }

    return require(`./data/quotes/qa/${lang.toLowerCase()}`);
}

exports.askASaiyan = function (question, lang) {
    lang = !lang ? 'en' : lang;

    const qaObj = getLocalizedQAObj(lang);

    if (qaObj[question] === undefined) {
        throw new Error(`Vegeta does not know how to answer the question '${question}', Please make a pull request to add your question and answer here! ${repoUrl}`)
    }

    return qaObj[question];
}

exports.getQuote = getQuoteById;

exports.getId = getIdByQuote;

exports.all = getLocalizedList;

exports.getQAObj = getLocalizedQAObj;

exports.random = getRandomQuote;

exports.languages = languages;
