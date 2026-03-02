# Doubtdrop

Doubtdrop is a React-based web application designed to help users manage and resolve doubts or questions. It allows users to post questions, attach resources (files or links), and track them in a clean, modern interface. The application uses local storage for data persistence, making it a lightweight, serverless solution for personal or small-group use.

## Features

- **Question Management**: Create, view, and organize questions effectively.
- **Resource Linking**: Attach helpful resources to your questions, including:
  - **File Uploads**: Store file metadata and content (subject to browser storage limits).
  - **External Links**: Save URLs to relevant websites or documentation.
- **Data Persistence**: Automatically saves all data to the browser's `localStorage` (key: `doubtdrop-data-v1`), ensuring your data remains available across page reloads.
- **Responsive UI**: Built with a modern, responsive design using CSS variables for consistent theming.
- **Sorting**: Automatically sorts questions to show the latest entries first.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS with CSS Variables for theming (Inter font family)
- **State Management**: React `useState`, `useEffect`
- **Linting**: ESLint

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ADAIKKAPPAN2310/doubtdrop.git
   cd doubtdrop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

The project follows a standard Vite + React structure:

```
doubtdrop/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── AddQuestionForm.jsx
│   │   ├── QuestionDetail.jsx
│   │   ├── QuestionList.jsx
│   │   └── ResourceSection.jsx
│   ├── App.jsx          # Main application component & logic
│   ├── App.css          # Application-specific styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .gitignore
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md
```

## Usage

### Adding a Question
Use the `AddQuestionForm` component to submit a new question. The form handles input validation and updates the local state.

### Managing Resources
You can attach resources to questions. The app supports two types of resources:
- **Files**: Uploaded files are converted and stored locally.
- **Links**: URLs are validated before being saved.

### Data Storage
The application uses a `STORAGE_KEY` constant (`doubtdrop-data-v1`) to save the state to `localStorage`.
- **Warning**: Since `localStorage` has a size limit (typically around 5MB), avoiding very large file uploads is recommended to prevent storage errors.
- The app includes error handling to notify the user if the storage limit is reached.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.