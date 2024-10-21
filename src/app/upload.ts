import readline from 'readline';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = 'YOUR CLIENT ID HERE';
const CLIENT_SECRET = 'YOUR CLIENT SECRET HERE';
const REDIRECT_URL = 'YOUR REDIRECT URL HERE';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const auth = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const url = auth.generateAuthUrl({ scope: SCOPE });
console.log('Visit the url: ', url);

rl.question('Enter the code here: ', (code: string) => {
  auth.getToken(code, (err, tokens) => {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    if (tokens) {
      auth.setCredentials(tokens);
      uploadFile(auth);
    }
  });
});

const uploadFile = (auth: OAuth2Client) => {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: 'My Document'
  };
  const media = {
    mimeType: 'text/plain',
    body: 'Hello World!'
  };
  drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id'
  }, (err: Error | null, file: any) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File Id: ', file.id);
    }
  });
};
