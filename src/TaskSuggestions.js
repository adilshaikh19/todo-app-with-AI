import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useParams } from "react-router-dom";

const TaskSuggestions = () => {
  const { task } = useParams(); // Get the task from the URL
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchAIResponse = async () => {
      setLoading(true);
      setError(null);
      try {
        const genAI = new GoogleGenerativeAI(
          process.env.REACT_APP_GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate five task suggestions based on the following task: ${task}`;

        const result = await model.generateContent(prompt);

        const generatedText = await result.response.text();

        

        setSuggestions(
          generatedText.split("\n").filter((s) => s.trim() !== "")
        );
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setError("Failed to generate suggestions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, [task]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">AI Task Suggestions</h2>

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Generating suggestions, please wait...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div>
          {suggestions.length > 0 ? (
            <ul className="list-group">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="list-group-item">
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskSuggestions;
