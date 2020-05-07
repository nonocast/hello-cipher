const debug = require('debug')('app');
const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

const key = new NodeRSA();

/**
 * bits — {int} — key size in bits. 2048 by default.
 * exp — {int} — public exponent. 65537 by default.
 */
key.generateKeyPair();

/**
 * Format string composed of several parts: scheme-[key_type]-[output_type]
 */
fs.writeFileSync(path.join('./keys/s365'), key.exportKey('pkcs8-private'));
fs.writeFileSync(path.join('./keys/s365.pub'), key.exportKey('pkcs8-public'));
