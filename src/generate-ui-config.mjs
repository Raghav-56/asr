import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(root, '.env') });

function pickEnv(...keys) {
  for (const k of keys) {
    if (process.env[k]) return process.env[k];
  }
  return undefined;
}

const cfg = {
  endpoint:
    pickEnv('APPWRITE_ENDPOINT', 'APPWRITE_FUNCTION_API_ENDPOINT') ||
    'https://cloud.appwrite.io/v1',
  projectId: pickEnv('PROJECT_ID', 'APPWRITE_PROJECT_ID'),
  bucketId: pickEnv('APPWRITE_BUCKET_ID', 'BUCKET_ID', 'speech_recognition'),
  appwriteApiKey: pickEnv('APPWRITE_API_KEY'),
  functionUrl: pickEnv('FUNCTION_URL'),
  functionKey: pickEnv('APPWRITE_FUNCTION_KEY', 'APPWRITE_API_KEY', 'x-appwrite-key'),
};

const outPath = path.join(root, 'ui-config.json');

await writeFile(outPath, JSON.stringify(cfg, null, 2) + '\n');
console.log(`Wrote ${outPath}`);
