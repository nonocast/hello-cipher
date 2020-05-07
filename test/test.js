const debug = require('debug')('test');
const _ = require('lodash');
const should = require('chai').should();
const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

describe('rsa test', () => {
  let privateKey = fs.readFileSync('./keys/s365', 'utf8');
  let publicKey = fs.readFileSync('./keys/s365.pub', 'utf8');

  /**
   * public key 加密, private key 解密
   * 每次加密出来的内容是不同的
   * pkcs1/pkcs8都适用
   */
  it('encryptWithPublicKey', () => {
    const key = new NodeRSA(publicKey);
    const encrypted = key.encrypt('hello world', 'base64');
    debug(encrypted);
  });

  it('decryptWithPrivateKey', () => {
    let encrypted = 'Q1v7eyhmF8bT3k1UqWFAxcnWmRWfUlvE28IEtXi94/7mVpfNyJ+wadH4eJzBNYZYZ2YwgmIcUL6HknGEv6uvZBnS9yjcLqLDABCdwTAnhQpnIhbY9z4/n9oG0k5DChxaRGo/BwKAJ+IvREhBVEyM105CWbaH7q1JXAR9rN/medpsReoBBsGkDegrohNh6COjajdrCQz1VJBLuYIJQ+L4bfj3Hbbl8vq3x+7p2JjDKNIjZv24ZMz+M50NRlw62by3gxusXa7316quNwSaoLL+91EzWNwI5n0++nckgpr4NCPqUbBcg2UZURjWFDRkfA0B80K87sdEOd82InH5/n1pzg==';
    const key = new NodeRSA(privateKey);
    key.decrypt(encrypted, 'utf8').should.eq('hello world');
  });

  /**
   * private key 加密, public key 解密
   * 每次加密数据相同
   * encryptPrivate/decryptPublic只适用于pkcs1
   */
  it.skip('encryptWithPrivateKey', () => {
    const key = new NodeRSA(privateKey);
    const encrypted = key.encryptPrivate('hello world', 'base64');
    // debug(encrypted);
  });


  it.skip('decryptWithPublicKey', () => {
    let encrypted = 'SMfJgpC6kwatJNmvd/i/3C5zkhpNPzrhpj6+B0I2LfUK6KwShOQrUyPBqqqs0my4tbYFPjs1NKomTDMwK9MyaeN3qR94VyOOt+fG0GqlLK2oZthtyZG4DEpw6bAVqM6BXhOMkmweLFDkxcCwf7K5tgp7duWwMf4yuVVTqeuaCrfKjgIFttdUZWdb+iSIxTm08lEjerR6Y/bUAvkwsgfySkGrxiIN6p0nmIjdQTDk5/XhJY4jUwckjUycXJw3CehfH1xXNx903P+Qrr1qCze618/ySfBz+P52cd4dXYGqLwIJgK7cDJhOQVJRF7mRV1L9ap0YwCdT8wXn2Xy1c53WEg==';
    const key = new NodeRSA(publicKey);
    key.decryptPublic(encrypted, 'utf8').should.eq('hello world');
  });


  /**
   * key.sign(buffer, [encoding], [source_encoding]);
   */
  it('signing', () => {
    const key = new NodeRSA(privateKey);
    let signature = key.sign('hello world', 'base64', 'utf8');
    signature.should.eq('UNkUw04NPZOMCpzY9BNCvb1MgqLnvYT8Ne7B3nWwgMxThWR93HUJ/k5DDiN3pyFssWm5N4WO55/X15keqlXHp5dKQhIQU8papZkmpzCXG8/84qhahGLK1a3qNjukCNDQ8xlfVB93ElTTelgoWHvbQeaLj1M07gGjr7sJiallSaKcX7aXYk/5OBSIYzJvHh53uDxWJQ5QNLZGjczJlBgkqvTRIiuLy5aQ1uq+m0akxJWdyDGELfxEu0yLYDaWj4OzgS4+/2PqtsajpgCE3NOWekdr9fX/Lnf6fMWpxz+b919tVgUZGxdk/ZmDNe1b+gqMoz1BU7TlMzAz7WXFF41zCw==');
  });

  /**
   * key.verify(buffer, signature, [source_encoding], [signature_encoding])
   */
  it('verifying', () => {
    let signature = 'UNkUw04NPZOMCpzY9BNCvb1MgqLnvYT8Ne7B3nWwgMxThWR93HUJ/k5DDiN3pyFssWm5N4WO55/X15keqlXHp5dKQhIQU8papZkmpzCXG8/84qhahGLK1a3qNjukCNDQ8xlfVB93ElTTelgoWHvbQeaLj1M07gGjr7sJiallSaKcX7aXYk/5OBSIYzJvHh53uDxWJQ5QNLZGjczJlBgkqvTRIiuLy5aQ1uq+m0akxJWdyDGELfxEu0yLYDaWj4OzgS4+/2PqtsajpgCE3NOWekdr9fX/Lnf6fMWpxz+b919tVgUZGxdk/ZmDNe1b+gqMoz1BU7TlMzAz7WXFF41zCw==';

    const key = new NodeRSA(publicKey);
    key.verify('hello world', signature, 'utf8', 'base64').should.eq(true);
  });

});