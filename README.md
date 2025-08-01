# 🚀 React Todo App with Supabase

A modern, full-stack todo application built with React and Supabase. This project demonstrates real-time database operations, responsive design, and deployment to GitHub Pages.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://quntamcoder.github.io/super-base-integration-in-todo-app/)
![React](https://img.shields.io/badge/React-19+-blue)
![Supabase](https://img.shields.io/badge/Supabase-Powered-green)
![Vite](https://img.shields.io/badge/Vite-Build-purple)

**🔗 Live Demo**: [https://quntamcoder.github.io/super-base-integration-in-todo-app/](https://quntamcoder.github.io/super-base-integration-in-todo-app/)

## ✨ Features

- ✅ **Create** new todos
- ✅ **Read** todos from database
- ✅ **Update** todo completion status
- ✅ **Delete** todos
- ✅ Real-time database integration
- ✅ Responsive design
- ✅ Error handling and loading states
- ✅ Clean, modern UI

## 🛠️ Tech Stack

- **Frontend**: React 19+ with Vite
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS3
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free)

### 1. Clone the Repository

```bash
git clone https://github.com/QuntamCoder/super-base-integration-in-todo-app.git
cd super-base-integration-in-todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API** in your Supabase dashboard
3. Copy your **Project URL** and **anon public key**

### 4. Create Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Set Up Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create todos table
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO todos (task, is_completed) VALUES 
('Learn React', false),
('Set up Supabase', true),
('Build awesome app', false);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy for all operations
CREATE POLICY "Allow all operations" ON todos FOR ALL USING (true);
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app!

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoApp.jsx          # Main todo component
│   └── TodoApp.css          # Styling for todo app
├── lib/
│   └── supabase.js          # Supabase client configuration
├── App.jsx                  # Main app component
└── main.jsx                 # Entry point
```

## 🔧 Configuration

### Supabase Setup

1. **Project URL**: Found in Settings → API
2. **Anon Key**: Found in Settings → API (use the `anon public` key)
3. **Database**: PostgreSQL with Row Level Security enabled

### Environment Variables (Vite)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key | ✅ |

## 🚀 Deployment

### Deploy to GitHub Pages

This project is already configured for GitHub Pages deployment:

```bash
# Build and deploy
npm run deploy
```

The deployment process:
1. Builds the project with Vite
2. Creates a `gh-pages` branch
3. Deploys to GitHub Pages

### Deploy to Other Platforms

#### Vercel
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

#### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

## 🔥 API Reference

### Supabase Operations

```javascript
// Create todo
const { data, error } = await supabase
  .from('todos')
  .insert([{ task: 'New task', is_completed: false }])

// Read todos
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .order('created_at', { ascending: false })

// Update todo
const { data, error } = await supabase
  .from('todos')
  .update({ is_completed: true })
  .eq('id', todoId)

// Delete todo
const { error } = await supabase
  .from('todos')
  .delete()
  .eq('id', todoId)
```

## 🐛 Troubleshooting

### Common Issues

1. **"import.meta.env is undefined"**
   - Make sure you're using `VITE_` prefix in environment variables
   - Restart your development server after adding `.env` file

2. **"Multiple GoTrueClient instances"**
   - Ensure you're only creating one Supabase client instance
   - Check you're not importing supabase in multiple places

3. **Database connection errors**
   - Verify your Supabase URL and anon key are correct
   - Check if your database table exists
   - Ensure Row Level Security policies are set up

4. **GitHub Pages 404 errors**
   - Verify `base` path in `vite.config.js` matches your repository name
   - Check `homepage` in `package.json` is correct

### Getting Help

- Check the browser console for detailed error messages
- Visit [Supabase Documentation](https://supabase.com/docs)
- Visit [Vite Documentation](https://vitejs.dev/)
- Create an issue in this repository

## 🎨 Customization

### Styling

Modify `src/components/TodoApp.css` to customize the appearance:

```css
/* Example: Change primary color */
.add-button {
  background-color: #your-color;
}

/* Example: Custom todo item styling */
.todo-item {
  border-left: 4px solid #your-accent-color;
}
```

### Adding Features

- **Real-time updates**: Add Supabase subscriptions
- **User authentication**: Implement Supabase Auth
- **Categories**: Add todo categories and filtering
- **Due dates**: Add date picker and sorting
- **Dark mode**: Implement theme switching

## 📊 Performance

### Optimization Tips

- Use React.memo for expensive components
- Implement virtual scrolling for large todo lists
- Add pagination for better performance
- Use Supabase RLS for security
- Optimize Vite build configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend-as-a-service
- [React](https://reactjs.org) for the frontend framework
- [Vite](https://vitejs.dev) for the blazing fast build tool
- [GitHub Pages](https://pages.github.com) for free hosting

## 📞 Contact

**QuntamCoder** - [@QuntamCoder](https://github.com/QuntamCoder)

**Repository**: [https://github.com/QuntamCoder/super-base-integration-in-todo-app](https://github.com/QuntamCoder/super-base-integration-in-todo-app)

**Live Demo**: [https://quntamcoder.github.io/super-base-integration-in-todo-app/](https://quntamcoder.github.io/super-base-integration-in-todo-app/)

---

⭐ **Star this repo if you found it helpful!**

🔄 **Check out my other projects:** [QuntamCoder's GitHub](https://github.com/QuntamCoder)

## 📸 Screenshots

### Desktop View
![Desktop Todo App](https://via.placeholder.com/800x600/4f46e5/ffffff?text=Desktop+Todo+App)

### Mobile View
![Mobile Todo App](https://via.placeholder.com/400x600/4f46e5/ffffff?text=Mobile+Todo+App)

## 🚀 Recent Updates

- **August 2025**: Updated to React 19+ and Vite 7
- **August 2025**: Enhanced GitHub Pages deployment process
- **August 2025**: Improved error handling and user experience
- **August 2025**: Added comprehensive documentation

## 🎯 Roadmap

- [ ] Add user authentication
- [ ] Implement real-time collaboration
- [ ] Add todo categories and tags
- [ ] Mobile app with React Native
- [ ] PWA capabilities
- [ ] Dark/Light theme toggle
