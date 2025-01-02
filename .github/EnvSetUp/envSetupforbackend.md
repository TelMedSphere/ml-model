## Backend `.env` Setup

To set up the backend environment, you need to configure the `.env` file with the following variables.

1. **DBURL**: MongoDB Atlas URL
   - If you are using MongoDB Atlas, create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - After creating the cluster, click on `Connect` > `Connect Your Application` and copy the connection string.
   - Replace the placeholder `<password>` with your MongoDB password, and replace `myFirstDatabase` with your database name.
   - Example:
     ```env
     DBURL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
     ```

2. **HOST_EMAIL**: Your host email (for email-related features)
   - Example:
     ```env
     HOST_EMAIL=your_email@example.com
     ```

3. **PASSWORD**: App-specific password for your email
   - You can generate an app password from your email provider's settings.

4. **STRIPE_SECRET_KEY**: Your Stripe secret key for payments
   - You can get your Stripe secret key from your Stripe Dashboard.

5. **DOMAIN**: Backend domain after deployment (optional)
   - Example:
     ```env
     DOMAIN=your_domain.com
     ```

6. **SECRET**: JWT secret key for encryption
   - Example:
     ```env
     SECRET=your_jwt_secret_key
     ```

7. **WHATSAPP**: WhatsApp API token (if using WhatsApp notifications)
   - Example:
     ```env
     WHATSAPP=your_whatsapp_api_token
     ```

---

