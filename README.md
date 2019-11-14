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


# How to add test user to dev

```
docker-compose exec app-dev node add-test-user.js
```


# How to add test user to prod

```
docker-compose exec app-prod node add-test-user.js
```
