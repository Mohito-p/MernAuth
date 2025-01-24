const User = require('../models/User');

const getOtpTime = async (req, res, next) => {
    const { token } = req.body;

    try {
        // Validate the token
        if (!token) {
            const error = new Error('Token is required');
            error.statusCode = 400;
            throw error;
        }

        // Find user with the provided token
        const findedUser = await User.findOne({ 'otp.token': token });

        if (!findedUser || !findedUser.otp?.sendTime) {
            const error = new Error('Invalid or expired token');
            error.statusCode = 404; // Not Found
            throw error;
        }

        // Send success response
        res.status(200).json({
            message: 'OTP time retrieved successfully',
            status: true,
            sendTime: findedUser.otp.sendTime,
        });
    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};

module.exports = getOtpTime;
