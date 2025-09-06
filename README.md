 https://ai-mock-interviewer-70198.web.app
 
##  AI Mock Interview

React AI Mock Interview is an innovative web application designed to simulate real-world mock interviews using AI. With seamless user authentication, an intuitive interface, and integration with advanced AI, this project serves as an invaluable tool for interview preparation.

## Features

- **AI-Powered Mock Interviews**  
  Leverage Google Gemini AI to simulate realistic interview scenarios, evaluate responses, and provide personalized feedback.
  
- **Seamless Authentication**  
  User authentication is powered by Clerk, ensuring secure and efficient access control.

- **Intuitive UI**  
  Built with Shadcn UI, the application boasts a modern and responsive interface for a seamless user experience.

- **Data Management**  
  All user progress, interview analytics, and configurations are stored securely in Google Firebase Firestore.

- **Dynamic Interview Customization**  
  Customize interviews based on job roles, difficulty levels, and domains.

## Tech Stack

- **Frontend:** React.js
- **Authentication:** Clerk
- **UI Framework:** Shadcn UI
- **Database:** Google Firebase Firestore
- **AI Integration:** Google Gemini AI

## Getting Started

### Prerequisites

- Node.js
- Firebase account
- Clerk account

### Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/optimus-prime-01/AI-Mock-Interviewer.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd react-ai-mock-interview
   ```

3. **Install dependencies:**

   - Install pnpm globally:
   
     ```bash
     npm i -g pnpm
     ```

   - Install the project dependencies:

     ```bash
     pnpm install
     ```

4. **Start the development server:**

   ```bash
   pnpm run dev
   ```

### Firebase Initialization

1. Initialize Firebase:

   ```bash
   firebase init
   ```

2. Deploy to Firebase:

   ```bash
   firebase deploy
   ```

### Project Build

To build the project for production:

```bash
pnpm run build
```

### Environment Variables

Ensure the following environment variables are set up in your \`.env.local\` file:

```
VITE_CLERK_PUBLISHABLE_KEY
VITE_FIREBASE_API_KEY=YOUR_API_KEY_REF
VITE_FIREBASE_AUTH_DOMAIN=YOUR_API_KEY_REF
VITE_FIREBASE_PROJECT_ID=YOUR_API_KEY_REF
VITE_FIREBASE_STORAGE_BUCKET=YOUR_API_KEY_REF
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_API_KEY_REF
VITE_FIREBASE_APP_ID=YOUR_API_KEY_REF
VITE_GEMINI_API_KEY
```

## Key Features

- **AI-Driven Insights**  
  Provides real-time feedback on your interview performance, highlighting strengths and areas for improvement.

- **User-Friendly Dashboard**  
  Track your progress, access past interviews, and download detailed performance reports.

- **Interactive Questionnaires**  
  Engage with diverse question types, including multiple-choice, scenario-based, and technical coding challenges.

## Contributing

We welcome contributions to improve the project. Please feel free to fork the repository, create a pull request, or report any issues you encounter.
