// Debug version of Google Apps Script for Contact Form
// This version has enhanced logging and error handling

function doPost(e) {
  console.log('=== DEBUG CONTACT FORM STARTED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Event object received:', !!e);
  
  if (!e) {
    console.log('ERROR: Event object is null/undefined');
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'No event object received',
      debug: 'Event is null or undefined'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('Event object type:', typeof e);
  console.log('Event object keys:', Object.keys(e));
  
  // Try to get form data
  let email = 'unknown';
  let message = 'no message';
  let name = 'unknown';
  
  if (e.parameter) {
    console.log('e.parameter exists:', e.parameter);
    email = e.parameter.email || 'no email in parameter';
    message = e.parameter.message || 'no message in parameter';
    name = e.parameter.name || 'no name in parameter';
    console.log('Got from e.parameter:', { email, message, name });
  } else if (e.postData && e.postData.contents) {
    console.log('e.postData.contents:', e.postData.contents);
    try {
      const params = new URLSearchParams(e.postData.contents);
      email = params.get('email') || 'no email in postData';
      message = params.get('message') || 'no message in postData';
      name = params.get('name') || 'no name in postData';
      console.log('Got from postData:', { email, message, name });
    } catch (error) {
      console.log('Error parsing postData:', error);
    }
  } else {
    console.log('No parameter or postData found');
  }
  
  console.log('Final form data:', { email, message, name });
  
  // Validate data
  if (!email || email === 'unknown' || email === 'no email in parameter' || email === 'no email in postData') {
    console.log('ERROR: No valid email found');
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'No email address received',
      debug: 'Email validation failed'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (!message || message === 'no message' || message === 'no message in parameter' || message === 'no message in postData') {
    console.log('ERROR: No valid message found');
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'No message received',
      debug: 'Message validation failed'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('Data validation passed, attempting to send email...');
  
  // Try to send email with detailed error handling
  try {
    const emailSubject = `DEBUG: Contact Form Test - ${new Date().toLocaleString()}`;
    const emailBody = `
      <h2>DEBUG: Contact Form Test</h2>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p><em>This is a debug test email from the Manes by Miriam contact form.</em></p>
    `;
    
    console.log('Attempting to send email to: manesovermiriam@gmail.com');
    console.log('Email subject:', emailSubject);
    
    MailApp.sendEmail({
      to: 'manesovermiriam@gmail.com',
      subject: emailSubject,
      htmlBody: emailBody
    });
    
    console.log('SUCCESS: Email sent successfully to manesovermiriam@gmail.com');
    
    // Also try sending to the customer's email if it's different
    if (email && email !== 'manesovermiriam@gmail.com') {
      try {
        const autoReplySubject = 'Thank you for contacting Manes by Miriam (DEBUG TEST)';
        const autoReplyBody = `
          <h2>DEBUG: Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>This is a DEBUG test email. Thank you for contacting Manes by Miriam.</p>
          <p><strong>Your message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p>Best regards,<br>Miriam</p>
        `;
        
        MailApp.sendEmail({
          to: email,
          subject: autoReplySubject,
          htmlBody: autoReplyBody
        });
        
        console.log('SUCCESS: Auto-reply sent to customer:', email);
      } catch (autoReplyError) {
        console.log('ERROR: Failed to send auto-reply:', autoReplyError);
      }
    }
    
  } catch (emailError) {
    console.log('ERROR: Failed to send email:', emailError);
    console.log('Error message:', emailError.message);
    console.log('Error stack:', emailError.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Email sending failed: ' + emailError.message,
      debug: 'Email error occurred'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('=== DEBUG CONTACT FORM COMPLETED SUCCESSFULLY ===');
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Debug test completed - check your email at manesovermiriam@gmail.com',
    received: {
      email: email,
      message: message,
      name: name
    },
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Debug contact form service is running',
    timestamp: new Date().toISOString(),
    message: 'This is a debug version with enhanced logging'
  })).setMimeType(ContentService.MimeType.JSON);
}

function testEmailSending() {
  // Test function to verify email sending works
  try {
    MailApp.sendEmail({
      to: 'manesovermiriam@gmail.com',
      subject: 'TEST: Email Sending Works',
      body: 'This is a test email to verify that email sending is working from Google Apps Script.'
    });
    console.log('Test email sent successfully');
    return 'Test email sent successfully';
  } catch (error) {
    console.log('Test email failed:', error);
    return 'Test email failed: ' + error.message;
  }
}





