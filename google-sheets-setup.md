# Google Sheets Newsletter Integration Setup

## Step 1: Set up Google Apps Script

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1Rzr3hAsMR3EnReCYkeuDq71FO7fYWw25AP8_T-kPFiw/edit?usp=sharing

2. **Go to Extensions > Apps Script**

3. **Replace the default code with this**:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the form data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = new Date();
    
    // Add the email and timestamp to the next available row
    sheet.appendRow([email, timestamp]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: "Email added successfully"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Newsletter subscription endpoint is working!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4. **Save the script** (Ctrl+S or Cmd+S)

5. **Deploy the script**:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - **Copy the web app URL** - you'll need this for the form

## Step 2: Set up your spreadsheet headers

In your Google Sheet, add these headers in row 1:
- Column A: "Email"
- Column B: "Date Added"

## Step 3: Update your website form

The form on your website will be updated to use the Google Apps Script URL.

## Step 4: Test the integration

1. Fill out the newsletter form on your website
2. Check your Google Sheet to see if the email appears
3. Verify the timestamp is recorded correctly

## Troubleshooting

- Make sure the Google Apps Script is deployed as a web app
- Ensure "Anyone" has access to the web app
- Check that the spreadsheet headers are set up correctly
- Verify the web app URL is correct in the form
