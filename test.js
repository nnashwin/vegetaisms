import test from 'ava';
import mod from '.';

test('should have methods on the module itself', t => {
    t.true(mod.all.length > 0);
    t.truthy(mod.random());
    t.not(mod.random(), mod.random());
});
