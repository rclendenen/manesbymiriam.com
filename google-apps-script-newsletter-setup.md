# Google Apps Script Newsletter Setup - FREE Solution

## Overview
This setup uses Google Apps Script to create a web app that receives newsletter subscriptions and saves them directly to your Google Sheet. This gives you full control over the data and allows for custom processing.

## Step 1: Set Up Your Google Sheet

1. **Open your existing Google Sheet**: [Your Sheet URL](https://docs.google.com/spreadsheets/d/1_FvoF5FUU4cojB4oYywgTShX2t2cKYBIS3cqr94Gsdg/edit?gid=0#gid=0)

2. **Add headers** (if not already present):
   - **Column A**: "Email"
   - **Column B**: "Date Added"
   - **Column C**: "Status"

3. **Format the headers** (Row 1):
   - Make them bold
   - Add background color (optional)

## Step 2: Create Google Apps Script

1. **In your Google Sheet**, go to **Extensions** → **Apps Script**

2. **Delete the default code** and replace it with this:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Get the email from the POST request
    const email = e.parameter.email;
    
    // Validate email format
    if (!email || !isValidEmail(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Invalid email address"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists
    const data = sheet.getDataRange().getValues();
    const emails = data.map(row => row[0]).slice(1); // Skip header row
    
    if (emails.includes(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Email already subscribed"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add new subscription
    const timestamp = new Date();
    sheet.appendRow([email, timestamp, "Active"]);
    
    // Send confirmation email (optional)
    try {
      MailApp.sendEmail({
        to: email,
        subject: "Welcome to Manes by Miriam Newsletter!",
        htmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d4af8c;">Welcome to Manes by Miriam!</h2>
            <p>Thank you for subscribing to our newsletter! We're excited to share:</p>
            <ul>
              <li>Exclusive hair care tips</li>
              <li>Seasonal specials and promotions</li>
              <li>Behind-the-scenes content</li>
              <li>New service announcements</li>
            </ul>
            <p>We respect your privacy and will never share your email address.</p>
            <p>Best regards,<br>Miriam - Manes by Miriam</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
              To unsubscribe, simply reply to this email with "UNSUBSCRIBE" in the subject line.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.log("Email sending failed:", emailError);
      // Continue even if email fails
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: "Successfully subscribed!"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("Error:", error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: "Server error occurred"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({message: "Newsletter API is running"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Test function (optional)
function testSubscription() {
  const testData = {
    parameter: {
      email: "test@example.com"
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
```

3. **Save the script**:
   - Click **Ctrl+S** (or **Cmd+S** on Mac)
   - Name it: "Newsletter Handler"

## Step 3: Deploy as Web App

1. **Click "Deploy"** → **"New deployment"**

2. **Configure the deployment**:
   - **Type**: Web app
   - **Description**: "Newsletter Subscription Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone

3. **Click "Deploy"**

4. **Authorize the script**:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"

5. **Copy the Web App URL**:
   - It will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
   - **Save this URL** - you'll need it for your website

## Step 4: Test Your Setup

1. **In Apps Script**, click the **"Run"** button next to `testSubscription`
2. **Check your Google Sheet** - you should see a test entry
3. **Delete the test entry** from your sheet

## Step 5: Update Your Website

I'll update your website code to use the Apps Script URL. You'll need to provide me with your Web App URL from Step 3.

## Step 6: Advanced Features (Optional)

### Email Notifications to You
Add this function to get notified of new subscriptions:

```javascript
function notifyOwner(newEmail) {
  const ownerEmail = "your-email@example.com"; // Replace with your email
  const subject = "New Newsletter Subscription";
  const body = `New newsletter subscription: ${newEmail}`;
  
  MailApp.sendEmail(ownerEmail, subject, body);
}
```

Then call it in the `doPost` function after adding the subscription.

### Unsubscribe Functionality
Add this function to handle unsubscribes:

```javascript
function handleUnsubscribe(email) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      sheet.getRange(i + 1, 3).setValue("Unsubscribed");
      break;
    }
  }
}
```

## Troubleshooting

### Script Not Working?
- Check that the script is deployed as a web app
- Verify the permissions are set to "Anyone"
- Make sure the script is saved and deployed

### Emails Not Sending?
- Check your Gmail quota limits
- Verify the email addresses are valid
- Check the Apps Script execution logs

### Sheet Not Updating?
- Verify the sheet is the active sheet
- Check that the script has permission to edit the sheet
- Look at the execution logs for errors

## Security Notes

- Your script URL is public but secure
- Only email addresses are collected
- No sensitive data is stored
- Google handles all the infrastructure

## Next Steps

1. Follow the setup steps above
2. Get your Web App URL from the deployment
3. Share the URL with me
4. I'll update your website to use the Apps Script

---

**Ready to proceed?** Once you have your Web App URL, I'll update your website code immediately!
