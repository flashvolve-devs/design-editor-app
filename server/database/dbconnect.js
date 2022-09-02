const { MongoClient } = require('mongodb');


const dbName = 'flashvolve-design-editor-db'

const url = `mongodb+srv://wictorhiago:ng8e01Rge7YcrOKq@atlascluster.ktp9c1a.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(url);

async function run() {

    await client.connect()  
    console.log('connected °°sucessfully°° to server')
    const db = client.db(dbName)
    const collection = db.collection('fonts')

    return 'done'
}

run()
module.exports = client