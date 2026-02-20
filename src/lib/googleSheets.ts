import { google } from 'googleapis';

export async function appendToSheet(values: string[]) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        // Robust handling for private key from various environment formats
        private_key: process.env.GOOGLE_PRIVATE_KEY
          ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, '') 
          : undefined,
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
        throw new Error("GOOGLE_SHEET_ID is not defined");
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F', // Adjust range as needed, assuming columns A-F
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.code === 403 && error.message?.includes('Google Sheets API has not been used')) {
       console.error('\n\n!!! GOOGLE SHEETS API NOT ENABLED !!!');
       console.error('You must enable the Google Sheets API for your project.');
       console.error('Please visit this URL to enable it: https://console.developers.google.com/apis/api/sheets.googleapis.com/overview');
       console.error('\n');
    }
    console.error('Error appending to Google Sheet:', error);
    throw error;
  }
}
