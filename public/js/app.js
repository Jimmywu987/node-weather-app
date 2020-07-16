




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



weatherForm.addEventListener('submit', function(e){
    p1.textContent = 'Loading...'
    p2.textContent = ''
   
    e.preventDefault()
   const location =  search.value
    console.log(location)
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            p1.textContent = data.error;
            p2.textContent = '';
        } else {
            p1.textContent = data.location;
            p2.textContent = `${data.temperature} degree celsius`;
            
        }
        
    })
})
})