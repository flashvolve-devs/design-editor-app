class Fonts {
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

    static async getFonts() {
        const fonts = await dbconnect.db().collection('fonts')
        .findOne( { _id: ObjectId} )
        return fonts
    }
}