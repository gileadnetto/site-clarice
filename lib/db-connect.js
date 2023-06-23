import mongoose from 'mongoose'

global.mongoose={
    conn:null,
    promise: null
}

export async function dbConnect(){

    if(global.mongoose && global.mongoose.conn){
        console.log('Using existign mongoose connection')
        return global.mongoose.conn
    }else{

        console.log('Create new mongoose connection')

        const user = process.env.MONGODB_USER
        const password = process.env.MONGODB_PASSWORD
        const banco = process.env.MONGODBMONGODB_DB_PASSWORD

        const connString = `mongodb+srv://${user}:${password}@site-clarice.oqmokvn.mongodb.net/${banco}?retryWrites=true&w=majority`


        const promise = mongoose.connect(connString,{
            useNewUrlParser:true,
            useUnifieddTopology:true,
            autoIndex:true
        }).then(mongoose => mongoose);

        global.mongoose = {
            conn: await promise,
            promise
        }

        return await promise;

    }

}