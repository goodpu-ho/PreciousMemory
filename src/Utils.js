import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.resolve(__dirname, ".env")});

import { adjectives, nouns } from "./Word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import mg from 'nodemailer-mailgun-transport';

export const generateSecret = () =>{
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

console.log(process.env.MAILGUN_API, process.env.MAILGUN_DOMAIN);

const sendMail = (email) => {
    const options = {
        auth: {
            api_key: process.env.MAILGUN_API,
			domain: process.env.MAILGUN_DOMAIN
        }
    };

    const nodemailerMailgun = nodemailer.createTransport(mg(options));
    return nodemailerMailgun.sendMail(email, (err, info) => {
		if (err) {
			console.log(`Error: ${err}`);
		} else {
			console.log(`Response: ${info}`);
		}
	});
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from:"ho@prismagram.com",
        to:address,
        subject:"🔒 Login Secret for prismagram 🔒",
        html:`Hello, your login secret is ${secret}. copy paste on the app to login`
    };

    return sendMail(email);
}