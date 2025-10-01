// Google Apps Script for Contact Form - Manes by Miriam (Simple & Robust Version)
// This script handles contact form submissions and sends emails to manesovermiriam@gmail.com

// Configuration
const RECIPIENT_EMAIL = 'manesovermiriam@gmail.com';
const SHEET_ID = '1_FvoF5FUU4cojB4oYywgTShX2t2cKYBIS3cqr94Gsdg'; // Same sheet as newsletter

function doPost(e) {
  // Add CORS headers for web requests
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  
  try {
    console.log('=== Contact form submission started ===');
    console.log('Event object:', e);
    console.log('Event type:', typeof e);
    
    // Handle case where event object is undefined or null
    if (!e) {
      console.error('Event object is undefined or null');
      return response.setContent(JSON.stringify({
        success: false,
        message: 'Server error: No request data received'
      }));
    }
    
    // Log all available properties
    console.log('Event properties:', Object.keys(e));
    console.log('Has parameter:', 'parameter' in e);
    console.log('Has postData:', 'postData' in e);
    
    let email, message, name;
    
    // Method 1: Try e.parameter
    if (e.parameter) {
      console.log('e.parameter:', e.parameter);
      email = e.parameter.email;
      message = e.parameter.message;
      name = e.parameter.name || 'Contact Form User';
      console.log('Method 1 - Got from e.parameter:', { email, message, name });
    }
    
    // Method 2: Try e.postData.contents if e.parameter didn't work
    if ((!email || !message) && e.postData && e.postData.contents) {
      console.log('e.postData.contents:', e.postData.contents);
      try {
        const params = new URLSearchParams(e.postData.contents);
        email = email || params.get('email');
        message = message || params.get('message');
        name = name || params.get('name') || 'Contact Form User';
        console.log('Method 2 - Got from postData:', { email, message, name });
      } catch (parseError) {
        console.error('Error parsing postData:', parseError);
      }
    }
    
    // Method 3: Try direct property access
    if ((!email || !message) && e.email) {
      email = e.email;
      message = e.message;
      name = e.name || 'Contact Form User';
      console.log('Method 3 - Got from direct properties:', { email, message, name });
    }
    
    // If still no data, return error
    if (!email || !message) {
      console.error('No form data found in any method');
      console.log('Final attempt - all event data:', JSON.stringify(e, null, 2));
      return response.setContent(JSON.stringify({
        success: false,
        message: 'No form data received. Please try again or email directly.'
      }));
    }
    
    console.log('Final form data:', { email, message, name });
    
    // Validate email
    if (!isValidEmail(email)) {
      console.error('Invalid email:', email);
      return response.setContent(JSON.stringify({
        success: false,
        message: 'Please enter a valid email address'
      }));
    }
    
    // Validate message
    if (message.trim().length < 10) {
      console.error('Message too short:', message);
      return response.setContent(JSON.stringify({
        success: false,
        message: 'Please enter a message (at least 10 characters)'
      }));
    }
    
    console.log('Validation passed, sending emails...');
    
    // Send notification email to you
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
    
    console.log('Notification email sent to:', RECIPIENT_EMAIL);
    
    // Log to Google Sheet
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
      const timestamp = new Date();
      sheet.appendRow([timestamp, email, name, message, 'Contact Form']);
      console.log('Logged to sheet');
    } catch (sheetError) {
      console.error('Sheet error:', sheetError);
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
    
    console.log('Auto-reply sent to:', email);
    console.log('=== SUCCESS: Contact form completed ===');
    
    return response.setContent(JSON.stringify({
      success: true,
      message: 'Message sent successfully! You will receive a confirmation email shortly.'
    }));
    
  } catch (error) {
    console.error('=== ERROR in doPost ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    
    return response.setContent(JSON.stringify({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or email directly.'
    }));
  }
}

function doGet(e) {
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  
  return response.setContent(JSON.stringify({
    status: 'Contact form service is running',
    timestamp: new Date().toISOString(),
    version: '3.0',
    message: 'This endpoint is for POST requests only'
  }));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function testContactForm() {
  // Test with simulated data
  const testData = {
    parameter: {
      email: 'test@example.com',
      message: 'This is a test message from the contact form.',
      name: 'Test User'
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
  return result;
}





