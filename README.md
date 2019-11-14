# How to build

```
docker-compose build
```


# How to start

```
docker-compose up
```

# How to run tests on dev

```
docker-compose exec app-dev yarn test
```

There are two test to login with valid credentials and with invalid credentials.


# How to add test user to dev

```
docker-compose exec app-dev node add-test-user.js
```


# How to add test user to prod

```
docker-compose exec app-prod node add-test-user.js
```

# How to login

Open browser on `localhost:3000/login` for prod or `localhost:5000/login` for dev.

Username: test
Password: test
