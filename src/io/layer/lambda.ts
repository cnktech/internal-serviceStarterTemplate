export default AWS => (name, payload) => {
    const Lambda = new AWS.Lambda()
    const p = {
        FunctionName: name,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(payload),
        LogType: 'None'
    }

    if (process.env.NODE_ENV === 'test') {
        return new Promise((resolve, reject) => {
            resolve(true)
        })
    }

    return new Promise((resolve, reject) => {
        Lambda.invoke(p, (err, data) => {
            if (err) return reject(err)
            const payload = JSON.parse(data.Payload)
            if (payload.errorMessage) return reject(payload)

            if (!payload.body) {
                resolve(payload)
            }

            if (payload.body) {
                const result = JSON.parse(payload.body)

                if (result.Items) {
                    resolve(result.Items)
                }

                return resolve(result)
            }
        })
    })
}
