const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openaiApiKey = process.env.OPENAI_API

console.log("inside api file")

if (!openaiApiKey) {
    console.error("key is not set")
    process.exit(1)
}

const configuration = new Configuration({
    apiKey: openaiApiKey
})

const openai = new OpenAIApi(configuration)

module.exports = openai;