# 📚 Quiz App

An engaging and dynamic quiz platform built with **React.js** and **Tailwind CSS**, featuring timed quizzes, user history tracking, and an intuitive interface.

## 🚀 Features

### 🏆 Interactive Quiz Experience
- Multiple-choice and integer-based questions
- Timed quiz (30 seconds per question, 5 minutes total)
- Live progress tracking

### ⏳ Smart Timer
- Countdown for each question
- Auto-submission when time runs out
- Visual progress bar

### 📊 Score & Feedback
- Real-time scoring system
- Instant feedback on answers
- Percentage-based performance summary

### 📜 Quiz History & Tracking
- Stores past attempts using IndexedDB
- View past scores, answers, and time taken

### 🎨 User-Friendly UI
- Clean and modern design with **Tailwind CSS**
- Responsive across all devices

## 📦 Tech Stack

| Technology      | Usage |
|---------------|------------------|
| **React.js**  | Frontend framework |
| **Tailwind CSS** | Styling & responsiveness |
| **IndexedDB** | Local storage for quiz history |
| **Lucide-React** | Icon library |

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```sh
   git clone [https://github.com/avanishpal143/QUIZ-APP].git
   cd quiz-app

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Run the application**
   ```sh
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🖥️ File Structure
```
quiz-app/
│-- src/
│   ├── components/
│   │   ├── History.jsx
│   │   ├── Quiz.jsx
│   │   ├── QuizForm.jsx
│   ├── data/
│   │   ├── questions.js
│   ├── utils
│   │   ├── storgae.js (IndexedDB functions)
│   ├── types/
│   │   ├── quizTypes.js
│   ├── App.jsx
│   ├── index.css
│-- public/
│-- README.md
│-- package.json
```

## 🎮 Usage
- Enter your **name** to start.
- Answer the **questions** within the time limit.
- View your **score** and feedback.
- Check **previous attempts** in quiz history.

## 🤝 Contributing
Feel free to **fork** this repository, create a new branch, and submit a pull request.

1. **Fork the project**
2. **Create a new branch** (`feature/new-feature`)
3. **Commit your changes**
4. **Push to the branch**
5. **Open a Pull Request**

## 📜 License
This project is licensed under the **MIT License**.

## 🔗 Links
- 🌍 [Live Demo]([https://quiz-app-check-your-knowledge.vercel.app])
- 💻 [GitHub Repository]([https://github.com/avanishpal143/QUIZ-APP])

---

Happy Coding! 🚀
