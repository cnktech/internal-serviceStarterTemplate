const aws = require('aws-sdk')
const fs = require('fs')
aws.config.update({ region: 'us-east-1' })

const SERVICE_NAME = process.env.SERVICE_NAME

const getFile = () => {
    const x = fs.readFileSync('./coverage/coverage-summary.json')
    const getStatement = x => x.total.statements.pct
    const getSize = x => x.total.statements.total
    const grade = getStatement(JSON.parse(x))
    const size = getSize(JSON.parse(x))
    const dynamoDb = new aws.DynamoDB.DocumentClient({
        region: 'us-east-1'
    })

    const params = {
        TableName: process.env.SERVICE_NAME + `-testcoverage`,
        Item: {
            PK: 'testcoverage',
            SK:
                'summary#' +
                SERVICE_NAME.split(' ')
                    .join('')
                    .toLowerCase(),
            service: SERVICE_NAME,
            grade: grade.toString(),
            size: size.toString(),
            timestamp: Date.now()
        }
    }

    dynamoDb
        .put(params)
        .promise()
        .then(x => {
            console.log('done')
        })
}

// my-custom-reporter.js
class MyCustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig
        this._options = options
    }

    onRunComplete(contexts, results) {
        console.log('Custom reporter output:')
        const x = getFile()
    }

    onTestResult(test, testResult) {}
}

module.exports = MyCustomReporter
