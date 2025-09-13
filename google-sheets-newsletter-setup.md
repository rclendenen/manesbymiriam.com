# Google Sheets Newsletter Setup - FREE Solution

## Step 1: Create a Google Form

1. **Go to Google Forms**: Visit [forms.google.com](https://forms.google.com)
2. **Create a new form**: Click the "+" button to create a blank form
3. **Set up your form**:
   - **Title**: "Newsletter Subscription"
   - **Description**: "Subscribe to Manes by Miriam newsletter"
   - **Add a question**: 
     - Question type: "Short answer"
     - Question: "Email Address"
     - Make it required: ✓
     - Click the three dots (⋮) → "Response validation" → "Email"

## Step 2: Get Your Form URL and Entry ID

1. **Get the form URL**:
   - Click "Send" button in the top right
   - Click the link icon (🔗)
   - Copy the URL (it will look like: `https://docs.google.com/forms/d/e/1FAIpQLSf38s0lTMeHeVDqwcbeMemPqQbQ9P14gX_SwMCDpW9WdMoXyg/viewform`)

2. **Get the entry ID**:
   - Right-click on the email question
   - Select "Inspect" or "Inspect Element"
   - Look for `name="entry.XXXXXXXXXX"` in the HTML
   - Copy the number after "entry." (e.g., `1234567890`)

## Step 3: Update Your Website

1. **Update the form action** in `index.html`:
   - Replace the URL in the form action with your form's response URL
   - Change `formResponse` at the end of your form URL
   - Example: `https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`

2. **Update the entry ID**:
   - Replace `entry.1234567890` with your actual entry ID
   - Example: `entry.9876543210`

## Step 4: Test Your Setup

1. **Test the form**:
   - Go to your website
   - Enter an email in the newsletter form
   - Click "Subscribe"
   - Check your Google Form responses

2. **View responses**:
   - Go back to your Google Form
   - Click "Responses" tab
   - You'll see all email submissions in a spreadsheet

## Step 5: Optional - Create a Google Sheet

1. **Link to Google Sheets**:
   - In your Google Form, click "Responses" tab
   - Click the green Google Sheets icon
   - Choose "Create a new spreadsheet"
   - Name it "Newsletter Subscribers"

## Step 6: Advanced Features (Optional)

### Email Notifications
1. In Google Forms, go to "Responses" tab
2. Click the three dots (⋮) → "Get email notifications for new responses"
3. Enter your email address

### Auto-responder (Using Google Apps Script)
1. In your Google Sheet, go to "Extensions" → "Apps Script"
2. Add this code:

```javascript
function onFormSubmit(e) {
  const email = e.values[1]; // Adjust index based on your form
  const subject = "Welcome to Manes by Miriam Newsletter!";
  const body = `Thank you for subscribing to our newsletter! We'll keep you updated with exclusive tips and specials.`;
  
  MailApp.sendEmail(email, subject, body);
}
```

3. Save and set up a trigger for "On form submit"

## Troubleshooting

### Form Not Working?
- Check that the form URL ends with `/formResponse`
- Verify the entry ID is correct
- Make sure the form is published (not in draft mode)

### Not Receiving Emails?
- Check your spam folder
- Verify the email address is correct
- Test with a different email address

### Need Help?
- Google Forms Help: [support.google.com/forms](https://support.google.com/forms)
- Google Sheets Help: [support.google.com/sheets](https://support.google.com/sheets)

## Security Notes

- This is a FREE solution using Google's services
- No server setup required
- Google handles all the backend processing
- Your data is stored securely in Google's cloud
- You can export your subscriber list anytime

## Next Steps

1. Set up your Google Form following these steps
2. Update the form URL and entry ID in your website
3. Test the subscription process
4. Start collecting email addresses!

---

**Need the exact URLs updated?** Once you create your Google Form, share the form URL with me and I'll update your website code with the correct values.
