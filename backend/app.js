require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./users");
const { c, cpp, node, python, java } = require("compile-run");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
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

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(4000, () => {
  console.log("Running");
});

app.post("/register", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
});

app.post("/login", (req, res) => {
  const { uname, password } = req.body;
  userModel
    .findOne({ username: uname })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.status(200).json("success");
        } else {
          res.status(500).json("wrong password");
        }
      } else {
        res.status(500).json("user doesnt exists!");
      }
    })
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
});

app.post("/compile", async (req, res) => {
  const { compileData } = req.body;
  const parts = [
    {
      text: "compile the python {code} according to the problem statement",
    },
    { text: "input:" + compileData },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  const response = result.response;
  const finalData = response.text();

  if (finalData) {
    res.status(200).json({ data: finalData   });
  } else {
    res.status(200).json({ err: "error" });
  }

});

app.post("/addquestion", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err));
});

app.post("/generate_personalised_question", async (req, res) => {
  const { questionData } = req.body;
  const parts = [
    {
      text: "You are a bot that generates coding question to students to increase there coding proficiency and improve their coding skills, you will take certain user inputs and generate personalised questions in a personalised manner, The User name is {name}, He is {difficulty} in {language}. He solved {solved} questions in {language}, give him a only {language} coding question consisting of question title, long description, sample input and output and 3 test cases, give JSON format response with key values question_title, question_description, difficulty, sample_input, sample_output, test_cases, problem_category, hints. make sure you Generate same response type everytime",
    },
    { text: "input:" + questionData },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  const finalData = response.text();
  console.log(finalData);
  let cleanData = finalData.replace(/`|\n/g, "").trim();
  cleanData = cleanData.replace("json", "");
  cleanData = cleanData.replace("JSON", "");
  const jsonData = JSON.parse(cleanData);

  if (finalData) {
    res.status(200).json({ data: jsonData });
  } else {
    res.status(200).json({ err: "error" });
  }
});
