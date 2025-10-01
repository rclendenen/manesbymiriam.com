// Minimal Test Google Apps Script for Contact Form
// This is a simple version to test if the basic connection works

function doPost(e) {
  console.log('=== MINIMAL TEST STARTED ===');
  console.log('Event object received:', !!e);
  
  if (!e) {
    console.log('Event object is null/undefined');
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'No event object received',
      debug: 'Event is null or undefined'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('Event object type:', typeof e);
  console.log('Event object keys:', Object.keys(e));
  
  // Try to get any data
  let email = 'unknown';
  let message = 'no message';
  let name = 'unknown';
  
  if (e.parameter) {
    email = e.parameter.email || 'no email in parameter';
    message = e.parameter.message || 'no message in parameter';
    name = e.parameter.name || 'no name in parameter';
    console.log('Got from e.parameter:', { email, message, name });
  } else if (e.postData && e.postData.contents) {
    console.log('Trying postData.contents:', e.postData.contents);
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
  
  console.log('Final data:', { email, message, name });
  
  // Send a simple test email
  try {
    MailApp.sendEmail({
      to: 'manesovermiriam@gmail.com',
      subject: 'TEST: Contact Form Working',
      body: `Test email from contact form:
      
Name: ${name}
Email: ${email}
Message: ${message}

This is a test to confirm the contact form is working.`
    });
    console.log('Test email sent successfully');
  } catch (emailError) {
    console.log('Email error:', emailError);
  }
  
  console.log('=== MINIMAL TEST COMPLETED ===');
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Test completed - check your email',
    received: {
      email: email,
      message: message,
      name: name
    }
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Minimal test service is running',
    timestamp: new Date().toISOString(),
    message: 'This is a test version'
  })).setMimeType(ContentService.MimeType.JSON);
}





