'use strict';

const inquirer = require('inquirer');
const seedrandom = require('seedrandom');

const _syms = '!@#$%^&*-_'; // 0:10
const _sa = 'abcdefghijklmnopqrstuvwxyz'; // 1:26
const _ca = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 2:26
const _nums = '0123456789'; // 3:10

function _genPass(key) {
    var rng = seedrandom(key);
    var result = '';
    for (var i = 64; i > 0; i--) {
        var nextType = parseInt(rng() * 4);
        switch (nextType) {
            case 0:
                var nextI = parseInt(rng() * 10);
                result += _syms[nextI];
                break;
            case 1:
                var nextI = parseInt(rng() * 26);
                result += _sa[nextI];
                break;
            case 2:
                var nextI = parseInt(rng() * 26);
                result += _ca[nextI];
                break;
            case 3:
                var nextI = parseInt(rng() * 10);
                result += _nums[nextI];
                break;
            default:
                result += '';
                break;
        }
    }
    return result;
}

inquirer
    .prompt([
        {
            type: 'password',
            name: 'master',
            message: 'Master Key',
        },
        {
            type: 'password',
            name: 'purpose',
            message: 'Purpose',
        },
    ])
    .then(answers => {
        var key = answers.master + '::' + answers.purpose;
        console.log('Result:');
        console.log(_genPass(key));
    });