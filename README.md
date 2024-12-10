# Lost and Found +
A maker space tool management tool for the Ford Robotics Building 

## Table of Contents

- [Team Behind This Project](#team-behind-this-project)
- [Domain Information](#domain-information)
- [Development Setup](#development-setup)
- [Contribution Guidelines](#contribution-guidelines)

## Team Behind This Project

Lead Developers:
1. Anuhea Tao
2. Luke Weaver

## Domain Information

1. The website is currently deployed at https://lostfound-makerspace.web.app
2. It will automatically deploy when changes are merged into production

## Development Setup

### Environment Setup

1. Ensure Node.js (updated to the current version) is installed by checking `node -v`.
2. Check if npm (updated to the current version) is installed by checking `npm -v`.
3. Install firebase-tools globally: `npm install --g firebase-tools`
4. Clone the repository onto the local machine: `git clone [url]`.
5. Navigate into the directory (`cd [directory_name]`) and install all dependencies via `npm install`.

### Running in Development Environment

To connect to the development emulators

1. Start the firebase emulators with `npm run emulator`
2. In a new console tab, start up a local dev server with `npm run dev`
3. Navigate to http://localhost:3000 to access the app, and http://locahost:5000 for the backend Firebase UI
   
To connect to the production database (not recommended)

1. Start up a local server with `npm run start`
2. Navigate to https://localhost:3000

## Contribution Guidelines

### Branches

`production`
- code automatically deployed to Firebase hosting servers
- never push directly to this branch or merge any branch other than staging
  
`development`
- merge all pull requests with staging
