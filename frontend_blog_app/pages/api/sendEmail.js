import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export default async function sendEmail(req, res) {
    const { method } = req;


    if (method === 'POST') {
        const { message, subject, name, phone, email } = req.body;

        const auth = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD

            }
        });

        const receiver = {
            from: process.env.SMTP_EMAIL,
            to: process.env.SEND_MAIL_TO,
            subject: "Someone Contact RoboSuperior!",
            html: `<!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            .image_block img+div {
                display: none;
            }
    
            @media (max-width:660px) {
                .desktop_hide table.icons-inner {
                    display: inline-block !important;
                }
    
                .icons-inner {
                    text-align: center;
                }
    
                .icons-inner td {
                    margin: 0 auto;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .row-content {
                    width: 100% !important;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>
    
    <body class="body" style="margin: 0; background-color: #21252b; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: auto; background-color: #21252b; background-image: none; background-position: top left;">
            <tbody>
                <tr>
                    <td>
                        <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #21252b; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7226/background-test_2.png'); background-position: top center; background-repeat: no-repeat; background-size: auto;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <div class="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                                                        <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-top:5px;width:100%;">
                                                                    <div class="alignment" align="center" style="line-height:10px">
                                                                        <div style="max-width: 84px;"><img src="https://8d88e97e10.imgdist.com/pub/bfra/j4cgxt4b/cb5/uwm/jon/Robo%20Superior_20240618_102215_0000_1.png" style="display: block; height: auto; border: 0; width: 100%;" width="84" alt="Your Logo" title="Your Logo" height="auto"></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                                                        <table class="heading_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;"><span class="tinyMce-placeholder">&nbsp; &nbsp; &nbsp; RoboSuperior Contact Info</span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                                                        <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                    <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span class="tinyMce-placeholder">This is: <em>${name}</em></span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="heading_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                    <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span class="tinyMce-placeholder">Email: <em>${email}</em></span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="heading_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                    <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span class="tinyMce-placeholder">Subject: <em>${subject}</em></span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="heading_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                    <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span class="tinyMce-placeholder">Phone: <em>${phone}</em></span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-9" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                    <div style="color:#f4ede6;font-family:Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:20px;line-height:180%;text-align:left;mso-line-height-alt:36px;">
                                                                        <h3 style="margin: 0;">Message: ${message}</h3>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div class="spacer_block block-10" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                        <div class="spacer_block block-11" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                        <div class="spacer_block block-12" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #21252b; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4ede6;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #f4ede6; width: 640px; margin: 0 auto;" width="640">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <div class="spacer_block block-1" style="height:80px;line-height:80px;font-size:1px;">&#8202;</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 640px; margin: 0 auto;" width="640">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;">
                                                            <tr>
                                                                <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                                <!--[if !vml]><!-->
                                                                                <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
                                                                                    <tr>
                                                                                        <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="https://www.linkedin.com/in/06nurahmed/" target="_blank" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                                                                        <td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="https://www.linkedin.com/in/06nurahmed/" target="_blank" style="color: #1e0e4b; text-decoration: none;">Developed by Nur Ahmad</a></td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    
    </html>`
        };

        auth.sendMail(receiver, (error, emailResponse) => {
            if (error)
                throw error;
            console.log("success!");
            response.end();
        });

        // return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
        res.status(200).json({ message: phone });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
