const request=require('request')
const mapaccesskey='7e26c20471de112f1d9851e79f1fd8c5'
const forecast=(latitute,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key='+mapaccesskey+'&query='+latitute+','+longitude+'&units=f'
    request({url,json:true},(error,{body}={})=>{
        if(error){
      callback('Unable to connect to weather services!!!',undefined)
        }
        else if(body.error){
            callback('Coordinates Error',undefined)
        }
        else{
            callback(undefined,'Sky is '+body.current.weather_descriptions[0]+'.' +'It is currently ' +body.current.temperature +' degree  but feels like '+body.current.feelslike +' degrees out')
        }
    })
}

module.exports=forecast