#!/usr/bin/env node
const express = require('express')
const portfinder = require('portfinder')
const color = require('http-mockjs-util/color').default
const mocker = require('../lib/index').default


const app = express();

portfinder.getPortPromise().then(port=>{
    mocker(app,{
        port:port
    })
    app.listen(port)
    console.log(color(`init proxy in port: ${port}`).green)
}).catch(err=>{
    console.log(`${color(err).red}`)
})

