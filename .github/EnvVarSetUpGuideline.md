# Environment Variables Setup Guidelines

This document provides a step-by-step guide to setting up the required `.env` files for both the frontend and backend. These variables are essential for the application to function properly.

---

## **Backend `.env` Variables**

1. **`DBURL (Mongo URL)`**

   - **Description:** The MongoDB connection string.
   - **How to Obtain:**

     1. Go to MongoDB Atlas and sign up or log in.
     2. Create a new cluster if you don't have one already.
     3. Navigate to Database Access and create a new database user with the appropriate permissions (e.g., readWrite).
     4. In the Network Access tab, allow connections from your IP address (or use 0.0.0.0/0 for all IPs for testing).
     5. Go to Clusters, click on Connect, and select Connect your application.
     6. Copy the connection string provided (it should look like `mongodb+srv://<username>: <password>@cluster0.mongodb.net/test?retryWrites=true&w=majority`).
     7. Replace <username> and <password> with the credentials you created in step 3.
     8. Set the DBURL variable in your env file with the full MongoDB Atlas URL.

     For a local MongoDB setup, you can install MongoDB locally and use
     `mongodb://localhost:27017/your-database-name`

2. **`HOST_EMAIL (NodeMailer)`**

   - **Description:** The email used as the sender in NodeMailer.
   - **How to Obtain:**

     1. Go to Google's App Passwords.
     2. Select Mail as the app and Other as the device.
     3. Generate a new password and copy it.
     4. Set HOST_EMAIL to your email address (e.g., youremail@gmail.com) and PASSWORD to the generated app password.

     ```
     HOST_EMAIL=youremail@gmail.com
     PASSWORD=your_app_password
     PORT=587
     ```

3. **`STRIPE_SECRET_KEY`**

   - **Description:** The app password for the email account used with NodeMailer.
   - **How to Obtain:**

     1. Go to Stripe Dashboard.
     2. In the Developers section, find API keys.
     3. Copy the Secret Key (start with sk*test* for test environments).
     4. Set the STRIPE_SECRET_KEY in the env file.

     `STRIPE_SECRET_KEY=your_stripe_secret_key`

4. **`DOMAIN (Backend Server after Deployment)`**

   - **Description:** This is the domain where your backend will be hosted. If you're deploying to a platform like Heroku, Vercel, or any cloud service, use the public domain provided.

   For example:

   `DOMAIN=https://yourdomain.com`

5. **`SECRET (JWT Secret for Encryption)`**

   - **Description:** This is a secret key used for encoding JWT tokens. You can generate a random string using a tool like [Random.org](https://www.random.org) or by using Node.js:

   `require('crypto').randomBytes(64).toString('hex');`

   Set this in your `.env` file:

   `SECRET=your_secret_key`

6. **`TWILIO_WHATSAPP_ACCOUNT_SID`**

   - **Description:** The Account SID (unique identifier) for your Twilio account.
   - **How to Obtain:**

     1. Log in to your [Twilio Console](https://console.twilio.com/).
     2. On the Account Dashboard, go to the **For You** tab.
     3. Scroll down to the **Account Info** section to find your Account SID.
     4. Copy the Account SID and set it as `TWILIO_WHATSAPP_ACCOUNT_SID` in your `.env` file.

     `TWILIO_WHATSAPP_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

7. **`TWILIO_WHATSAPP_AUTH_TOKEN`**

   - **Description:** The authentication token used to verify and authenticate requests to Twilio.
   - **How to Obtain:**
     1. Log in to your [Twilio Console](https://console.twilio.com/).
     2. On the Account Dashboard, go to the **For You** tab.
     3. Scroll down to the **Account Info** section.
     4. Click on the show icon to reveal the Auth Token.
     5. Copy the token and set it as `TWILIO_WHATSAPP_AUTH_TOKEN` in your `.env` file.

     `TWILIO_WHATSAPP_AUTH_TOKEN=your_auth_token`

8. **`TWILIO_WHATSAPP_FROM`**

   - **Description:** The Twilio WhatsApp-enabled phone number used to send messages.
   - **How to Obtain:**
     1. Log in to your [Twilio Console](https://console.twilio.com/).
     2. In the Twilio Console, go to the **Develop Tab**.
     3. Navigate to **Messaging → Try it Out → Send WhatsApp Message**.
     4. To enable the WhatsApp Sandbox for testing follow the provided instructions to send a test message to Twilio's sandbox number and verify your phone for sandbox use.
     5. Twilio will send a WhatsApp-enabled sandbox number to your WhatsApp in the format `whatsapp:+1234567890`.
     6. Copy the number and set it as `TWILIO_WHATSAPP_FROM` in your `.env` file.

     `TWILIO_WHATSAPP_FROM=whatsapp:+1234567890`

   - Optional steps(To verify your sandbox participants):
     1. In the Twilio Console - **Develop Tab**, navigate to **Messaging → Try it Out → Send WhatsApp Message**.
     2. Under the **Sandbox Settings** tab, scroll to **Sandbox Participants** to view all numbers registered in the sandbox.

---

## **Frontend `.env` Variables**

1. **`VITE_PUBLICATION_KEY`**

   - **Description:** The public Stripe key for client-side payment processing.
   - **How to Obtain:**

     1. Log in to the [Stripe dashboard](https://dashboard.stripe.com/).
     2. Navigate to the Developers section.
     3. Click on API Keys.
     4. Copy the Publishable Key (starts with pk*test* for test environments).
     5. Set the VITE_PUBLICATION_KEY variable in your env file with the copied key.

     `VITE_PUBLICATION_KEY=your_stripe_publishable_key`

2. **`VITE_JAAS_APP_ID`**

   - **Description:** The key for integrating Jitsi Meet video conferencing.
   - **How to Obtain:**

     1. Go to the [Jitsi developer portal](https://jaas.8x8.vc/).
     2. Sign up or log in to your account.
     3. Navigate to the API section.
     4. Create a new application if you don't have one.
     5. Copy the App ID provided.
     6. Set the VITE_JAAS_APP_ID variable in your env file with the copied App ID.

     `VITE_JAAS_APP_ID=your_jaas_app_id`

   3. **`VITE_API_KEY`**

   - **Description:** The API key for Chat-Bot
   - **How to Obtain:**
     1. Go to the [Google AI Studio](https://aistudio.google.com/app/apikey).
     2. Sign in with your Google account.
     3. Once logged in, you should see an interface for managing projects and API keys (If prompted, create a new project or select an existing one).
     4. Now In the API Key section, look for an option to Generate API Key & click on it to create a new API key
     5. Once the key is generated, it will be displayed on the screen.
     6. Copy the API key.
     7. Open your `.env` file in frontend folder.
     8. Replacing `your_api_key` with the key you copied:
        `VITE_API_KEY = your_API_key`

---

### **Important Notes**

- Always keep `.env` files private and do not expose them in version control systems like GitHub.
- Use environment variable management tools like `dotenv` in development or configure the deployment environment with these variables.
- Ensure secure storage and limited access to keys, passwords, and tokens.

---
