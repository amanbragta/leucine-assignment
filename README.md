# Todo Summarizer App
A full-stack app that allows users to create and manage todos, summarize them using LLM, and send summaries to a Slack channel.

# Features
- CRUD operations for todos (Supabase backend)
- JWT-protected endpoints
- Authentication using OAuth (Google)
- LLM-based summarization via Cohere
- Sends summaries to Slack
- Frontend built with React


# Tech Stack
- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase JWT
- **LLM:** Cohere (command-r model)
- **Notifications:** Slack webhook
- 

# Setup Instructions
## Cloning:
- Clone the repo and create a .env file in both client/ and backend/ based on .env.example.
- cd to backend and run the command npm i followed by node --env-file .env index.js
- cd to frontend and run the command npm i followed by npm run dev
## Slack:
- Go to Slack Webhooks
- Create a webhook for a channel.
- Copy the URL and place it in your .env as SLACK_WEBHOOK.
## LLM (Cohere):
- Create an account at cohere.com
- Get your API key.
- Place it in your .env as COHERE_API_KEY.
## .ENV.EXAMPLE:
- See .env.example for required variables.
