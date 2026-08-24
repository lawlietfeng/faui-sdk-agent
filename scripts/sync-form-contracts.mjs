import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const sdkRoot = process.env.FAUI_SDK_ROOT ?? path.resolve(projectRoot, '../faui-sdk');
const sourcePath = path.join(sdkRoot, 'src/formComponentContracts.ts');
const outputPath = path.join(projectRoot, 'src/form-contracts.generated.ts');

await readFile(sourcePath);
const sdkContracts = await import(`${pathToFileURL(sourcePath).href}?sync=${Date.now()}`);
const generated = [
  '// Generated from faui-sdk/src/formComponentContracts.ts. Do not edit manually.',
  `export const FORM_COMPONENT_CONTRACT_VERSION = ${JSON.stringify(sdkContracts.formComponentContractVersion)} as const;`,
  `export const FORM_COMPONENT_CONTRACTS = ${JSON.stringify(sdkContracts.formComponentContracts, null, 2)} as const;`,
  `export const FORM_SCHEMA_CONTRACT = ${JSON.stringify(sdkContracts.formSchemaContract, null, 2)} as const;`,
  '',
].join('\n');

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, generated, 'utf8');
console.log(`Synced Form contracts v${sdkContracts.formComponentContractVersion} (${Object.keys(sdkContracts.formComponentContracts).length} components) to ${outputPath}`);
