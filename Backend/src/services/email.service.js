const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

//? Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

//? Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Account Ledger" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = "Welcome to Account Ledger - Manage Your Records Easily";

    const text = `Hi ${name},

                Welcome to Account Ledger!
                
                Your account has been successfully created. 
                Account Ledger helps you keep track of your financial records, transactions, and balances in a simple and organized way.
                
                You can now start adding your entries and managing your ledger anytime.
                
                If you have any questions or need help, feel free to reach out to us.
                
                Best regards,
                Account Ledger Team
                `;

    const html = `
                    <div style="font-family: Arial, sans-serif; line-height:1.6;">
                        <h2 style="color:#2c3e50;">Welcome to Account Ledger 🎉</h2>
                        <p>Hi <b>${name}</b>,</p>
                
                        <p>Your account has been successfully created.</p>
                
                        <p>
                        <b>Account Ledger</b> helps you manage your financial records,
                        track transactions, and maintain balances in an organized way.
                        </p>
                
                        <p>You can now start using the platform to manage your ledger easily.</p>
                
                        <p>If you ever need help, feel free to contact us.</p>
                
                        <br>
                
                        <p>Best regards,<br>
                        <b>Account Ledger Team</b></p>
                    </div>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Successful - Account Ledger";

    const text = `Hi ${name},
                    Your transaction has been successfully processed.
                    
                    Transaction Details:
                    Amount: ₹${amount}
                    Recipient Account ID: ${toAccount}
                    
                    If you did not initiate this transaction, please contact support immediately.
                    
                    Thank you for using Account Ledger.
                    
                    Best regards,
                    Account Ledger Team`;

    const html = `<div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
                    <h2 style="color:#2c3e50;">Transaction Successful ✅</h2>
        
                    <p>Hi <b>${name}</b>,</p>
        
                    <p>Your transaction has been processed successfully.</p>
        
                    <div style="background:#f4f6f8; padding:15px; border-radius:8px; margin:15px 0;">
                        <p><b>Amount:</b> ₹${amount}</p>
                        <p><b>Recipient Account ID:</b> ${toAccount}</p>
                    </div>
        
                    <p>If you did not initiate this transaction, please contact support immediately.</p>
        
                    <br>
        
                    <p>Best regards,<br>
                    <b>Account Ledger Team</b></p>
                    </div>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
}