# 🤖 SupportAI: Intelligent Customer Support Chatbot

SupportAI is an advanced AI-powered customer support solution that delivers automated, accurate, and personalized support experiences. Built to mimic human-like interactions, this chatbot helps businesses provide 24/7 customer service while reducing support costs and improving customer satisfaction.

**Live Demo:** [https://customersupport-ai-2.onrender.com](https://customersupport-ai-2.onrender.com)

## 📝 Project Description

SupportAI leverages natural language processing and machine learning techniques to understand user queries and provide relevant responses. The system is trained on custom data and can be configured to answer questions about products, services, policies, and more. It's designed to handle a wide range of customer support scenarios from simple FAQs to complex multi-step processes.

## ✨ Key Features

- **Natural Language Understanding**: Processes and understands user questions in conversational language
- **Knowledge-Based Responses**: Provides accurate answers based on training data and web content
- **Dynamic Web Scraping**: Automatically collects and processes information from specified websites
- **Context-Aware Conversations**: Maintains conversation context for more coherent interactions
- **Customizable Response Templates**: Adapts responses to match your brand's voice and style
- **Category-Based Navigation**: Organizes support topics into intuitive categories for better user experience
- **Human Agent Handoff**: Seamlessly transfers complex issues to human agents when needed
- **Multilingual Support**: Capable of understanding and responding in multiple languages
- **Scalable Architecture**: Handles multiple simultaneous conversations efficiently

## 🛠️ Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A superset of JavaScript that adds static types
- **Tailwind CSS**: A utility-first CSS framework for styling
- **Radix UI**: A set of unstyled, accessible components for building UI
- **Wouter**: A lightweight routing library for React
- **Recharts**: A composable charting library built on React components

### Backend
- **Express**: A web application framework for Node.js
- **OpenAI API**: For generating AI responses to user queries
- **Drizzle ORM**: An ORM for interacting with PostgreSQL databases
- **PostgreSQL**: A relational database management system
- **Vite**: A build tool that provides a fast development environment

### Natural Language Processing
- **Language Models**: Transformers, Auto-GPTQ
- **Embeddings**: Sentence Transformers
- **Vector Database**: ChromaDB
- **Framework**: LangChain
- **Text Processing**: Unstructured

## 🚀 Installation and Setup

### Prerequisites
- Node.js 16+
- PostgreSQL 13+
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/supportai.git
cd supportai
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env file with your API keys and database settings
```

4. Set up the database:
```bash
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

6. Access the chatbot interface at `http://localhost:3000`

## 📦 Dependencies

### Frontend Dependencies
```bash
react
react-dom
typescript
tailwindcss
@radix-ui/react-*
wouter
recharts
```

### Backend Dependencies
```bash
express
openai
drizzle-orm
pg
vite
langchain
chromadb
sentence-transformers
```

## 📊 How It Works

1. **Data Collection**: The system uses training data and web scraping to build its knowledge base
2. **Text Processing**: Raw text is processed, chunked, and converted to embeddings
3. **Query Understanding**: User queries are analyzed to understand intent and extract key information
4. **Response Generation**: The OpenAI API generates relevant, context-aware responses based on the available knowledge
5. **Conversation Management**: The system maintains context across multiple turns of conversation

## 📷 Demo Screenshots

### Initial Greeting
![Walmart Assistant Initial Greeting](https://i.imgur.com/demo1.jpg)

### Order Support Options
![Order Support Options](https://i.imgur.com/demo2.jpg)

### Store Locator
![Store Locator](https://i.imgur.com/demo3.jpg)

### General Support Options
![General Support](https://i.imgur.com/demo4.jpg)

### Return and Credit Information
![Return and Credit Information](https://i.imgur.com/demo5.jpg)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- OpenAI for their API and research in language models
- React team for the frontend library
- Tailwind CSS for the styling framework
- PostgreSQL for the reliable database system
- All open-source libraries that made this project possible
