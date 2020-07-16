const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const geocode=require('../src/utlis/geocode')
const forecast=require('../src/utlis/forecast')
// const utlis=path.join(__dirname,'../utlis')
//console.log(utlis)

//setup Handlebars engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))
// app.use(express.static(utlis))


// console.log(__dirname)
//  console.log(publicDirectoryPath)
// console.log(viewsPath)
//  console.log(path.join(__dirname, '../public'))

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Shivam'
    })
})


app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Shiv'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
 return res.send({error :'Location doesnot found!!!'})
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
        if(error){
      return res.send({error})
    }
    
    forecast(latitude,longitude,(error,forecastdata)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast :forecastdata,
                location:'Delhi',
                address:(req.query.address)
                
            })
   
     })
    
     })
    
})
app.get('/help/units',(req,res)=>{
    res.send('pagenotfound',{
        title:'Weather App',
        name:'Shiv Kumar',
        errorMessage:'Help article not found!!!'
    })

})
app.get('*',(req,res)=>{
    res.render('pagenotfound',{
        title:'Weather App',
        name:'Shivam Pandey',
        errorMessage:'Page not found!!!!'
    })
    
})


app.listen(3000,()=>{
    console.log('Server is running')
//})
})