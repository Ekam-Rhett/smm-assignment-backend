// REPLY
router.route('/reply/:id').post((req,res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    
    let mailOptions = {
        from: process.env.EMAIL,
        to: "email@gmail.com",
        subjext: "hello",
        text: "hello",
    }
    
    transporter.sendMail(mailOptions, function(err, success){
        if (err) {
            console.log(err)
        }
        else {
            console.log("email sent successfully")
        }
    })});