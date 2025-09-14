// Final Fixed Google Apps Script Code - Handles all errors
// Copy and paste this into your Google Apps Script project

// IMPORTANT: Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
// Your sheet ID is: 1_FvoF5FUU4cojB4oYywgTShX2t2cKYBIS3cqr94Gsdg
const SHEET_ID = '1_FvoF5FUU4cojB4oYywgTShX2t2cKYBIS3cqr94Gsdg';

function doPost(e) {
  try {
    console.log('doPost called');
    console.log('Event object:', e);
    
    // Handle case where e might be undefined
    if (!e) {
      console.log('Event object is undefined, creating default');
      e = { parameter: {} };
    }
    
    // Handle case where e.parameter might be undefined
    if (!e.parameter) {
      console.log('Parameter object is undefined, creating default');
      e.parameter = {};
    }
    
    console.log('Parameters:', e.parameter);
    
    // Get the spreadsheet by ID (more reliable than getActiveSheet)
    let sheet;
    try {
      const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      sheet = spreadsheet.getActiveSheet();
      console.log('Sheet name:', sheet.getName());
      console.log('Sheet ID:', spreadsheet.getId());
    } catch (sheetError) {
      console.error('Error accessing sheet:', sheetError);
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Cannot access Google Sheet. Please check permissions."}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
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
    let data;
    try {
      data = sheet.getDataRange().getValues();
      console.log('Sheet data:', data);
    } catch (dataError) {
      console.error('Error reading sheet data:', dataError);
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Cannot read sheet data"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
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
    
    try {
      sheet.appendRow([email, timestamp, "Active"]);
      console.log('Row added successfully');
    } catch (appendError) {
      console.error('Error appending row:', appendError);
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: "Cannot add email to sheet"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
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
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    const headers = sheet.getRange(1, 1, 1, 3).getValues()[0];
    console.log('Current headers:', headers);
    
    if (headers[0] !== 'Email' || headers[1] !== 'Date Added' || headers[2] !== 'Status') {
      console.log('Headers are incorrect. Setting correct headers...');
      sheet.getRange(1, 1, 1, 3).setValues([['Email', 'Date Added', 'Status']]);
      console.log('Headers updated successfully');
    } else {
      console.log('Headers are correct');
    }
  } catch (error) {
    console.error('Error checking headers:', error);
  }
}

// Function to test sheet access
function testSheetAccess() {
  try {
    console.log('Testing sheet access...');
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('Spreadsheet opened successfully:', spreadsheet.getName());
    
    const sheet = spreadsheet.getActiveSheet();
    console.log('Active sheet:', sheet.getName());
    
    const data = sheet.getDataRange().getValues();
    console.log('Sheet data:', data);
    
    return 'Sheet access successful';
  } catch (error) {
    console.error('Sheet access failed:', error);
    return 'Sheet access failed: ' + error.toString();
  }
}
