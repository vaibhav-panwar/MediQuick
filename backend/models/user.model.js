const mongoose = require("mongoose");
const validator = require("validator")

let userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'name field is empty'] },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("this email already exists")
            }
        }
    },
    password: { type: String, required: [true, 'password field is empty'] }
}, {
    versionKey: false,
    timestamps: true
})

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };