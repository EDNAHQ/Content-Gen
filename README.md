
## Welcome to Content Gen

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. 

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/86db676e-abc9-4884-8341-49e8595fdd2e) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Content Gen Setup Instructions

### Prerequisites

Before setting up Content Gen, ensure you have:

1. Node.js 18+ and npm installed
2. A Supabase account (free tier works fine)
3. OpenAI API key for AI features

### Setup Instructions

#### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd content-gen

# Install dependencies
npm install
```

#### 2. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. In your Supabase dashboard:
   - Go to SQL Editor
   - Copy and run the migration files from `supabase/migrations/` in order
   - This will set up your database schema and security policies

3. Get your Supabase credentials:
   - Project URL
   - Anon public key
   - Service role key (keep this secret!)

#### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

#### 4. Security Configuration

The application is designed with a user-specific security model:
- Each user's data (prompts, history, settings) is isolated
- Authentication is required for all sensitive operations
- Data is linked to individual user IDs
- Row-level security (RLS) policies ensure data privacy

#### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:8081` (or the port shown in your terminal)

### Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting platform:
- Vercel
- Netlify
- GitHub Pages
- Or any static hosting service

### Database Structure

The application uses the following main tables:
- `prompts`: Store user-specific prompt templates
- `content_history`: Track content creation history
- `accounts`: Manage social media accounts
- `post_images`: Store generated images
- `social_media_posts`: Manage social media content
- `ai_models`: Configure AI model settings

Each table includes user-specific access controls through Supabase RLS policies.

### Troubleshooting

Common issues and solutions:
1. **Database Connection Issues**: Verify your Supabase credentials in `.env`
2. **Authentication Errors**: Ensure RLS policies are properly configured
3. **API Rate Limits**: Check your OpenAI API usage and limits

### Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Support

For support, please:
1. Check the GitHub issues
2. Review the documentation
3. Create a new issue if needed

Remember to never share your API keys or sensitive credentials!

# Content Gen

A modern content generation platform powered by AI. Generate emails, newsletters, and articles with customizable prompts.

## Quick Setup Guide

### 1. Prerequisites

```bash
# Required
Node.js 18+ and npm
Supabase account (free tier works)
OpenAI API key

# Optional but recommended
VS Code
Git
```

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/EDNAHQ/Content-Gen.git
cd Content-Gen

# Install dependencies
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. Once created, go to Project Settings > API to find your:
   - Project URL
   - anon/public API key

3. Run the database migrations:
   ```bash
   # Navigate to the migrations folder
   cd supabase/migrations
   
   # Run these SQL files in your Supabase SQL editor in this order:
   1. 20240204_user_policies.sql
   2. 20240204_default_prompts.sql
   ```

### 4. Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables:
   ```env
   # Required
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_OPENAI_API_KEY=your_openai_key
   VITE_OPENAI_MODEL=gpt-4

   # Development settings
   VITE_APP_URL=http://localhost:5173
   VITE_API_URL=http://localhost:5173/api
   NODE_ENV=development
   ```

### 5. Start the Development Server

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Common Setup Issues

### 1. OpenAI API Issues
- Ensure your API key is valid and has sufficient credits
- Check that you're using GPT-4 model access if specified
- If you get rate limit errors, implement retry logic or switch to GPT-3.5

### 2. Supabase Connection Issues
- Verify your project URL and anon key are correct
- Check if the SQL migrations ran successfully
- Ensure your IP isn't blocked in Supabase dashboard

### 3. Development Server Issues
- Clear your node_modules and package-lock.json and run npm install again
- Check if all required ports are available
- Verify your Node.js version (18+ required)

## Core Features

1. **Email Generation**
   - Professional email templates
   - Custom prompt creation
   - Multiple styles and tones

2. **Newsletter Creation**
   - Company updates
   - Educational content
   - Customizable templates

3. **Article Writing**
   - Technical articles
   - Thought leadership
   - Blog posts

## Project Structure

```plaintext
content-gen/
├── src/                  # Source code
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   └── config/          # Configuration files
├── supabase/
│   └── migrations/      # Database setup
└── .env.example         # Environment template
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## Support

- Create an issue for bugs or features
- Check existing issues before creating new ones
- Provide clear steps to reproduce bugs

## License

Apache License 2.0 - See LICENSE file for details
