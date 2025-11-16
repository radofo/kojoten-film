### Deployment

- environment variable must be put into the .env file. Gatsby automatically picks them up
- Pushes to feat/netlfiy-redeploy trigger a new build on Netlify for the Integration Environment
- Pushes/merges to main trigger a new build on Netlify for Production
- The equivalents for the old Firebase Deployment are integration and master
