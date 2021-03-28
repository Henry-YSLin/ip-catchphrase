# ip-catchphrase

Converts an IPv4 address (optionally with a port number) to and from a catchphrase.

## Installation

```bash
# npm
npm install ip-catchphrase

#yarn
yarn add ip-catchphrase
```

## Usage

Convert from IP address to catchphrase

```javascript
const { getCatchphrase } = require("ip-catchphrase");

const catchphrase = getCatchphrase("192.168.0.1");
console.log(catchphrase); // 'runner rally still'

// Optionally specify a port number

const catchphrase2 = getCatchphrase("192.168.0.1", 25565);
console.log(catchphrase2); // 'runner rally day significance'
```

Convert from catchphrase to IP address

```javascript
const { getAddress } = require("ip-catchphrase");

const catchphrase = getAddress("runner rally still");
console.log(catchphrase); // { address: '192.168.0.1', typos: [] }

// With a port number

const catchphrase2 = getAddress("runner rally day significance");
console.log(catchphrase2); // { address: '192.168.0.1', port: 25565, typos: [] }

// Typos are handled automatically

const catchphrase3 = getAddress("runner rally day significence");
console.log(catchphrase3); // { address: '192.168.0.1', port: 25565, typos: [...] }
console.log(catchphrase3.typos); // [{ original: 'significence', fixed: 'significance', confidence: 0.9166666666666666 }]
```

## Credits

The word list used in this package is a processed version of [http://www.desiquintans.com/nounlist](http://www.desiquintans.com/nounlist)
