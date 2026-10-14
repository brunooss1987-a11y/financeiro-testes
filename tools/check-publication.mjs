// Verificador defensivo minimo, nao substitui secret scanning de historico.
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const files = execFileSync('git', ['ls-files', '-z'], {encoding:'utf8'}).split('\0').filter(Boolean);
if (files.length === 0) throw new Error('Sem arquivos versionados.');
const forbiddenFile = /(?:^|\/)(?:\.env(?:\..*)?|\.clasprc\.json|\.clasp(?:\.production)?\.json|credentials\.json|service-account[^/]*\.json)$|\.(?:pem|p12|pfx|key|xlsx|xls|csv|pdf|sqlite|db)$/i;
const contentRules = [
  ['Segredo OAuth Google', /GOCSPX-[A-Za-z0-9_-]{12,}/],
  ['Chave API Google', /AIza[0-9A-Za-z0-9_-]{25,}/],
  ['Token GitHub', /(?:github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9_]{20,})/],
  ['Chave privada', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['URL planilha real', /https:\/\/docs\.google\.com\/spreadsheets\/d\/[A-Za-z0-9_-]{20,}/],
  ['CPF formatado', /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/]
];
for (const name of files) {
  if (forbiddenFile.test(name)) throw new Error('Arquivo proibido: '+name);
  if (!fs.existsSync(name)) throw new Error('Arquivo versionado ausente: '+name);
  const stat=fs.statSync(name);
  if (!stat.isFile() || stat.size>1024*1024) throw new Error('Arquivo inesperado: '+name);
  const source=fs.readFileSync(name,'utf8');
  for (const [label,regex] of contentRules) if (regex.test(source)) throw new Error(label+' encontrado em '+name);
}
console.log('PUBLIC_GUARD=PASS (arquivos atuais); historico requer revisao adicional.');
