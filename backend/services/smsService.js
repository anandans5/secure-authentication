const twilio = require("twilio");

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(phone, otp) {

    try {

        const message = await client.messages.create({

            body: `Never Give Up OTP: ${otp}`,

            from: process.env.TWILIO_PHONE_NUMBER,

            to: phone

        });

        console.log("✅ SMS Sent");
        console.log(message.sid);

    } catch (err) {

        console.error("❌ Twilio Error");
        console.error(err.message);

        throw err;

    }

}

module.exports = {
    sendSMS
};