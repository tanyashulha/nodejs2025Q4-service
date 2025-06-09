```
git clone https://github.com/tanyashulha/nodejs2025Q2-service.git
```

Switch to branch develop-part-2:

```
git checkout develop-part-2
```

## To install NPM modules, use the command:

```
npm install
```

## .env setting

In the absence of an .env file in the project's main directory, it is necessary to duplicate the .env.example file and rename it as .env.

## Vulnerabilities scanning

```
npm run docker:scan
```

## Running application

```
docker-compose up -d
```

## Testing

```
npm run test
```