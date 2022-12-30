const { json } = require("body-parser")

const update=document.querySelector('#update-button')

alert("hi")

update.addEventListener('click',_=>{
    fetch('/quotes',{
        mathod:'put',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(
            {
                name: 'Darth Vader',
                quote: 'I find your lack of faith disturbing.'
            }
        )
    })
}
)

const deleteButton=document.querySelector('#delete-option')

deleteButton.addEventListener('click',_ =>{
        fetch('/quotes',{
            method:'delete',
            headers:{'content-type':'application/json'},
            body:json.stringify({
                name:'Hosea Kipkoech'
            })
        },
        )
        .then(res=>{
            if(res.ok) return res.json
        })
        .then(data=>{
            window.location.reload()
        })
})