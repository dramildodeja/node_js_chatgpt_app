# Get API Key
- Goto https://platform.openai.com/
- Complete signup process
- Once logged in, open this link: https://platform.openai.com/api-keys
- Create new API key after verifying via Phone Number
- Remember to copy the key and save somewhere
- Open this link: https://platform.openai.com/usage
- If all approved by OpenAI from verification perspective, you will be issued $5 credit

# How to check which chatgpt models you have access to
curl https://api.openai.com/v1/models -H "Authorization: Bearer <CHATGPT_API_KEY>"

# How to run this app
- Create a .env file in root directory
- env should have below entries:
  CHATGPT_API_KEY=YOUR_CHATGPT_API_KEY
  PORT=3000
- Run this command to start the app "node app.js"
- Everytime you make code changes, make sure to restart the application to see it online
