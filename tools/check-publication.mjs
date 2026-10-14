// Gate de publicacao: somente arquivos versionados do repositorio publico.
// Nao substitui varredura do historico Git nem auditoria manual.
import { execFileSync } from 'node:child_process';
import { assertPublicationFile } from './publication-guard-core.mjs';

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
if (files.length === 0) throw new Error('Sem arquivos versionados.');
const root = process.cwd();
for (const name of files) assertPublicationFile(name, { root });
console.log('PUBLIC_GUARD=PASS (arquivos atuais); historico requer revisao adicional.');
