// Ultra Simple Google Apps Script for Contact Form
// This version handles the event object issue by being more defensive

function doPost(e) {
  console.log('=== ULTRA SIMPLE CONTACT FORM STARTED ===');
  console.log('Raw event object:', e);
  console.log('Event type:', typeof e);
  console.log('Event is null:', e === null);
  console.log('Event is undefined:', e === undefined);
  
  // Create response object
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  
  // Handle completely missing event object
  if (e === null || e === undefined) {
    console.log('Event object is completely missing');
    return response.setContent(JSON.stringify({
      success: false,
      message: 'No request data received',
      debug: 'Event object is null or undefined'
    }));
  }
  
  // Log all possible properties
  console.log('Event keys:', Object.keys(e));
  console.log('Has parameter:', 'parameter' in e);
  console.log('Has postData:', 'postData' in e);
  console.log('Has queryString:', 'queryString' in e);
  
  let email = null;
  let message = null;
  let name = null;
  
  // Method 1: Check e.parameter
  if (e.parameter) {
    console.log('e.parameter:', e.parameter);
    email = e.parameter.email;
    message = e.parameter.message;
    name = e.parameter.name;
    console.log('Method 1 result:', { email, message, name });
  }
  
  // Method 2: Check e.postData
  if ((!email || !message) && e.postData) {
    console.log('e.postData:', e.postData);
    if (e.postData.contents) {
      console.log('postData.contents:', e.postData.contents);
      try {
        const params = new URLSearchParams(e.postData.contents);
        email = email || params.get('email');
        message = message || params.get('message');
        name = name || params.get('name');
        console.log('Method 2 result:', { email, message, name });
      } catch (error) {
        console.log('Error parsing postData:', error);
      }
    }
  }
  
  // Method 3: Check e.queryString
  if ((!email || !message) && e.queryString) {
    console.log('e.queryString:', e.queryString);
    try {
      const params = new URLSearchParams(e.queryString);
      email = email || params.get('email');
      message = message || params.get('message');
      name = name || params.get('name');
      console.log('Method 3 result:', { email, message, name });
    } catch (error) {
      console.log('Error parsing queryString:', error);
    }
  }
  
  // Method 4: Direct property access
  if ((!email || !message)) {
    email = email || e.email;
    message = message || e.message;
    name = name || e.name;
    console.log('Method 4 result:', { email, message, name });
  }
  
  console.log('Final extracted data:', { email, message, name });
  
  // If we still don't have data, return error with debug info
  if (!email || !message) {
    console.log('No valid data found');
    return response.setContent(JSON.stringify({
      success: false,
      message: 'No form data received',
      debug: {
        hasEvent: !!e,
        eventKeys: Object.keys(e),
        extractedData: { email, message, name }
      }
    }));
  }
  
  // Validate email
  if (!isValidEmail(email)) {
    console.log('Invalid email:', email);
    return response.setContent(JSON.stringify({
      success: false,
      message: 'Invalid email address'
    }));
  }
  
  // Validate message
  if (message.length < 10) {
    console.log('Message too short:', message);
    return response.setContent(JSON.stringify({
      success: false,
      message: 'Message too short (minimum 10 characters)'
    }));
  }
  
  console.log('Validation passed, sending email...');
  
  // Send email
  try {
    const emailSubject = `Contact Form: ${name || 'Unknown'} - ${new Date().toLocaleDateString()}`;
    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name || 'Not provided'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p><em>Sent from Manes by Miriam contact form</em></p>
    `;
    
    MailApp.sendEmail({
      to: 'manesbymiriam@gmail.com',
      subject: emailSubject,
      htmlBody: emailBody
    });
    
    console.log('Email sent successfully to manesbymiriam@gmail.com');
    
    // Send auto-reply
    try {
      const autoReplySubject = 'Thank you for contacting Manes by Miriam';
      const autoReplyBody = `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name || 'there'},</p>
        <p>Thank you for contacting Manes by Miriam. I've received your message and will get back to you within 48 hours.</p>
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
      
      console.log('Auto-reply sent to:', email);
    } catch (autoReplyError) {
      console.log('Auto-reply failed:', autoReplyError);
    }
    
  } catch (emailError) {
    console.log('Email sending failed:', emailError);
    return response.setContent(JSON.stringify({
      success: false,
      message: 'Failed to send email: ' + emailError.message
    }));
  }
  
  console.log('=== ULTRA SIMPLE CONTACT FORM COMPLETED ===');
  
  return response.setContent(JSON.stringify({
    success: true,
    message: 'Message sent successfully!',
    received: { email, message, name }
  }));
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Ultra simple contact form is running',
    timestamp: new Date().toISOString(),
    message: 'This version handles missing event objects'
  })).setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function testDirectEmail() {
  try {
    MailApp.sendEmail({
      to: 'manesbymiriam@gmail.com',
      subject: 'DIRECT TEST: Email Works',
      body: 'This is a direct test email to verify email sending works.'
    });
    return 'Direct test email sent successfully';
  } catch (error) {
    return 'Direct test email failed: ' + error.message;
  }
}





