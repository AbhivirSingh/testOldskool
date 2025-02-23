require('dotenv').config()
const express = require("express");
const nodemailer = require('nodemailer');
const path = require("path");
const { google } = require("googleapis");
const app = express();

const port = 5000;

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

app.get("/verification/:id", async (req, res) => {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);


    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1ZyXDAaWBCMMuM355vDf9_3UdL-Hec8Hfi2vtZN3rZ88";


    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    });

    let found = false;

    getRows.data.values.forEach((f) => {
        if (f[0] == req.params.id) {
            found = true;
            if (f[5] == '') {
                f[5] = "https://imgs.search.brave.com/5muD4CkkYuOZPC-IHVawU9nrO4nWh0ESskiHYsIBAcc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC82Mi81OS9k/ZWZhdWx0LWF2YXRh/ci1waG90by1wbGFj/ZWhvbGRlci1wcm9m/aWxlLWljb24tdmVj/dG9yLTIxNjY2MjU5/LmpwZw";
            }
            res.render("verify", { f });
        }

    });
    if (!found) { res.send("id not found"); }

    // catch (error) {
    //     console.error("Error:", error);
    //     res.status(500).send("Internal Server Error");
    // }


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
    const name = fname + ' ' + lname;

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