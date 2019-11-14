const { setWorldConstructor } = require('cucumber');

const puppeteer = require('puppeteer');

const { createServer } = require('../../app');

const { MongoClient } = require('mongodb');

const User = require('../../models/user.js');

const MONGODB_URL = 'mongodb://mongo:27017/users-test';

class CustomWorld {
  constructor() {
    this.appPort = '5001';
    this.baseURL = `http://localhost:${this.appPort}`;
  }

  applicationIsUpAndRunning() {
    const env = {
      MONGODB_URL,
      SESSION_SECRET: 'secret!',
      PORT: this.appPort,
    };

    this.server = createServer({ env });
  }

  async openBrowserOnPath(path) {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
      headless: true,
    });
    this.page = await this.browser.newPage();
    await this.page.goto(`${this.baseURL}${path}`);
  }

  type(selector, text) {
    return this.page.type(selector, text);
  }

  click(selector) {
    return this.page.click(selector);
  }

  dropCollection(collectionName) {
    const self = this;
    return new Promise(resolve => {
      self.db.collection(collectionName)
        .drop(resolve);
    });
  }

  addUser(username, password) {
    return new User({ username, password }).save();
  }

  setUp () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URL, (error, client) => {
        if(error) return reject(error);
        this.mongo = client;
        this.db = client.db();
        return resolve();
      });
    })
  }

  tearDown() {
    [
      this.mongo,
      this.db,
      this.browser,
      this.server,
    ]
      .filter(item => item && item.close)
      .forEach(item => item.close());
  }
}

setWorldConstructor(CustomWorld);
