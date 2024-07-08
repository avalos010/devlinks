## devlinks: A Tailwind-Styled Link Organizer with Next.js, Supabase, and User Authentication

This project showcases a link organizer application built with Next.js, Supabase, and Tailwind CSS. It offers a performant, scalable, and visually appealing solution for managing your saved links, with user authentication for a secure and personalized experience. While links themselves are currently public, the application demonstrates potential for future features like private links.

**Features:**

- User registration and login with Supabase Auth
- Add and manage links stored in a Supabase database (links are currently public)
- View a dynamic interface with Tailwind CSS for styling
- Secure access to user-specific management features

**Technologies:**

- **Next.js:** Server-side rendering framework for a performant and SEO-friendly frontend
- **Supabase:** Open-source backend platform providing database, authentication, and storage functionalities
- **Tailwind CSS:** Utility-first CSS framework for rapid and responsive UI development

**Getting Started:**

1. Clone the repository: `git clone https://github.com/avalos010/devlinks.git`
2. Install dependencies: `npm install`
3. Create a free Supabase project at [https://supabase.com/partners/integrations](https://supabase.com/partners/integrations) and obtain your project's URL, public key (anon key), and any necessary connection details (these will be stored in environment variables).
4. Set up Tailwind CSS:
   - Follow Next.js's official documentation for Tailwind CSS integration: [https://tailwindcss.com/docs/guides/nextjs](https://tailwindcss.com/docs/guides/nextjs)
5. Set up environment variables (`.env.local`):
   - `NEXT_PUBLIC_ SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project's public key
6. Start the development server: `npm run dev` (opens the app in your browser)

**Testing:**

Unit and integration tests are recommended for a robust application. These are not currently included but can be implemented using tools like Jest and React Testing Library.

**Future Improvements:**

- Implement private link functionality using Supabase's security rules.
- Enhance UI design and user experience based on your preferences.
- Explore additional Supabase features like real-time subscriptions for a more dynamic user experience.
- Allow users to share links with others (consider access control for shared links).

**Contributions:**

Feel free to fork the repository and contribute! Let's build an even more feature-rich and secure link organizer together!
