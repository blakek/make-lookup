# make-lookup

> 📒 Make a lookup object from an array of objects

Takes a list of items in an array an changes it to an object for fast access.

## Install

Using [Yarn]:

```bash
$ yarn add @blakek/make-lookup
```

…or using [npm]:

```bash
$ npm i --save @blakek/make-lookup
```

## Usage

```js
import { makeLookup } from '@blakek/make-lookup';

const users = [
  { sites: { github: { username: 'blakek' } } },
  { sites: { github: { username: 'gsandf' } } },
  { sites: { github: { username: 'google' } } }
];

const usersByUsername = makeLookup(users, 'sites.github.username');

console.log(usersByUsername.blakek);
// => { sites: { github: { username: 'blakek' } } }
```

## API

### `makeLookup`

```ts
function makeLookup<T>(
  inputArray: any[],
  lookupProperty: Array<number | string> | string;
): Record<string, T>;
```

Creates a lookup object for a given array.

`lookupProperty` is a path to the property in either dot notation or an array of
path parts. See [blakek/deep] for details on this path.

## Contributing

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

### Useful Commands

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| `yarn build`        | Builds the project to `./dist`                  |
| `yarn format`       | Format the source following the Prettier styles |
| `yarn test`         | Run project tests                               |
| `yarn test --watch` | Run project tests, watching for file changes    |

## License

MIT

[blakek/deep]: https://github.com/blakek/deep
[node.js]: https://nodejs.org/
[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/en/docs/
