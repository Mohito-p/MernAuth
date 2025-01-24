const User = require('../models/User');

const verifyOtp = async (req, res, next) => {
    const { otp } = req.body;

    try {
        const findedUser = await User.findOne({ 'otp.otp': otp });
        if (!findedUser) {
            return res.status(400).json({ message: 'Invalid OTP', status: false });
        }

        if (new Date(findedUser.otp.sendTime).getTime() < new Date().getTime()) {
            return res.status(400).json({ message: 'OTP expired', status: false });
        }

        findedUser.otp.otp = null;
        await findedUser.save();

        res.status(200).json({ message: 'OTP verified', status: true });
    } catch (error) {
        console.error("Error in verifyOtp:", error);
        next(error);
    }
};

module.exports = verifyOtp;
