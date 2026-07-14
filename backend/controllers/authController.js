const db = require("../database/database");
const { generateToken } = require("../utils/jwt");
const { sendSMS } = require("../services/smsService");

function sendOTP(req, res) {

    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "Phone number is required"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + (2 * 60 * 1000);

    db.run(
        `INSERT INTO otp (phone, otp, expires_at)
         VALUES (?, ?, ?)`,
        [phone, otp, expiresAt],
        async function (err) {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }

            try {

                await sendSMS(phone, otp);

                console.log("✅ OTP sent to:", phone);

                res.json({
                    success: true,
                    message: "OTP Sent Successfully"
                });

            } catch (error) {

                console.error(error);

                res.status(500).json({
                    success: false,
                    message: "Failed to send OTP"
                });

            }

        }
    );

}

function verifyOTP(req, res) {

    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({
            success: false,
            message: "Phone number and OTP are required"
        });
    }

    db.get(
        `SELECT * FROM otp
         WHERE phone = ?
         ORDER BY id DESC
         LIMIT 1`,
        [phone],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }

            if (!row) {
                return res.status(400).json({
                    success: false,
                    message: "Please request a new OTP"
                });
            }

            if (Date.now() > row.expires_at) {
                return res.status(400).json({
                    success: false,
                    message: "OTP Expired"
                });
            }

            // ===========================
            // Wrong OTP Protection
            // ===========================

            if (row.otp !== otp) {

                const attempts = row.attempts + 1;

                if (attempts >= 5) {

                    db.run(
                        `DELETE FROM otp WHERE id = ?`,
                        [row.id]
                    );

                    return res.status(401).json({
                        success: false,
                        message: "Maximum attempts reached. Please request a new OTP."
                    });

                }

                db.run(
                    `UPDATE otp
                     SET attempts = ?
                     WHERE id = ?`,
                    [attempts, row.id]
                );

                return res.status(401).json({
                    success: false,
                    message: `Invalid OTP. ${5 - attempts} attempt(s) remaining.`
                });

            }

            // ===========================
            // Correct OTP
            // ===========================

            db.run(
                `DELETE FROM otp WHERE id = ?`,
                [row.id],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Database Error"
                        });
                    }

                    db.get(
                        `SELECT * FROM users WHERE phone = ?`,
                        [phone],
                        (err, user) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: "Database Error"
                                });
                            }

                            if (!user) {

                                db.run(
                                    `INSERT INTO users (phone, created_at, last_login)
                                     VALUES (?, ?, ?)`,
                                    [phone, Date.now(), Date.now()],
                                    (err) => {

                                        if (err) {
                                            return res.status(500).json({
                                                success: false,
                                                message: "Database Error"
                                            });
                                        }

                                        const token = generateToken(phone);

                                        res.json({
                                            success: true,
                                            message: "Login Successful ✅",
                                            token
                                        });

                                    }
                                );

                            } else {

                                db.run(
                                    `UPDATE users
                                     SET last_login = ?
                                     WHERE phone = ?`,
                                    [Date.now(), phone],
                                    (err) => {

                                        if (err) {
                                            return res.status(500).json({
                                                success: false,
                                                message: "Database Error"
                                            });
                                        }

                                        const token = generateToken(phone);

                                        res.json({
                                            success: true,
                                            message: "Login Successful ✅",
                                            token
                                        });

                                    }
                                );

                            }

                        }
                    );

                }
            );

        }
    );

}

module.exports = {
    sendOTP,
    verifyOTP
};