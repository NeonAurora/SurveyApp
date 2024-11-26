import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { surveyData } = req.body;

    // Create a transporter object using SMTP settings
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465, // true for port 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // SMTP username
            pass: process.env.SMTP_PASS, // SMTP password
        },
    });

    // Compose the email content
    const mailOptions = {
        from: process.env.SMTP_FROM, // sender address
        to: process.env.SMTP_TO, // list of receivers
        subject: "Seller Finance Qualification Submitted",
        text: `
            Survey Results:
            ${JSON.stringify(surveyData, null, 2)}
        `,
    };

    try {
        // Send email using the transporter
        await transporter.sendMail(mailOptions);
        console.log("Survey data sent successfully via email.");
        res.status(200).json({ message: "Survey data sent successfully via email." });
    } catch (error) {
        console.error("Failed to send survey data via email:", error);
        res.status(500).json({ message: "Failed to send survey data. Please try again.", errorDetails: error.message });
    }
}
