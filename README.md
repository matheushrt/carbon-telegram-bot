## Introduction

Telegram Bots [Telegram](https://telegram.org) can handle messages automatically.
Users can interact with bots by sending messages in private or group chats that .

This package is intended to listen to `Update messages` received by your bot's server **/post** **webhook**. Then `carbon-telegram-bot` will listen to `pre-formatted` or `code` markdown and generate then reply the chat message with a beautiful [Carbon](http://carbon.now.sh) code snippet.

### Installation

```
$ npm install carbon-telegram-bot
```

or using `yarn`:

```
$ yarn add carbon-telegram-bot
```

### Examples

```js
const express = require('express');
const { carbonBot } = require('carbon-telegram-bot');

const app = express();
app.use(express.json());

// first specify a url to receive incoming updates via a webhook
// (https://core.telegram.org/bots/api#setwebhook)
// then listen to the webhook endpoint that you specified
app.post('/', async (req, res) => {
  const { body } = req;
  try {
    await carbonBot(YOUR_BOT_TOKEN, body);
  } catch (error) {
    console.error(error);
  }
  res.send('success');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

```js
import express from 'express';
import { carbonBot } from 'carbon-telegram-bot';

const app = express();
app.use(express.json());

// first specify a url to receive incoming updates via a webhook
// (https://core.telegram.org/bots/api#setwebhook)
// then listen to the webhook endpoint that you specified
app.post('/', async (req, res) => {
  const { body } = req;
  try {
    await carbonBot(YOUR_BOT_TOKEN, body);
  } catch (error) {
    console.error(error);
  }
  res.send('success');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```
