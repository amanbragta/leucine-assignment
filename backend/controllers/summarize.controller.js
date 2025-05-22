import axios from "axios";
export const postSummary = async (req, res) => {
  const listItems = req.body.items;
  const prompt = `Summarize the following list of items in a clear and concise paragraph:\n\n- ${listItems.join(
    "\n- "
  )}`;
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r",
        message: prompt,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.text || response.data.reply;
    const data = await axios.post(process.env.SLACK_WEBHOOK, { text: summary });
    res.status(200).json({ summary });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to summarize list" });
  }
};
