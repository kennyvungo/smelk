import openaiClient from "./api.js"

const generateEvents = async (eventQuery) => {
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `Suggest 3 fun events for ${people} people that are ${setting} and want to do something ${energy}.`,
        max_tokens: 100,
        temperature: 10
    })
    return response.data.choices[0].text
}

export default generateEvents