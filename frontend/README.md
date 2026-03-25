# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Supabase (login)

Auth uses Supabase. New users are not registered from the site; add accounts in the Supabase dashboard (**Authentication → Users**) if you need more logins. Copy `.env.example` to **`.env.local`** in this folder and set:

- `REACT_APP_SUPABASE_URL` — Project URL (`https://<project-ref>.supabase.co`)
- `REACT_APP_SUPABASE_ANON_KEY` — **anon** / public key (Dashboard → Project Settings → API)

Never put the **service_role** key in the frontend.

**Portfolio projects:** In the Supabase **SQL Editor** for the **same project** as your `REACT_APP_SUPABASE_URL`, open `supabase/migrations/20260325120000_portfolio_projects.sql` from this repo, paste the full file, and **Run**. That creates `public.portfolio_projects` and sends `NOTIFY pgrst, 'reload schema'` so the API sees the table. If you still see “schema cache”, run `NOTIFY pgrst, 'reload schema';` once manually. Then set `REACT_APP_GITHUB_USER` if needed, sign in, and use **Dashboard → Sync from GitHub** to import **all** your GitHub repos (optional root `project.json` enriches fields). New imports are hidden until you enable **On site**; use **Featured** for the home row. Optional sample rows: `supabase/optional_seed_portfolio_projects.sql` (run manually only if you want them).

**Employment (About / Experience):** Run `supabase/migrations/20260325200000_employment_positions.sql`, then optionally `supabase/optional_seed_employment_positions.sql`. The About page **Experience** section reads `employment_positions`; the **Dashboard** shows a table with detail/JSON and **On site** / **sort** toggles.

**Production:** Set the same two variables in Vercel (or your host). For **GitHub Pages** builds, add repository secrets `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` (Settings → Secrets and variables → Actions). Do **not** commit `frontend/.env.production`; copy `frontend/.env.production.example` to `.env.production` locally if you run `npm run build` on your machine.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`prestart` runs first and writes **`src/siteLastUpdated.json`** (gitignored) from `git log -1` at the repo root; the footer shows **Last updated (repo)** from that timestamp.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
