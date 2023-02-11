// const cliente = {
//     nome: 'Macaco do cu azul', 
//     idade: 35,
//     genero: 'Masculino'
// }

// cliente.estado = 'Pernanbuco'


// alert('Olá, meu nome é ' + cliente.nome + ' e moro no estado do ' + cliente.estado)


let itemList = []
let itemToEdit

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const buyedItems = document.getElementById("itens-comprados")
const recoveredList = localStorage.getItem('itemList')

function updateLocalStorage() {
    localStorage.setItem('itemList', JSON.stringify(itemList))
}

if(recoveredList) {
    itemList = JSON.parse(recoveredList)
    showItem()
} else {
    itemList = []
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    saveItem()
    showItem()
    itensInput.focus()
})

function saveItem() {
    const itemsToBuy = itensInput.value
    const checarDuplicado = itemList.some((element) => element.valor.toUpperCase() === itemsToBuy.toUpperCase())

    if(checarDuplicado) {
        alert("Item já existe")
    } else {
    itemList.push({
        valor: itemsToBuy,
        checar: false
    })
}

    itensInput.value = ''
}

function showItem(){
    ulItens.innerHTML = ''
    buyedItems.innerHTML = ''
    
    itemList.forEach((element, index) => {
        if(element.checar) {
        buyedItems.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${element.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
        `
        } else {
        ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${element.valor}" ${index !== Number(itemToEdit) ? 'disabled' : ''}></input>
                </div>

                <div>
                    ${ index === Number(itemToEdit) ? '<button onclick="editSave()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
        `
    }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach(i => {
        i.addEventListener('click', (event) => {
            elementValue = event.target.parentElement.parentElement.getAttribute('data-value')
            itemList[elementValue].checar = event.target.checked
            showItem()
        })
    })

    const removeObjects = document.querySelectorAll(".deletar")

    removeObjects.forEach(i => {
        i.addEventListener('click', (event) => {
            elementValue = event.target.parentElement.parentElement.getAttribute('data-value')
            itemList.splice(elementValue,1)
            showItem()
        })
    })    

    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => {
        i.addEventListener('click', (event) => {
            itemToEdit = event.target.parentElement.parentElement.getAttribute('data-value')
            showItem()
        })
    })  

    updateLocalStorage()

}

function editSave() {
    const editedItem = document.querySelector(`[data-value="${itemToEdit}"] input[type="text"]`)
    // console.log(editedItem.value)
    itemList[itemToEdit].valor = editedItem.value
    console.log(itemList)
    itemToEdit = -1
    showItem()
}

// const saveButton =  document.querySelectorAll(".salvar")

// saveButton.forEach(i => {
//     i.addEventListener('click', (event) => {
//         editSave(event)
//     })
// })