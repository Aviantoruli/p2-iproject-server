const nodemailer = require("nodemailer")

class SendMail {
    static send(email) {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "hackshoe7@gmail.com",
                pass: "eyeshield21"
            }
        })

        let mailDetails = {
            from: "hackshoe7@gmail.com",
            to: email,
            subject: "HackShoe",
            text: "terima kasih telah berbelanja di toko kami, kami akan memproses pesanan anda"
        }

        // mail sent code
        return mailTransporter.sendMail(mailDetails, function (err, data) {
            let error = err ? "Error Occurs" : "Email sent successfully"
            console.log(error);
        })
    }
}

module.exports = SendMail