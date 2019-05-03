const express = require('express')
const mockjsmiddle = require('../../lib/index').default
const mock = require('../../../mocker/lib/index').default
const app = express()

app.use(mockjsmiddle())
// mock(app)
app.listen(3003)