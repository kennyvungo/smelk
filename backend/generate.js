const openaiClient = require("./api.js") 

const generateEvents = async (people, setting, energy) => {
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `Suggest 3 activities for ${people} people that are ${setting} and want to do something ${energy}. Only print the titles of each activity. Do not number the ideas and separate each idea with a comma.`,
        max_tokens: 100
    })
    return response.data.choices[0].text
}

module.exports = generateEvents