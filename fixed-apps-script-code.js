// Fixed Google Apps Script Code for Newsletter
// Copy and paste this into your Google Apps Script project

function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('doPost called with:', e);
    console.log('Parameters:', e.parameter);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    console.log('Sheet name:', sheet.getName());
    
    // Get the email from the POST request
    const email = e.parameter.email;
    console.log('Email received:', email);
    
    // Validate email format
    if (!email || !isValidEmail(email)) {
      console.log('Invalid email:', email);
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Invalid email address"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists
    const data = sheet.getDataRange().getValues();
    console.log('Sheet data:', data);
    
    const emails = data.map(row => row[0]).slice(1); // Skip header row
    console.log('Existing emails:', emails);
    
    if (emails.includes(email)) {
      console.log('Email already exists:', email);
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Email already subscribed"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add new subscription
    const timestamp = new Date();
    console.log('Adding new subscription:', email, timestamp);
    
    sheet.appendRow([email, timestamp, "Active"]);
    console.log('Row added successfully');
    
    // Send confirmation email (optional - comment out if causing issues)
    try {
      const emailBody = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
        '<h2 style="color: #d4af8c;">Welcome to Manes by Miriam!</h2>' +
        '<p>Thank you for subscribing to our newsletter! We are excited to share:</p>' +
        '<ul>' +
        '<li>Exclusive hair care tips</li>' +
        '<li>Seasonal specials and promotions</li>' +
        '<li>Behind-the-scenes content</li>' +
        '<li>New service announcements</li>' +
        '</ul>' +
        '<p>We respect your privacy and will never share your email address.</p>' +
        '<p>Best regards,<br>Miriam - Manes by Miriam</p>' +
        '</div>';
        
      MailApp.sendEmail({
        to: email,
        subject: "Welcome to Manes by Miriam Newsletter!",
        htmlBody: emailBody
      });
      console.log('Welcome email sent to:', email);
    } catch (emailError) {
      console.log("Email sending failed:", emailError);
      // Continue even if email fails
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: "Successfully subscribed!"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("Error in doPost:", error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: "Server error: " + error.toString()}))
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

// Test function to verify the script works
function testSubscription() {
  const testData = {
    parameter: {
      email: "test@example.com"
    }
  };
  
  console.log('Running test subscription...');
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
  return result;
}

// Function to check sheet headers
function checkSheetHeaders() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, 3).getValues()[0];
  console.log('Current headers:', headers);
  
  if (headers[0] !== 'Email' || headers[1] !== 'Date Added' || headers[2] !== 'Status') {
    console.log('Headers are incorrect. Setting correct headers...');
    sheet.getRange(1, 1, 1, 3).setValues([['Email', 'Date Added', 'Status']]);
    console.log('Headers updated successfully');
  } else {
    console.log('Headers are correct');
  }
}
