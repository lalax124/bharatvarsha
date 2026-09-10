const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const MODEL = "llama-3.3-70b-versatile";


async function askHeritageAI(stateData, question) {

    const completion = await groq.chat.completions.create({

        model: MODEL,

        messages: [

            {
                role: "system",

                content: `
You are an AI Heritage Guide for India.

Your job is to explain Indian culture, heritage,
traditions, architecture, food, clothing, crafts,
transportation, music and beliefs.

IMPORTANT RULES:

1. Use the provided heritage data as the primary source.
2. Do not invent facts.
3. Clearly distinguish historical facts from folklore.
4. Do not sensationalize religious or cultural practices.
5. If the provided data does not contain enough information,
   clearly say so.
6. Give simple and educational answers.
7. Be respectful toward all cultures and communities.
8. Give the results by judging the information provided in the state data, and not by any other means.
`
            },

            {
                role: "user",

                content: `
STATE INFORMATION:

${JSON.stringify(stateData, null, 2)}

USER QUESTION:

${question}
`
            }

        ]
    });

    return completion.choices[0].message.content;
}


async function compareHeritage(state1Data, state2Data) {

    const completion = await groq.chat.completions.create({

        model: MODEL,

        messages: [

            {
                role: "system",

                content: `
You are an Indian Heritage comparison assistant.

Compare two Indian states using ONLY the
information provided.

Compare:
- Climate
- Clothing
- Food
- Crafts
- Architecture
- Transportation
- Music
- Beliefs
- Language

Do not invent facts.
Keep the comparison clear and easy to understand.
`
            },

            {
                role: "user",

                content: `
STATE 1:

${JSON.stringify(state1Data, null, 2)}


STATE 2:

${JSON.stringify(state2Data, null, 2)}
`
            }

        ]
    });

    return completion.choices[0].message.content;
}


async function createHeritageJourney(stateData, interests) {

    const completion = await groq.chat.completions.create({

        model: MODEL,

        messages: [

            {
                role: "system",

                content: `
You are an AI Indian Heritage Journey planner.

Create a cultural exploration plan based ONLY
on the provided state information.

Focus on the user's interests.

Do not invent attractions or facts that are
not present in the provided information.
Give the plan in the form of a list of activities, places to visit, and cultural experiences.

Keep the plan clear, easy to follow, and educational.
`
            },

            {
                role: "user",

                content: `
STATE:

${JSON.stringify(stateData, null, 2)}


USER INTERESTS:

${interests}
`
            }

        ]
    });

    return completion.choices[0].message.content;
}


module.exports = {
    askHeritageAI,
    compareHeritage,
    createHeritageJourney
};