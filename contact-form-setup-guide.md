# Contact Form Setup Guide - Manes by Miriam

## Overview
This guide will help you set up a functional contact form that sends emails to `manesovermiriam@gmail.com` using Google Apps Script.

## Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the contents from `contact-form-apps-script.js`
4. Save the project (Ctrl+S) and name it "Manes by Miriam Contact Form"

## Step 2: Deploy the Script

1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Type" and select "Web app"
3. Set the following:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click "Deploy"
5. **Copy the Web App URL** - you'll need this for the next step

## Step 3: Update Your Website

1. Open `index.html`
2. Find this line (around line 567):
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/YOUR_CONTACT_SCRIPT_ID/exec';
   ```
3. Replace `YOUR_CONTACT_SCRIPT_ID` with your actual Web App URL from Step 2

## Step 4: Test the Form

1. Save and deploy your website changes
2. Visit your website and try submitting the contact form
3. Check that you receive:
   - An email notification at `manesovermiriam@gmail.com`
   - An auto-reply email at the customer's email address

## Features

### What the contact form does:
- ✅ Collects name, email, and message
- ✅ Sends notification email to `manesovermiriam@gmail.com`
- ✅ Sends auto-reply confirmation to the customer
- ✅ Logs submissions to your Google Sheet (same as newsletter)
- ✅ Shows loading state and success/error messages
- ✅ Validates email format and message length

### Email notifications include:
- Customer's name and email
- Full message content
- Timestamp
- Professional formatting

### Auto-reply includes:
- Personalized greeting with customer's name
- Confirmation that message was received
- Promise to respond within 48 hours
- Copy of their original message

## Troubleshooting

### If emails aren't being sent:
1. Check that the script is deployed as a Web App (not just saved)
2. Verify the Web App URL is correct in your HTML
3. Check the Google Apps Script execution logs for errors
4. Ensure you have permission to send emails from the Google account

### If the form shows errors:
1. Check browser console for JavaScript errors
2. Verify the script URL is accessible
3. Test the script URL directly in a browser

## Security Notes

- The script validates all inputs
- Email addresses are checked for proper format
- Messages must be at least 10 characters
- All submissions are logged for your records

## Next Steps

Once set up, you can:
- Monitor submissions in your Google Sheet
- Customize the email templates in the script
- Add additional fields to the form if needed
- Set up email filters in Gmail for better organization

---

**Need help?** The contact form will fall back to the "Email Directly" button if there are any issues with the script.
