# Frontend (React + Apollo Client)

This frontend consumes the GraphQL API from the `backend` service and provides:

- User creation form with optional image upload.
- User list view for query results.
- Live `userCreated` notification using GraphQL subscriptions.

## Run

```bash
npm install
npm run dev
```

By default, the Apollo client is configured for:

- HTTP: `http://localhost:4000/graphql`
- WS: `ws://localhost:4000/graphql`

If your backend runs on a different host or port, update `src/apollo/client.js`.
