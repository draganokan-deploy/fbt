Frontend lives in the `/app`, while backend (lambda functions) live in the `/functions`. Project uses `yarn`, but `npm` can be used as well. Frontend's boilerplate was made via Create-React-App.

### Installation

- install Firebase CLI: `yarn global add firebase-tools` or `npm install -g firebase-tools`
- login into the Firebase: `firebase login`
- front-end package installation: `cd /app && yarn`
- backend (lambda) package installation: `cd /functions && yarn`

### Run locally

- just frontend: `cd /app && yarn start`
- serve, together with lambdas: `firebase serve`

### Deploy

build front:
`cd /app && yarn build`

deploy all:
`firebase deploy`

----

- live website: https://my-first-firebase-projec-40363.firebaseapp.com/
- functions at: `https://us-central1-<project-id>.cloudfunctions.net/<id>` (https://us-central1-my-first-firebase-projec-40363.cloudfunctions.net/helloWorld e.g.)