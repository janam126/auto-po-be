const { extractDateTime } = require("./dateUtils");

exports.resetPasswordTemplate = ({ resetLink }) =>
	`<!DOCTYPE html>
   <html lang="en">
      <head>
         <meta charset="utf-8" />
         <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
         <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet" />
         <meta name="theme-color" content="#000000" />
         <meta
            name="description"
            content="Navigate through your purchase orders with ease, smoothly managing transactions. Application made by StageFront" />
         <title>Password Reset</title>
         <style>
            * {
               margin: 0;
               padding: 0;
               box-sizing: border-box;
               font-family: "Montserrat", "Verdana", sans-serif;
            }
            body {
               padding: 20px;
            }
            .container {
               background-color: #f6f7f7;
               width: 700px;
               max-width: 100%;
               padding: 70px 20px;
            }
            .inner-container {
               width: 300px;
               max-width: 100%;
               margin: 0 auto;
            }
            .upHeader {
               color: #3b3b3b;
               text-align: center;
               font-size: 24px;
               font-weight: 700;
               line-height: 32.5px;
               margin-bottom: 10px;
            }
            p {
               color: #3b3b3b;
               text-align: center;
               font-size: 14px;
               font-weight: 400;
               line-height: 20px;
            }
            .upParagraph {
               margin-bottom: 100px;
            }
            .buttonContainer {
               text-align: center;
            }
            .buttonContainer button {
               width: 200px;
               height: 40px;
               background-color: #1c1b17;
               border:none;
               border-radius: 4px;
               font-weight: bold;
               cursor: pointer;
               transition: 200ms;
               margin-bottom: 60px;
            }
            .buttonContainer button a {
               color: white;
               text-decoration: none;
            }
            .buttonContainer button:hover {
               scale: 1.1;
            }
         </style>
      </head>
      <body>
         <div class="container">
            <div class="inner-container">
               <h1 class="upHeader">Password Reset</h1>
               <p class="upParagraph">
                  If you’ve lost your password or wish to reset it, use the link below to get started.
               </p>
               <div class="buttonContainer">
                  <button><a href=${resetLink}>Reset your password</a></button>
               </div>
               <p class="downParagraph">
                  If you did not request a password reset, you can safely ignore this email. Only a
                  person with access to your email can reset your account password.
               </p>
            </div>
         </div>
      </body>
   </html>
   
`;

exports.addedToAPO = ({ invitedBy, company }) =>
	`<!DOCTYPE html>
   <html lang="en">
      <head>
         <meta charset="utf-8" />
         <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
         <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet" />
         <meta name="theme-color" content="#000000" />
         <meta
            name="description"
            content="Navigate through your purchase orders with ease, smoothly managing transactions. Application made by StageFront" />
         <title>Password Reset</title>
         <style>
            * {
               margin: 0;
               padding: 0;
               box-sizing: border-box;
               font-family: "Montserrat", "Verdana", sans-serif;
            }
            body {
               padding: 20px;
            }
            .container {
               background-color: #f6f7f7;
               width: 700px;
               max-width: 100%;
               padding: 70px 20px;
            }
            .inner-container {
               width: 300px;
               max-width: 100%;
               margin: 0 auto;
            }
            .upHeader {
               color: #3b3b3b;
               text-align: center;
               font-size: 24px;
               font-weight: 700;
               line-height: 32.5px;
               margin-bottom: 10px;
            }
            p {
               color: #3b3b3b;
               text-align: center;
               font-size: 14px;
               font-weight: 400;
               line-height: 20px;
            }
            .upParagraph {
               margin-bottom: 30px;
            }
         </style>
      </head>
      <body>
         <div class="container">
            <div class="inner-container">
               <h1 class="upHeader">Welcome to Auto PO</h1>
               <p>Invited by: ${invitedBy}</p>
               <p class="upParagraph">Invited to company: ${company}</p>
               <p>We're glad to have you on onboard!</p>
         </div>
      </body>
   </html>
`;

const AutoPOEmailStyletag = `<style>
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: sans-serif;
   }
   .container {
      width: 580px;
      max-width: 100%;
      border-radius: 10px;
      overflow: hidden;
   }
   .header {
      background-color: #000;
      color: white;
      padding: 20px;
   }
   .subHeader {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-color: #292932;
      padding: 10px 25px;
      display: flex;
      justify-content: space-between;
      color: #e3e3e3;
      align-items: center;
   }
   .subHeaderLeft {
      font-weight: bold;
      font-size: 12px;
   }
   .subHeaderRight {
      font-size: 12px;
   }
   .subHeaderContent {
      background-color: white;
      padding: 20px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding-bottom: 0px;
   }
   .subHeaderContentTop {
      gap: 5px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e6e6e6;
   }
   .up {
      color: #6d7688;
      font-size: 10px;
      margin-bottom: 4px;
   }
   .middle,
   .bottom {
      font-weight: bold;
      margin-bottom: 4px;
      font-size: 12px;
   }
   .subHeaderContentBottom {
      padding: 20px;
   }
   .justify {
      display: flex;
   }
   .headerMain {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
   }
   .headerSub {
      font-size: 14px;
   }
   .content {
      padding: 20px;
      background-color: #f6f7f7;
   }
   .universalContentStyle {
      gap: 20px;
      font-size: 13px;
      margin-bottom: 20px;
   }
   .universalContentStyle > * {
      margin-bottom: 15px;
   }
</style>`;

