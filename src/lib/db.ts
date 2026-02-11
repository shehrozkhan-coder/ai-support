import { connect } from "mongoose"

const mongo_Url = process.env.MONGODB_URI

if(!mongo_Url){
    console.log("MongoDB URL not found, see db.ts file")
}

let cache = global.mongoose

if(!cache){
  cache = global.mongoose={conn:null,promise:null}
}

const connectDb = async ()=> {
    if(cache.conn){
        return cache.conn
    }
    
    if(!cache.promise){
        // ✅ CONNECTION OPTIONS ADD KIYE
        cache.promise = connect(mongo_Url!, {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        }).then((c)=>c.connection)
    }
    
    try {
        cache.conn = await cache.promise
        console.log('✅ MongoDB Connected')
    } catch (error) {
        console.error('❌ MongoDB Error:', error)
        cache.promise = null  // ✅ Reset promise on error
        throw error
    }
    
    return cache.conn
}

export default connectDb