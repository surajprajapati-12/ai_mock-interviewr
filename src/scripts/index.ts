import {
    GoogleGenerativeAI, //The main class that allows interaction with Google's Generative AI models.
    HarmCategory, //Represents different categories of harmful content (e.g., harassment, hate speech).
    HarmBlockThreshold, //Defines how strictly the AI model should block harmful content.
  } from "@google/generative-ai";
//   console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY);

//   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apikeys="AIzaSyAYSWTGI2dkj--xsL5Cd-b8DAKf_USjl_Q";
  const genAI = new GoogleGenerativeAI(apikeys);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1, //high temp->more creative and diverse response
    topP: 0.95, //control probability mass of randomness
    topK: 40,  //limits how many words AI consider at each step
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  export const chatSession = model.startChat({
    generationConfig,
    safetySettings,
  });