import io from '../../../../io'
import repository from '../'

/* 
A DB Test pattern:
1. first test all get requests, and insure they respond with intended empty response
2. create
3. get created items
4. update
5. delete everything, which acts as a db teardown as well so the next test run can work
   on a clean db

6. test everything while forcing errors (havent figured out how to do that with real dynamo db setup)
*/

describe('repo', () => {
    test('test starter', async () => {
        const repo = repository(io())
        expect(1).toBe(1)
    })
})
