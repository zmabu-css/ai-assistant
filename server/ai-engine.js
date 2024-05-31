const vision = require('@google-cloud/vision');
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const openai = require('openai');

const speechClient = new speech.SpeechClient();
const visionClient = new vision.ImageAnnotatorClient();
const ttsClient = new textToSpeech.TextToSpeechClient();
const gptClient = new openai.GPTClient();
const triggerPhrase = "Hey Suzu";

const recognizeSpeech = async (msg) => {
  if (msg.startsWith(triggerPhrase)) {
    return performAction(msg);
  }
  return "Listening...";
};

const performAction = async (command) => {
  if (command.includes("what is the formula to")) {
    const query = command.replace(`${triggerPhrase}, what is the formula to`, '').trim();
    const response = await gptClient.answers({
      query
    });
    return response.result;
  }

  if (command.includes("can you look at my screen and explain what I'm looking at?")) {
    // Logic to analyze the screen
    return "Analyzing screen...";
  }

  return "I'm on it!";
};

module.exports = { recognizeSpeech, performAction };
