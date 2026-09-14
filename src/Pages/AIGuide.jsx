import React, { useEffect, useState } from "react";

function AIGuide() {
  const [statesData, setStatesData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load states from local data
    const loadStates = async () => {
      try {
        // Extract state names from india-states.json if available
        // Otherwise, define a local list of states
        const statesList = [
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal",
          "Andaman and Nicobar",
          "Chandigarh",
          "Dadra and Nagar Haveli",
          "Daman and Diu",
          "Delhi",
          "Lakshadweep",
          "Puducherry",
        ];

        setStatesData(
          statesList.map((state, index) => ({
            id: index,
            name: state,
          }))
        );
      } catch (error) {
        console.error("Error loading states:", error);
      }
    };

    loadStates();
  }, []);

  const handleSendMessage = () => {
    if (!input.trim() || !selectedState) {
      alert("Please select a state and enter a question");
      return;
    }

    const userMessage = {
      sender: "You",
      text: input,
      type: "user",
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        sender: "Heritage AI",
        text: `That's a great question about ${selectedState}! Here's information about the cultural heritage, traditions, and stories of this region. The heritage of ${selectedState} includes unique crafts, classical arts, festivals, and culinary traditions that have been passed down through generations.`,
        type: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5ebdd",
        color: "#29251f",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #6b3e26 0%, #8a4d2e 100%)",
          color: "white",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "38px", marginBottom: "10px" }}>Heritage AI</h1>
        <p style={{ fontSize: "16px", marginBottom: "0" }}>
          Explore India's rich cultural heritage through conversation
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "20px",
          backgroundColor: "#fff9f0",
          borderBottom: "1px solid #ddd",
          flexWrap: "wrap",
        }}
      >
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ba986e",
            background: "#ba945a",
            color: "#29251f",
            fontSize: "15px",
            cursor: "pointer",
            minWidth: "150px",
          }}
        >
          <option value="">Select a state...</option>
          {statesData.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            flex: "0 1 150px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ba986e",
            background: "#ba945a",
            color: "#29251f",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Chat Box */}
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#4c3d26",
          minHeight: "400px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#806e60",
            }}
          >
            <h2 style={{ color: "#6b3e26", marginBottom: "10px" }}>
              Welcome to Heritage AI
            </h2>
            <p>
              Choose a state and ask me anything about its culture, food,
              clothing, crafts, traditions, places and stories.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: msg.type === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#8a6348",
                  marginBottom: "5px",
                }}
              >
                {msg.sender}
              </div>
              <div
                style={{
                  maxWidth: "80%",
                  padding: "14px 17px",
                  borderRadius: "14px",
                  backgroundColor:
                    msg.type === "user" ? "#6b3e26" : "#f1e5d5",
                  color: msg.type === "user" ? "white" : "#29251f",
                  lineHeight: "1.6",
                  fontSize: "15px",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div style={{ textAlign: "center", color: "#806e60" }}>
            <p>Heritage AI is thinking...</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "20px",
          backgroundColor: "#fff9f0",
          borderTop: "1px solid #ddd",
          flexWrap: "wrap",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask something about the heritage..."
          style={{
            flex: "1",
            minWidth: "200px",
            minHeight: "55px",
            maxHeight: "130px",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #d7c4ad",
            background: "#fff",
            fontFamily: "Arial, sans-serif",
            fontSize: "15px",
            resize: "vertical",
            outline: "none",
          }}
        />

        <button
          onClick={handleSendMessage}
          disabled={loading || !selectedState}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            background: "#6b3e26",
            color: "white",
            cursor: loading || !selectedState ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "bold",
            opacity: loading || !selectedState ? 0.6 : 1,
            transition: "0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseOver={(e) => {
            if (!loading && selectedState) {
              e.target.style.background = "#8a4d2e";
            }
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#6b3e26";
          }}
        >
          Ask →
        </button>
      </div>

      {/* Status */}
      <div
        style={{
          textAlign: "center",
          padding: "12px 20px",
          color: "#806e60",
          fontSize: "13px",
          background: "#f9f5f0",
          borderTop: "1px solid #ddd",
        }}
      >
        {selectedState
          ? `Ready to explore ${selectedState}`
          : "Select a state to begin"}
      </div>
    </div>
  );
}

export default AIGuide;
