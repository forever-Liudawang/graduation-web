const path=require("path")
module.exports={
    // assetsDir: "static",
    configureWebpack: {
        resolve: {
          alias: {
            '@img':path.resolve(__dirname,'./src/assets') ,
          },
        },
      },
}