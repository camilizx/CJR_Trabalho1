let currentPage = 1
const USERS_PER_PAGE = 5

function deleteUser(user_id) {
    users = users.filter((user) => {
        return user.id !== user_id
    })
    render()
}

function getTotalPages() {
    return Math.ceil(users.length/USERS_PER_PAGE)
}

function createButtonElement(textContent) {
    const buttonElement = document.createElement('button')
    buttonElement.type = 'button'
    buttonElement.textContent = textContent
    return buttonElement
}

function getCurrentPageUsers() {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE
    const endIndex = startIndex + USERS_PER_PAGE
    return users.slice(startIndex, endIndex)
}

function insertTableRow(user) {
    const userRow = document.createElement('tr')
    const nome = createUserNome(user)
    const email = createUserEmail(user)
    const cadastrado = createUserCreatedAt(user)
    const botao = createUserActions(user)

    userRow.appendChild(nome)
    userRow.appendChild(email)
    userRow.appendChild(cadastrado)
    userRow.appendChild(botao)
    
    return userRow
}

function createUserNome(user) {
    const userName = document.createElement('td')
    userName.textContent = user.first_name + ' ' + user.last_name
    return userName
}

function createUserEmail(user) {
    const userEmail = document.createElement('td')
    userEmail.textContent = user.email
    return userEmail
}

function createUserCreatedAt(user) {
    const userCreatedAt = document.createElement('td')
    userCreatedAt.textContent = user.created_at
    return userCreatedAt
}

function createUserActions(user) {
    const userActionsButtons = document.createElement('td')
    userActionsButtons.classList.add('actions_buttons')
    
    const editar = document.createElement('button')
    editar.classList.add('edit_button')
    editar.type = 'button'
    editar.textContent = 'editar'

    const excluir = document.createElement('button')
    excluir.classList.add('delete_button')
    excluir.type = 'button'
    excluir.textContent = 'excluir'
    excluir.addEventListener('click', () => deleteUser(user.id))
    
    userActionsButtons.appendChild(editar)
    userActionsButtons.appendChild(excluir)
    return userActionsButtons
}

function insertTableRows(userData) {
    return userData.map(insertTableRow)
}

function renderUsers() {
    const userData = getCurrentPageUsers();
    const userTable = insertTableRows(userData)
    const userContainer = document.querySelector('.body')

    userContainer.replaceChildren()

    userTable.forEach(usersRow => {
        userContainer.appendChild(usersRow)
    })
}

function changePage(newPage) {
    const totalPages = getTotalPages()
    if (newPage >= 1 && newPage <= totalPages){
        currentPage = newPage
        render()
    }
}

function createPrevPageButton() {
    const prevPageButton = createButtonElement('<<')
    prevPageButton.addEventListener('click', () => {
        changePage(currentPage - 1)
    })
    return prevPageButton
}

function createNextPageButton() {
    const nextPageButton = createButtonElement('>>')
    nextPageButton.addEventListener('click', () => {
        changePage(currentPage + 1)
    })
    return nextPageButton
}

function createPaginationButton(page) {
    const paginationButton = createButtonElement(page)
    if (page == currentPage) paginationButton.classList.add('active')
    paginationButton.addEventListener('click', () => changePage(page))
    return paginationButton
}

function renderPagination(totalPages) {
    const pagination = document.querySelector('.pagination')
    pagination.replaceChildren()
    
    if(totalPages) {
        const prevPageButton = createPrevPageButton()
        pagination.appendChild(prevPageButton)

        for (let page = 1; page <= totalPages; page++){
            const paginationButton = createPaginationButton(page)
            pagination.appendChild(paginationButton)
        }

        const nextPageButton = createNextPageButton()
        pagination.appendChild(nextPageButton)
    }
}

function render(){
    const totalPages = getTotalPages()
    if (currentPage > totalPages) currentPage = totalPages
    renderUsers()
    renderPagination(totalPages)
}

render()