## Quick Start

### Running in Docker

```
docker-compose up --build
```

Navigate to:

http://localhost:3000/

### Developing locally

```bash
# Go inside the server directory
cd adcellerantCodeChallenge/server

# Install dependencies
npm i

# Start development server
npm run dev

# Go inside the client directory
cd adcellerantCodeChallenge/client

# Install dependencies
npm i

# Start development server
npm start
```

Navigate to:

http://localhost:3000/

### Data

The Server reads files from the src/data folders and saves the entries to db
Local development: Remove the data files after the first startup or you will get dublicates in you db

## Documentation

### Stack details:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)
- [ApolloGraphQL](https://www.apollographql.com/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [MongooseJS](https://mongoosejs.com/docs/)
