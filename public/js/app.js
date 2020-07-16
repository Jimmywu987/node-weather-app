




fetch('http://localhost:3000/weather?address=Hong%20Kong').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data)
        }
        
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')
const p3 = document.querySelector('.p3')
const p4 = document.querySelector('.p4')
const p5 = document.querySelector('.p5')



weatherForm.addEventListener('submit', function(e){
    p1.textContent = 'Loading...'
    p2.textContent = ''
    p3.textContent = ''
    p4.textContent = ''
    p5.textContent = ''
   
    e.preventDefault()
   const location =  search.value
    console.log(location)
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            p1.textContent = data.error;
            
        } else {
            p1.textContent = data.location;
            p2.textContent = `${data.temperature} Celsius degree`;
            p3.textContent = `Weather: ${data.description}`;
            p4.textContent = `Feel like temperature: ${data.FeelLikeTemperature}`;
            p5.textContent = `Humidity: ${data.humidity}`;
            
        }
        
    })
})
})