const handleMissingInfo = (item) => {
	if (!item) return `<span style="text-decoration: underline;">Info missing</span>`;
	return item;
};

exports.missingInfoMail = ({ missingInfo, data }) => {
	let missingInfoList = ``;
	missingInfo.forEach((i) => (missingInfoList += `<li>${i}</li>`));

	const { EventName, Venue, EventDate, OrderID } = data;
	const { date, time } = extractDateTime(EventDate);

	return `<!DOCTYPE html>
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>AutoPO - Missing info</title>
         ${AutoPOEmailStyletag}
      </head>
      <body>
         <div class="container">
            <header class="header">
               <p class="headerMain">Stage Front Auto PO</p>
               <p class="headerSub">Action Required: Incomplete Purchase Order ID ${handleMissingInfo(OrderID)}</p>
            </header>
            <div class="content">
               <div class="universalContentStyle">
                  <p>Dear user,</p>
                  <p>We are reaching out to inform you that your recent purchase order for ${handleMissingInfo(EventName)} on ${handleMissingInfo(EventDate)} is currently on hold due to missing information that is essential for us to proceed with your order.</p>
                  <p>To complete your purchase we kindly ask you to provide the missing details at your earliest convenience.</p>
               </div>
               <div class="universalContentStyle">
                  <div>
                     <div class="header subHeader">
                        <div class="subHeaderLeft">Missing Information</div>
                        <div class="subHeaderRight" style="margin-left:auto;">PO ID: ${handleMissingInfo(OrderID)}</div>
                     </div>
                     <div class="subHeaderContent">
                        <div class="subHeaderContentTop">
                           <div class="up justify">
                              <div>Event Details:</div>
                              <div style="margin-left:auto;">Date and time</div>
                           </div>
                           <div class="middle justify">
                              <div>Name: ${handleMissingInfo(EventName)}</div>
                              <div style="margin-left:auto;">${handleMissingInfo(date)}</div>
                           </div>
                           <div class="bottom justify">
                              <div>Venue: ${handleMissingInfo(Venue)}</div>
                              <div style="margin-left:auto;">${handleMissingInfo(time)}</div>
                           </div>
                        </div>
                        <div class="subHeaderContentBottom">
                           <ul>${missingInfoList}</ul>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="universalContentStyle">
                  <p>
                     You can update your Purchase Order directly through your account or for assistance,
                     please contact our Stage Front customer support team — do not reply to this
                     automated email.
                  </p>
                  <p>
                     Please note that your order will remain on hold until we receive the complete
                     information. We appreciate your prompt attention to this matter to ensure a smooth
                     and efficient service.
                  </p>
               </div>
               <div class="universalContentStyle">
                  <p>Thank you for your cooperation.</p>
               </div>
               <div class="universalContentStyle">
                  <div>
                     <p>Best regards,</p>
                     <p>Stage Front</p>
                  </div>
               </div>
            </div>
         </div>
      </body>
   </html>
   `;
};

exports.poCreatedMail = ({ data }) => {
	const { _id, __v, History, ...filteredData } = data;
	const poDataToArray = Object.entries(filteredData)
		.filter(([k, v]) => v !== null)
		.map(([k, v]) => [`${k}: ${v}`]);

	let poData = ``;
	poDataToArray.forEach((i) => (poData += `<li>${i}</li>`));
	const { date, time } = extractDateTime(data?.EventDate);

	return `<!DOCTYPE html>
   <html lang="en">
      <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <title>Auto PO - Order create</title>
         ${AutoPOEmailStyletag}
      </head>
      <body>
         <div class="container">
            <header class="header">
               <p class="headerMain">Stage Front Auto PO</p>
               <p class="headerSub">Action Required: Incomplete Purchase Order ID  ${handleMissingInfo(data?.OrderID)}</p>
            </header>
            <div class="content">
               <div class="universalContentStyle">
                  <p>Dear user,</p>
                  <p>You successfully created a purchase order</p>
               </div>
               <div class="universalContentStyle">
                  <div>
                     <div class="header subHeader">
                        <div class="subHeaderLeft">Purchase order Information</div>
                        <div class="subHeaderRight" style="margin-left:auto;">PO ID: ${handleMissingInfo(data?.OrderID)}</div>
                     </div>
                     <div class="subHeaderContent">
                        <div class="subHeaderContentTop">
                           <div class="up justify">
                              <div>Event Details:</div>
                              <div style="margin-left:auto;">Date and time</div>
                           </div>
                           <div class="middle justify">
                              <div>Name: ${handleMissingInfo(data?.EventName)}</div>
                              <div style="margin-left:auto;">${handleMissingInfo(date)}</div>
                           </div>
                           <div class="bottom justify">
                              <div>Venue: ${handleMissingInfo(data?.Venue)}</div>
                              <div style="margin-left:auto;">${handleMissingInfo(time)}</div>
                           </div>
                        </div>
                        <div class="subHeaderContentBottom">
                           <ul>
                              ${poData}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="universalContentStyle">
                  <div>
                     <p>Best regards,</p>
                     <p>Stage Front</p>
                  </div>
               </div>
            </div>
         </div>
      </body>
   </html>
   `;
};
