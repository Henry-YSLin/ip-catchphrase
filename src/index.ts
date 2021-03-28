/* eslint-disable no-bitwise */

import FuzzySet from 'fuzzyset.js';
import wordList from '../assets/cleanedNounList.json';

const fuzzyWords = FuzzySet(wordList);

function isValidIp(ip: string): boolean {
  if (!ip) return false;
  const parts = ip.split('.');
  if (parts.length !== 4 || parts.some((x) => {
    const y = parseInt(x, 10);
    if (Number.isNaN(y)) return true;
    if (y < 0 || y > 255) return true;
    return false;
  })) {
    return false;
  }
  return true;
}

export function getCatchphrase(ip: string, port?: number): string {
  if (!isValidIp(ip)) return null;
  let ipBits = 0;
  ip.split('.').forEach((part) => {
    ipBits <<= 8;
    ipBits |= +part;
  });
  let indices: number[];
  if (port) {
    if (Number.isNaN(port) || +port < 0 || +port > 65535) {
      return null;
    }
    indices = [
      ipBits >>> 20,
      (ipBits >>> 8) & 4095,
      ((ipBits << 4) & 4095) | ((port >>> 12) & 15),
      port & 4095,
    ];
  } else {
    indices = [
      ipBits >>> 20,
      (ipBits >>> 8) & 4095,
      (ipBits << 4) & 4095,
    ];
  }
  return indices.map((x) => wordList[x]).join(' ');
}

interface Typo {
  original: string,
  fixed: string,
  confidence: number
}

interface AddressResult {
  address: string,
  port?:number,
  typos: Typo[]
}

export function getAddress(catchphrase: string) : AddressResult {
  if (!catchphrase) return null;
  const words = catchphrase.split(' ');
  if (words.length < 3 || words.length > 4) {
    return null;
  }
  const typos : Typo[] = [];
  const indices = catchphrase.split(' ').map((x) => {
    const idx = wordList.indexOf(x);
    if (idx >= 0) return idx;
    const [confidence, word] = fuzzyWords.get(x)[0];
    typos.push({ original: x, fixed: word, confidence });
    return wordList.indexOf(word);
  });
  const res: AddressResult = {
    address: [
      (indices[0] >>> 4) & 255,
      ((indices[0] & 15) << 4) | ((indices[1] >>> 8) & 15),
      indices[1] & 255,
      (indices[2] >>> 4) & 255,
    ].join('.'),
    typos,
  };
  if (indices.length === 4) {
    res.port = ((indices[2] & 15) << 12) | indices[3];
  }
  return res;
}
