import { Repo } from '../../../interfaces/infra'

const isTest = process.env.NODE_ENV === 'test'
const table = isTest
    ? 'origamai-stresstracker-int'
    : `origamai-stresstracker-${process.env.STAGE}`

export default (io): Repo => ({})
