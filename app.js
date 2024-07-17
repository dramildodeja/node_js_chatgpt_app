require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const title = "Top 3 Coding Languages";
const getResponse = async(codingFor) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 300,
    messages: [{
      role: "user",
      content: `"${title}" for "${codingFor}"`}]
  }).catch((err)=>console.log(err.response));
  return response;
};

//TODO should use template files...
const header = `<head><link rel="stylesheet" href="/style.css"><title>Coding Languages Recommendations</title><img src="/sogeti_logo.png"/></head>`;
const formatResponse = (response, codingFor) => {
  if(!response || !response.data || !response.data.choices || response.data.choices.length === 0){
    //TODO should be moved into template files...
    return `<html>${header}<body><h1>No data found</h1></body></html>`
  }
  const message = response.data.choices[0].message.content.replace(/\n/g,'</p><p>')
  return `<html>${header}<body><h1>Recommendations for "${codingFor}"</h1><p>${message}</p></body></html>`
};

app.get('/', (req, res) => {
  //TODO should route to template file...
  res.send(`
    <html>
      ${header}
      <body>
        <h1>${title}</h1>
        <form method="POST" action="/recommend">
          <label for="codingFor">What are you planning to code for?</label>
          <br><br>
          <input type="text" id="codingFor" name="codingFor"><br>
          <input type="submit" value="Recommend Me">
        </form>
      </body>
    </html>
  `);
});
app.post('/recommend', async (req, res) => {
  const codingFor = req.body.codingFor;
  const response = await getResponse(codingFor);
  const formattedResponse = formatResponse(response, codingFor);
  res.send(formattedResponse);
});

app.listen(process.env.PORT, () => {
  console.log(`Sample NodeJS ChatGPT App Running @ http://localhost:${process.env.PORT}`);
});
