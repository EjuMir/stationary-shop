import { Server } from "http"
import app from "./app"
import mongoose from "mongoose"
import config from "./app/config"

const PORT = 5000

let server : Server

async function main() {
  try{
    await mongoose.connect(config.database_url as string);
  
  app.listen(config.port, () => {
    console.log(`Server running on port ${PORT}`)
  })
  }catch(err) {
    console.error(err)
  }
}

main();