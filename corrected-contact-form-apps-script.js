// Google Apps Script for Contact Form - Manes by Miriam (Corrected Email)
// This script handles contact form submissions and sends emails to manesbymiriam@gmail.com

// Configuration
const RECIPIENT_EMAIL = 'manesbymiriam@gmail.com';
const SHEET_ID = '1_FvoF5FUU4cojB4oYywgTShX2t2cKYBIS3cqr94Gsdg'; // Same sheet as newsletter

function doPost(e) {
  console.log('=== Contact form submission started ===');
  console.log('Event object received:', !!e);
  
  if (!e) {
    console.error('Event object is undefined or null');
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Server error: No request data received'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('Event object:', e);
  console.log('Event parameter exists:', !!e.parameter);
  console.log('Event postData exists:', !!e.postData);
  
  let email, message, name;
  
  // Try to get parameters from e.parameter first
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    email = e.parameter.email;
    message = e.parameter.message;
    name = e.parameter.name || 'Contact Form User';
    console.log('Got data from e.parameter:', { email, message, name });
  }
  // Try to get parameters from e.postData if e.parameter is empty
  else if (e.postData && e.postData.contents) {
    console.log('Trying to parse postData.contents:', e.postData.contents);
    
    try {
      // Parse URL-encoded data
      const params = new URLSearchParams(e.postData.contents);
      email = params.get('email');
      message = params.get('message');
      name = params.get('name') || 'Contact Form User';
      console.log('Got data from postData:', { email, message, name });
    } catch (parseError) {
      console.error('Error parsing postData:', parseError);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Error parsing form data'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  // If both methods fail, try to get from e.parameter even if it seems empty
  else if (e.parameter) {
    email = e.parameter.email;
    message = e.parameter.message;
    name = e.parameter.name || 'Contact Form User';
    console.log('Got data from e.parameter (fallback):', { email, message, name });
  }
  else {
    console.error('No data found in event object');
    console.log('Available properties:', Object.keys(e));
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'No form data received. Please try again.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Validate that we have the required data
  if (!email || !message) {
    console.error('Missing required data:', { email: !!email, message: !!message });
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Missing required information. Please fill out all fields.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Validate email format
  if (!isValidEmail(email)) {
    console.error('Invalid email format:', email);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Please enter a valid email address'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Validate message length
  if (message.trim().length < 10) {
    console.error('Message too short:', message);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Please enter a message (at least 10 characters)'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('All validations passed. Processing form submission...');
  
  // Send email notification to you
  const emailSubject = `New Contact Form Submission - Manes by Miriam`;
  const emailBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
      ${message.replace(/\n/g, '<br>')}
    </div>
    <hr>
    <p><em>This message was sent from the Manes by Miriam contact form.</em></p>
  `;
  
  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: emailSubject,
    htmlBody: emailBody
  });
  
  console.log('Notification email sent successfully to:', RECIPIENT_EMAIL);
  
  // Log to Google Sheet (optional)
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const timestamp = new Date();
    sheet.appendRow([timestamp, email, name, message, 'Contact Form']);
    console.log('Contact form entry logged to sheet');
  } catch (sheetError) {
    console.error('Error logging to sheet:', sheetError);
    // Don't fail the whole process if sheet logging fails
  }
  
  // Send auto-reply to customer
  const autoReplySubject = 'Thank you for contacting Manes by Miriam';
  const autoReplyBody = `
    <h2>Thank you for reaching out!</h2>
    <p>Hi ${name},</p>
    <p>Thank you for contacting Manes by Miriam. I've received your message and will get back to you within 48 hours.</p>
    <p><strong>Your message:</strong></p>
    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
      ${message.replace(/\n/g, '<br>')}
    </div>
    <p>I look forward to connecting with you soon!</p>
    <p>Best regards,<br>Miriam</p>
    <hr>
    <p><em>Manes by Miriam<br>Professional Hair Styling</em></p>
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: autoReplySubject,
    htmlBody: autoReplyBody
  });
  
  console.log('Auto-reply sent to customer:', email);
  console.log('=== Contact form submission completed successfully ===');
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Message sent successfully! You will receive a confirmation email shortly.'
  })).setMimeType(ContentService.MimeType.JSON);
  
} catch (error) {
  console.error('=== Error in doPost ===');
  console.error('Error details:', error);
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Sorry, there was an error sending your message. Please try again or email directly.'
  })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Contact form service is running',
    timestamp: new Date().toISOString(),
    version: '2.0',
    recipient: 'manesbymiriam@gmail.com'
  })).setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function testEmailSending() {
  // Test function to verify email sending works
  try {
    MailApp.sendEmail({
      to: 'manesbymiriam@gmail.com',
      subject: 'TEST: Contact Form Email Sending Works',
      body: 'This is a test email to verify that email sending is working from Google Apps Script to manesbymiriam@gmail.com'
    });
    console.log('Test email sent successfully to manesbymiriam@gmail.com');
    return 'Test email sent successfully to manesbymiriam@gmail.com';
  } catch (error) {
    console.log('Test email failed:', error);
    return 'Test email failed: ' + error.message;
  }
}





