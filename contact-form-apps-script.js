// Google Apps Script for Contact Form - Manes by Miriam
// This script handles contact form submissions and sends emails to manesovermiriam@gmail.com

// Configuration
const RECIPIENT_EMAIL = 'manesovermiriam@gmail.com';
const SHEET_ID = '1_FvoF5FUU4cojB4oYywgTShX2t2cKYBIS3cqr94Gsdg'; // Same sheet as newsletter

function doPost(e) {
  try {
    console.log('Contact form submission received');
    
    // Check if event and parameters exist
    if (!e || !e.parameter) {
      console.error('No parameters received');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'No form data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const email = e.parameter.email;
    const message = e.parameter.message;
    const name = e.parameter.name || 'Contact Form User';
    
    console.log('Form data:', { email, message, name });
    
    // Validate email
    if (!isValidEmail(email)) {
      console.error('Invalid email:', email);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Please enter a valid email address'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
      console.error('Message too short');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Please enter a message (at least 10 characters)'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Send email notification
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
    
    console.log('Email sent successfully to:', RECIPIENT_EMAIL);
    
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
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Message sent successfully! You will receive a confirmation email shortly.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or email directly.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Contact form service is running',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function testContactForm() {
  // Test function to verify the script works
  const testData = {
    parameter: {
      email: 'test@example.com',
      message: 'This is a test message from the contact form.',
      name: 'Test User'
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}
