

const texto = document.querySelector('.add-tarefas')
const btn = document.querySelector('.btn')

const container = document.querySelector('.tarefas')


//receberTarefasLocalStorage()

// funcao para validar se o inpurt não esta vazio
const validaInput = () => texto.value.trim().length > 0;

const adicionandoTarefas = () =>{
const inputVazio = validaInput();

if(!inputVazio){
    return texto.classList.add("error")
}

const itemDiv = document.createElement('div')
itemDiv.classList.add('item-tarefa')

const itemContainer = document.createElement('p')
itemContainer.innerText = texto.value

itemContainer.addEventListener('click', ()=> handleClick(itemContainer))

const deleteItem = document.createElement('i')
deleteItem.classList.add('far')
deleteItem.classList.add('fa-trash-alt')

deleteItem.addEventListener('click', ()=> handleDelete(itemDiv, itemContainer))

itemDiv.appendChild(itemContainer)
itemDiv.appendChild(deleteItem)

container.appendChild(itemDiv)
texto.value = "";

atualizaLocalStorage()
}

const handleClick = (itemContainer) =>{
const tarefas = container.childNodes;

for(const tarefa of tarefas){
    if(tarefa.firstChild.isSameNode(itemContainer)){
        tarefa.firstChild.classList.toggle("completed")
    }
}

atualizaLocalStorage()

}

const handleDelete = (itemDiv,itemContainer) =>{
    const tarefas = container.childNodes;

    for(const tarefa of tarefas){
        if(tarefa.firstChild.isSameNode(itemContainer)){
            itemDiv.remove()
        }
    }
    atualizaLocalStorage()
}


const inputChange = () =>{
    const inputVazio = validaInput();
    if(inputVazio){
        return texto.classList.remove("error")
    }

    
}


const atualizaLocalStorage = () =>{ 
    const tarefas = container.childNodes;
     const localTarefas = [...tarefas].map(tarefa =>{
         const content = tarefa.firstChild;
         const isCompleted = content.classList.contains("completed")

         return { description: content.innerText , isCompleted: isCompleted}
     })
     
     localStorage.setItem('tarefas', JSON.stringify(localTarefas))
 }

const receberTarefasLocalStorage = () =>{
 const tarefasFromLocalStorage =  JSON.parse(localStorage.getItem('tarefas')) 


 for(const tarefa of tarefasFromLocalStorage){
    const itemDiv = document.createElement('div')
itemDiv.classList.add('item-tarefa')

const itemContainer = document.createElement('p')
itemContainer.innerText = tarefa.description;

if(tarefa.isCompleted){
    itemContainer.classList.add("completed")
}

itemContainer.addEventListener('click', ()=> handleClick(itemContainer))

const deleteItem = document.createElement('i')
deleteItem.classList.add('far')
deleteItem.classList.add('fa-trash-alt')

deleteItem.addEventListener('click', ()=> handleDelete(itemDiv, itemContainer))

itemDiv.appendChild(itemContainer)
itemDiv.appendChild(deleteItem)

container.appendChild(itemDiv)
 }
}
receberTarefasLocalStorage();

btn.addEventListener("click", ()=> adicionandoTarefas())
texto.addEventListener('change', ()=> inputChange())
