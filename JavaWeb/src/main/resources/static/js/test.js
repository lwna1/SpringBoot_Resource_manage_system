// axios.get("/hello").then(result=>{
//     let test = []
//     test = result.data.data;
//     console.log(result.data.data)
//     console.log(test)
//     const text = document.querySelector('input[type="text"]')
//
//     text.value = test[0].name
//
// })
const readBtn = document.querySelector('input[type="button"]')
readBtn.addEventListener("click",function ()
{
    axios.get(`/hello`).then(result=>{
        let test = []
        test = result.data.data
        console.log(result.data.data)
        console.log(test)
        const text = document.querySelector('input[type="text"]')
        text.value = test[0].name
        sessionStorage.setItem("test","123")
    })
})

// axios.get("/set").then(result=>{
//     const text = document.querySelector('input[type="text"]')
//     const btn = document.querySelector('input[type="button"]')
//     btn.addEventListener("click",function ()
//     {
//         text.value = result.data.data.name
//     })
// })