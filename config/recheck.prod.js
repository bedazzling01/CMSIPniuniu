const utils=require('./webpack.utils.js');
const AppConfig = require("../src/app.config.json");
const fs = require('fs');  
if(AppConfig.PRE_RENDER===true){
  if(utils.File.isFile(utils.root('dist/index.html'))){
    utils.File.modFile(utils.root('dist/index.html'),(data)=>{  
   let htmlContent=data.replace(/(<meta[^<>]*name=author[^<>]*>)/ig, `${utils.DEFAULT_METADATA.headerInfo}`);
    htmlContent=htmlContent.replace(/(<meta[^<>]*name=page[^<>]*>)/ig, `<meta name="page" content="/">`);       
    return htmlContent;
    }).then(()=>{
      console.log('完成');
    })
  }  
}else{
  console.log('单页渲染完成');
}
