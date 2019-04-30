#!/usr/bin/env node
const express = require('express')
const mocker = require('../lib/index')

console.log('init proxy')
const app = express();

mocker.default(app)

app.listen(8080);
