import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

export const fetchAiResponse = createAsyncThunk(
  "ai/fetchAiResponse",
  async ({ koName, gender }, { rejectWithValue }) => {
    try {
      // AI API 호출
      // Using `responseMimeType` requires one of the Gemini 1.5 Pro or 1.5 Flash models
      let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        // Set the system instruction during model initialization
        systemInstruction:
          "Please recommend an English name that suits the Korean name, gender, and age as much as possible. When you tell me the reason why you recommend the English name, please translate it into Korean and let me know. Please avoid recommending overlapping English names.",
        // Set the `responseMimeType` to output JSON
        generationConfig: { responseMimeType: "application/json" },
      });

      let prompt = `
      The Korean name is ${koName}. 
      The gender is ${gender}. 
      Please recommend 10 English names that are as similar to the pronunciation of Korean names as possible.
      Please keep in mind that you should always tell in Korean.
      Please think about why you recommend that English name in as much detail as possible and let me know by translating it into Korean.
      Also tell me the meaning of the English name in korean and the personality of the name in Korean using this JSON schema:
      { "type": "object",
        "properties": {
          "name": { "type": "string" },
          "reason": { "type": "string" },
          "meaning": { "type": "string" },
          "personality": { "type": "string" },
        }
      }`;

      let result = await model.generateContent(prompt);
      // 응답을 텍스트로 변환 후 JSON으로 파싱
      let textResponse = await result.response.text();
      console.log("Raw text response:", textResponse);

      // JSON 문자열을 배열로 변환
      let jsonResponse;

      // 응답이 배열인지 확인
      try {
        if (
          textResponse.trim().startsWith("[") &&
          textResponse.trim().endsWith("]")
        ) {
          jsonResponse = JSON.parse(textResponse);
          console.log("jsonResponse 1: " + jsonResponse);
        } else {
          jsonResponse = JSON.parse(`[${textResponse}]`);
          console.log("Parsed JSON response2:", jsonResponse);
        }
      } catch (e) {
        console.error("JSON parsing error: ", e);
        return rejectWithValue("Invalid JSON format");
      }

      return jsonResponse;
    } catch (error) {
      console.error("API call error: ", error);
      return rejectWithValue(error.message);
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiResponse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAiResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchAiResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default aiSlice.reducer;
