# Documentaion

## Swagger

```
# Generate API docs
npm run swagger

```

## Local development workflow
To use sqlite
DATABASE_URL=file:./dev.db

```
# Delete prisma/migration folder and run bellow command
npx prisma migrate dev --name init
npx prisma generate
```
