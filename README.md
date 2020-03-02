### Installation

- install Firebase CLI: `yarn global add firebase-tools` or `npm install -g firebase-tools`
- login into the Firebase: `firebase login`
- front-end package installation: `cd /app && yarn`
- backend (lambda) package installation: `cd /functions && yarn`

### Run locally

- just frontend: `cd /app && yarn start`
- serve, together with lambdas: `firebase server`

### Deploy

`firebase deploy`