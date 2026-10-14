import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';

export const LOCAL_CONTRACT_VERSION = 'local-integrity/v1';

function exactObject(value, fields, description) {
  if (!value || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError(description + ': expected a plain object');
  }
  const actual = Object.keys(value).sort();
  const expected = [...fields].sort();
  if (actual.length !== expected.length || actual.some((item, index) => item !== expected[index])) {
    throw new Error(description + ': unexpected or missing fields');
  }
}

function safeDemoPath(value) {
  if (typeof value !== 'string' || value.length > 160 || !value.startsWith('src/shared/')) {
    throw new Error('Only public src/shared/ files may be attested in this example');
  }
  const parts = value.split('/');
  if (parts.some((part) => part === '.' || part === '..' || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(part))) {
    throw new Error('Unsafe file path');
  }
  return parts;
}

/** Verify local public demo bytes against a pinned SHA-256; never fetch remote code. */
export function checkLocalContract(contract, { root } = {}) {
  exactObject(contract, ['schema', 'scope', 'files'], 'contract');
  if (contract.schema !== LOCAL_CONTRACT_VERSION || contract.scope !== 'public-demo') {
    throw new Error('Unsupported contract schema or scope');
  }
  if (!Array.isArray(contract.files) || contract.files.length === 0 || contract.files.length > 8) {
    throw new Error('Contract requires 1 to 8 files');
  }
  if (typeof root !== 'string' || root.length === 0) {
    throw new Error('Explicit local root required');
  }
  const resolvedRoot = realpathSync(root);
  const seen = new Set();
  const verified = [];
  for (const entry of contract.files) {
    exactObject(entry, ['path', 'sha256'], 'file entry');
    const parts = safeDemoPath(entry.path);
    if (typeof entry.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(entry.sha256)) {
      throw new Error('Invalid SHA-256 format');
    }
    if (seen.has(entry.path)) throw new Error('Duplicate file entry');
    seen.add(entry.path);
    let location = resolvedRoot;
    for (let i = 0; i < parts.length; i++) {
      location = join(location, parts[i]);
      const state = lstatSync(location);
      if (state.isSymbolicLink()) throw new Error('Symbolic link forbidden');
      if (i < parts.length - 1 && !state.isDirectory()) throw new Error('Expected local directory');
      if (i === parts.length - 1 && (!state.isFile() || state.size > 262144)) {
        throw new Error('Expected small regular file');
      }
    }
    const digest = createHash('sha256').update(readFileSync(location)).digest('hex');
    if (digest !== entry.sha256) throw new Error('LOCAL_HASH_MISMATCH');
    verified.push(entry.path);
  }
  return Object.freeze({
    status: 'LOCAL_BYTES_MATCH',
    verifiedPaths: Object.freeze(verified),
    provesTestExecution: false,
    provesPrivateSourceIdentity: false,
    provesFinancialE2E: false
  });
}
