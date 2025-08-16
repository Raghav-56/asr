# Speech Recognition with Hugging Face

This function uses the Hugging Face API to perform speech recognition. It takes an audio file from Appwrite storage and sends it to the Hugging Face API for speech recognition. The API returns the text and records it in the database. This function also supports receiving document events from the Appwrite Database.

## 🧰 Usage

### POST /

**Parameters**
| Name | Description | Location | Type | Sample Value |
|------------|-------------|----------|--------|--------------|
| fileId | Appwrite File ID of audio file | Body | String | `65c6319c5f34dc9638ec` |

This function also accepts body of a file event from Appwrite Storage.

**Response**

Sample `200` Response:

Text from the audio file is recognized and stored in the database.

```json
{
  "text": " going along slushy country roads and speaking to damp audiences in draughty schoolrooms day after day for a fortnight he'll have to put in an appearance at some place of worship on sunday morning and he can come to us immediately afterwards"
}
```

Sample `404` Response:

```json
{
  "error": "File not found"
}
```

## ⚙️ Configuration

| Setting           | Value                          |
| ----------------- | ------------------------------ |
| Runtime           | Node (18.0)                    |
| Entrypoint        | `src/main.js`                  |
| Build Commands    | `npm install && npm run setup` |
| Permissions       | `any`                          |
| Timeout (Seconds) | 15                             |
| Events            | `buckets.*.files.*.create`     |

## 🔒 Environment Variables

### APPWRITE_BUCKET_ID

The ID of the bucket where audio is stored.

| Question     | Answer              |
| ------------ | ------------------- |
| Required     | No                  |
| Sample Value | `speech_recogition` |

### APPWRITE_DATABASE_ID

The ID of the database where the responses are stored.

| Question     | Answer |
| ------------ | ------ |
| Required     | No     |
| Sample Value | `ai`   |

### APPWRITE_COLLECTION_ID

The ID of the collection where the responses are stored.

| Question     | Answer              |
| ------------ | ------------------- |
| Required     | No                  |
| Sample Value | `speech_recogition` |

### HUGGINGFACE_ACCESS_TOKEN

Secret for sending requests to the Hugging Face API.

| Question      | Answer                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Required      | Yes                                                                                                   |
| Sample Value  | `hf_x2a...`                                                                                           |
| Documentation | [Hugging Face: API tokens](https://huggingface.co/docs/api-inference/en/quicktour#get-your-api-token) |

### APPWRITE_FUNCTION_PROJECT_ID / APPWRITE_FUNCTION_API_ENDPOINT

These are provided to the function runtime automatically in Appwrite functions. You don't usually need to set them manually.

### For the local test UI (index.html)

Create a `ui-config.json` (ignored by git) next to `index.html` with:

```json
{
  "endpoint": "https://cloud.appwrite.io/v1",
  "projectId": "<your-project-id>",
  "bucketId": "speech_recognition",
  "appwriteApiKey": "<scoped-key-with-Storage.createFile>",
  "functionUrl": "<your-function-url>",
  "functionKey": "<scoped-key-used-by-function>"
}
```

Notes:

- The browser page is for testing only. Do not expose admin keys. Use a minimal, time-limited API key with only Storage createFile permission to the chosen bucket.
- Ensure CORS in Appwrite project allows the origin where you open the page.
- Bucket ID in the UI should match `APPWRITE_BUCKET_ID` used by the function (defaults differ otherwise).

## Where to get values

- Hugging Face access token: Hugging Face Settings → Access Tokens.
- Appwrite endpoint: Cloud instance is `https://cloud.appwrite.io/v1` or your self-hosted URL.
- Project ID: Appwrite Console → Your Project → Settings.
- Bucket ID: Appwrite Console → Storage → Your bucket.
- Database/Collection IDs: Appwrite Console → Databases → IDs you configured.
- Function URL: Appwrite Console → Functions → Your function → Settings → Function URL.
- Scoped API keys: Appwrite Console → API Keys → Create; scope to Storage (createFile on your bucket) for the UI, and broader as needed for the function.
