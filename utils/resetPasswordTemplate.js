const resetPasswordTemplate = (resetLink) =>
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

module.exports = resetPasswordTemplate;
