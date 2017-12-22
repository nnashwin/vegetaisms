import test from 'ava';
import mod from '.';

test('should have methods on the module itself', t => {
    t.true(mod.all.length > 0);
    t.truthy(mod.random());
    t.not(mod.random(), mod.random());
});

test('languages', t => {
    t.true(mod.languages.has('en'));
});

test('getQuote', t => {
    t.is(mod.getQuote(1, 'en'), "IT'S OVER 9000!!!");
});

test('getId', t => {
    t.is(mod.getId("IT'S OVER 9000!!!", 'en'), 1);
});

test('all', t => {
    t.not(mod.all().indexOf("IT'S OVER 9000!!!"), -1);
    t.not(mod.all().indexOf("Silly robot, do you really believe you have any chance against a Super Saiyan like me? Your circuits must be malfunctioning. Fresh out of the factory with no warranty and already broken. Such a pity."), -1);
});
