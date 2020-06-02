import test from 'ava';
import makeLookup from '.';

test('creates a lookup object from an array of objects', t => {
  const actual = makeLookup(
    [
      { id: 'abc', name: 'John' },
      { id: '4ae', name: 'Olivia' }
    ],
    'id'
  );

  const expected = {
    '4ae': { id: '4ae', name: 'Olivia' },
    abc: { id: 'abc', name: 'John' }
  };

  t.deepEqual(actual, expected);
});

test('works with deeply nested properties', t => {
  const fixture = [
    { sites: { github: { username: 'blakek' } } },
    { sites: { github: { username: 'sindresorhus' } } },
    { sites: { github: { username: 'jaredpalmer' } } }
  ];

  const actual = makeLookup(fixture, 'sites.github.username');

  const expected = {
    blakek: { sites: { github: { username: 'blakek' } } },
    sindresorhus: { sites: { github: { username: 'sindresorhus' } } },
    jaredpalmer: { sites: { github: { username: 'jaredpalmer' } } }
  };

  t.deepEqual(actual, expected);
});
