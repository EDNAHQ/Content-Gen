# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/86db676e-abc9-4884-8341-49e8595fdd2e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/86db676e-abc9-4884-8341-49e8595fdd2e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

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

A powerful content generation platform built with React, Supabase, and OpenAI. Generate emails, newsletters, and articles with customizable prompts.

## Features

- 📧 **Email Generation**: Create professional emails with customizable templates
- 📰 **Newsletter Creation**: Generate engaging newsletters with various styles
- 📝 **Article Writing**: Produce high-quality articles with different writing styles
- 🎯 **Custom Prompts**: Create and manage your own content generation prompts
- 🔄 **Default Templates**: Built-in templates for quick starts
- 🔒 **User Authentication**: Secure user-specific content and settings
- 💾 **Content History**: Track and manage your generated content

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase
- **AI**: OpenAI GPT-4
- **Auth**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EDNAHQ/Content-Gen.git
   cd Content-Gen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. Set up your Supabase database:
   - Create a new Supabase project
   - Run the migration files in the `supabase/migrations` directory
   - Enable Row Level Security (RLS) policies

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Authentication**: Sign up or log in to access the platform
2. **Prompt Management**: Create custom prompts or use default templates
3. **Content Generation**:
   - Choose the type of content (email, newsletter, article)
   - Select a prompt template
   - Enter your content notes
   - Generate and edit the content

## Project Structure

```
content-gen/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── config/        # Configuration files
│   └── integrations/  # External service integrations
├── supabase/
│   └── migrations/    # Database migrations
└── public/           # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.
