const express = require("express");
const nodemailer = require('nodemailer');
const path = require("path");
const app = express();

const port = 5000;

let name, email, message;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index");
});

app.get("/AI", (req, res) => {
    res.render("AI");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/DataAnalytics", (req, res) => {
    res.render("DataAnalytics");
});

app.get("/DigitalMarketing", (req, res) => {
    res.render("DigitalMarketing");
});

app.get("/IOT", (req, res) => {
    res.render("IOT");
});

app.get("/SoftwareDevelopment", (req, res) => {
    res.render("SoftwareDevelopment");
});

app.get("/TestingSolutions", (req, res) => {
    res.render("TestingSolutions");
});

app.get("/main", (req, res) => {
    res.render("index");
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: "reachtoamitoldskool@gmail.com",
        pass: "cwpwxcaaxqbqydrq"
    }
});

const sendmail = async (transporter, mailoptions, res) => {
    try {
        await transporter.sendMail(mailoptions);
        console.log("Email sent successfully");
        res.redirect("/contact");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({ message: "Failed to send email" });
    }
};


app.post("/mail", (req, res) => {
    const { fname, lname, mail, subject, msg } = req.body;
    const name= fname+' '+lname;

    const mailoptions = {
        from: {
            name: name,
            address: process.env.EMAIL_USER // Use your email address
        },
        to: mail,
        subject: subject,
        text: msg,
    };

    sendmail(transporter, mailoptions, res);
});

// const mailoptions = {
//     from: {
//         name: name,
//         address: 'abhivir2005@gmail.com'
//     },
//     // from: "22cs2017@rgipt.ac.in",
//     to: email,
//     subject: "Hello ✔",
//     text: message,
//     // html: "How are you",
//     // attachments: [
//     //     {
//     //         filename: 'text_file.txt',
//     //         path: path.join(__dirname, "text_file.txt"),
//     //         contentType: "text/plain"
//     //     },
//     //     {
//     //         filename: 'nodemailer.png',
//     //         path: path.join(__dirname, "nodemailer.png"), 
//     //         contentType: "image/png"
//     //     }
//     // ]
// };

app.listen(port, () => console.log(`Example app listening at ${port}`));