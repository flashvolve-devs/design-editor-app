const { MongoClient, ObjectId } = require('mongodb')
const dbconnect = require('../db/dbconnect')

class Font {
    constructor(name, url) {
        this.name = name
        this.url = url
    }

    save() {
        const fonts = dbconnect.db().collection('fonts').insertOne({
            name: this.name,
            url: this.url
        })
        return fonts
    }

    static async getFonts(id) {// find only one font
        const fonts = await dbconnect.db().collection('fonts')
        .findOne( { _id: ObjectId} )
        return fonts
    }
}