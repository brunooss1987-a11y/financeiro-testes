// Gate fail-closed para arquivos presentes no Git do hub PUBLICO.
// Regras equivalentes ao gate original, com recusas explicitas de links e escapes.
// NAO valida todo historico Git nem substitui revisao manual/secret scanning.
import { lstatSync, readFileSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';

export const MAX_PUBLIC_FILE_BYTES = 1024 * 1024;

const forbiddenFile = /(?:^|\/)(?:\.env(?:\..*)?|\.clasprc\.json|\.clasp(?:\.production)?\.json|credentials\.json|service-account[^/]*\.json)$|\.(?:pem|p12|pfx|key|xlsx|xls|csv|pdf|sqlite|db)$/i;
const contentRules = [
  ['Segredo OAuth Google', /GOCSPX-[A-Za-z0-9_-]{12,}/],
  ['Chave API Google', /AIza[0-9A-Za-z0-9_-]{25,}/],
  ['Token GitHub', /(?:github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9_]{20,})/],
  ['Chave privada', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['URL planilha real', /https:\/\/docs\.google\.com\/spreadsheets\/d\/[A-Za-z0-9_-]{20,}/],
  ['CPF formatado', /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/]
];

/** Validate one Git-tracked file, reading only inside the explicit repository root. */
export function assertPublicationFile(name, { root } = {}) {
  if (typeof root !== 'string' || root.length === 0) {
    throw new Error('Raiz explicita obrigatoria');
  }
  if (typeof name !== 'string' || name.length === 0 || name.includes('\0') ||
      name.includes('\\') || isAbsolute(name)) {
    throw new Error('Caminho inseguro de arquivo versionado');
  }
  const parts = name.split('/');
  if (parts.some(part => !part || part === '.' || part === '..')) {
    throw new Error('Caminho inseguro de arquivo versionado');
  }
  if (forbiddenFile.test(name)) throw new Error('Arquivo proibido: ' + name);

  let file = resolve(root);
  for (let i = 0; i < parts.length; i++) {
    file = join(file, parts[i]);
    let stat;
    try {
      stat = lstatSync(file); // Nunca seguir links simbolicos no caminho.
    } catch (error) {
      if (error?.code === 'ENOENT') throw new Error('Arquivo versionado ausente: ' + name);
      throw error;
    }
    if (stat.isSymbolicLink()) throw new Error('Link simbolico proibido: ' + name);
    if (i !== parts.length - 1 && !stat.isDirectory()) {
      throw new Error('Diretorio pai inesperado: ' + name);
    }
    if (i === parts.length - 1 && (!stat.isFile() || stat.size > MAX_PUBLIC_FILE_BYTES)) {
      throw new Error('Arquivo inesperado: ' + name);
    }
  }

  const source = readFileSync(file, 'utf8');
  for (const [label, regex] of contentRules) {
    if (regex.test(source)) throw new Error(label + ' encontrado em ' + name);
  }
  return true;
}
