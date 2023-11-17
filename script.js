
let currentUser = null;
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveData() {
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadData() {
    accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    transactions = JSON.parse(localStorage.getItem('transactions')) || [];
}

loadData();

function showSignupForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none'; // Ocultar a mensagem de sucesso
}


function showLoginForm() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('signup-container').style.display = 'none';
}
function createAccount() {
    console.log('Função createAccount() chamada.');

    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newEmail.trim() === '' || newPassword.trim() === '') {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    if (accounts.some(account => account.email === newEmail)) {
        alert('Este endereço de e-mail já está em uso. Escolha outro.');
        return;
    }

    const newAccount = {
        email: newEmail,
        password: newPassword,
        transactions: []
    };

    accounts.push(newAccount);
    currentUser = newAccount;
    saveData();

    // Ocultar o formulário de cadastro
    document.getElementById('signup-container').style.display = 'none';

    // Criar elemento para a mensagem de sucesso
    const successMessageElement = document.createElement('div');
    successMessageElement.id = 'successMessage';
    successMessageElement.className = 'alert alert-success mt-3';
    successMessageElement.textContent = 'Conta criada com sucesso!';

    // Inserir a mensagem de sucesso após o formulário de cadastro
    document.getElementById('app-container').appendChild(successMessageElement);

    // Exibir o formulário de login
    document.getElementById('login-container').style.display = 'block';


    showTransactionPage();
}


function login() {
    const email = document.getElementById('email').value; // Alterado para novo campo de email
    const password = document.getElementById('password').value;

    const user = accounts.find(account => account.email === email && account.password === password); // Alterado para verificar o email

    if (user) {
        currentUser = user;
        saveData();

        // Redirecionar para a página de transações
        window.location.href = 'index.html';
    } else {
        alert('E-mail ou senha incorretos. Tente novamente.');
    }
}
function showTransactionPage() {
    updateBalance();
    displayTransactions();

    // Fetch para carregar o conteúdo de outro arquivo HTML
    fetch('./index.html')
        .then(response => response.text())
        .then(html => {
            // Inserir o conteúdo no corpo do documento
            document.body.innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar a página:', error));
}

    function addTransaction() {
        const transactionDescription = document.getElementById('transaction').value;
        const transactionAmount = parseFloat(document.getElementById('amount').value);
        const transactionCategory = document.getElementById('category').value;
    
        if (transactionDescription.trim() === '' || isNaN(transactionAmount) || transactionCategory.trim() === '') {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
    
        // Obtém a data atual
        const currentDate = new Date();
    
        // Formata a data como "YYYY-MM-DD"
        const formattedDate = currentDate.toISOString().split('T')[0];
    
        const transaction = {
            id: new Date().getTime(),
            description: transactionDescription,
            amount: transactionAmount,
            category: transactionCategory,
            date: currentDate  // Usa a data diretamente
        };
    
        transactions.push(transaction);
        currentUser.transactions.push(transaction);
        updateBalance();
        displayTransaction(transaction);
    
        // Limpa os campos de entrada
        document.getElementById('transaction').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
    }

    function addTransactionFromForm() {
        const transactionDescription = document.getElementById('transaction').value;
        const transactionAmount = parseFloat(document.getElementById('amount').value);
        const transactionCategory = document.getElementById('category').value;
    
        if (transactionDescription.trim() === '' || isNaN(transactionAmount) || transactionCategory.trim() === '') {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
    
        // Obtém a data atual
        const currentDate = new Date();
    
        // Formata a data como "YYYY-MM-DD"
        const formattedDate = currentDate.toISOString().split('T')[0];
    
        const transaction = {
            id: new Date().getTime(),
            description: transactionDescription,
            amount: transactionAmount,
            category: transactionCategory,
            date: currentDate  // Usa a data diretamente
        };
    
        transactions.push(transaction);
        currentUser.transactions.push(transaction);
        updateBalance();
        displayTransaction(transaction);
    
        // Limpa os campos de entrada
        document.getElementById('transaction').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
    }
    
    
    function displayTransaction(transaction) {
        const transactionList = document.getElementById('transactionList');
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            ${transaction.description}: R$${transaction.amount.toFixed(2)} 
            <span class="badge badge-warning" style="cursor: pointer;" onclick="editTransaction(${transaction.id})">Editar</span>
            <span class="badge badge-danger" style="cursor: pointer;" onclick="removeTransaction(${transaction.id})">Remover</span>
            <br>
            <small>Categoria: ${transaction.category}</small>
            <br>
            <small>Data: ${transaction.date}</small>
        `;
        transactionList.appendChild(li);
    }
    
    // Adicione essas funções no seu script.js
    function showLoginForm() {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('forgot-password-container').style.display = 'none';
    }

    function showSignupForm() {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'block';
        document.getElementById('forgot-password-container').style.display = 'none';
    }

    function showForgotPasswordForm() {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('forgot-password-container').style.display = 'block';
    }

      function resetPassword() {
            // Obtenha o valor do campo de entrada de e-mail
            const userEmail = document.getElementById('email').value;

            // Simule uma nova senha aleatória de 8 dígitos
            const newPassword = generateRandomPassword();

            // Simule o envio de um e-mail (substitua isso pelo código do lado do servidor)
            sendEmail(userEmail, newPassword);
        }

        function sendEmail(email, password) {
            // Simulação: exibir a senha gerada no console
            console.log(`Senha gerada para ${email}: ${password}`);

            // Atualize a interface do usuário com a mensagem de sucesso (substitua isso pelo código real)
            const responseElement = document.getElementById('response');
            responseElement.textContent = `E-mail enviado para ${email}. Verifique sua caixa de entrada.`;
        }

        function generateRandomPassword() {
            // Gere uma senha aleatória de 8 dígitos
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let password = '';
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                password += characters.charAt(randomIndex);
            }
            return password;
        }

    function showTransactionPage() {
        updateBalance();
        displayTransactions();
    
        // Fetch para carregar o conteúdo de outro arquivo HTML
        fetch('./index.html')
            .then(response => response.text())
            .then(html => {
                // Inserir o conteúdo no app-container
                document.getElementById('app-container').innerHTML = html;
    
                // Redirecionar para o index.html
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Erro ao carregar a página:', error));
    }
    
    function showTransactionList() {
        updateBalance();
        displayTransactions();
    }
    
    




function logout() {
    currentUser = null;
    saveData();
    window.location.href = 'cadastro.html';
}


function updateBalance() {
    const balanceElement = document.getElementById('balance');
    const totalBalance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    balanceElement.innerText = `Saldo: R$${totalBalance.toFixed(2)}`;
}



function addTransaction() {
    const transactionDescription = document.getElementById('transaction').value;
    const transactionAmount = parseFloat(document.getElementById('amount').value);
    const transactionCategory = document.getElementById('category').value;

    if (transactionDescription.trim() === '' || isNaN(transactionAmount) || transactionCategory.trim() === '') {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Obtém a data atual
    const currentDate = new Date();

    // Formata a data como "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split('T')[0];

    const transaction = {
        id: new Date().getTime(),
        description: transactionDescription,
        amount: transactionAmount,
        category: transactionCategory,
        date: formattedDate
    };

    transactions.push(transaction);
    currentUser.transactions.push(transaction);
    updateBalance();
    displayTransaction(transaction);

    // Salva os dados no armazenamento local
    saveData();

    // Limpa os campos de entrada
    document.getElementById('transaction').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    currentUser.transactions = currentUser.transactions.filter(transaction => transaction.id !== id);
    updateBalance();
    displayTransactions();
}

function editTransaction(id) {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);

    const newDescription = prompt('Editar Descrição:', transactionToEdit.description);
    const newAmount = parseFloat(prompt('Editar Valor:', transactionToEdit.amount));
    const newCategory = prompt('Editar Categoria:', transactionToEdit.category);

    if (newDescription !== null && !isNaN(newAmount) && newCategory !== null) {
        transactionToEdit.description = newDescription;
        transactionToEdit.amount = newAmount;
        transactionToEdit.category = newCategory;

        updateBalance();
        displayTransactions();
    }
}

function displayTransaction(transaction) {
    const transactionList = document.getElementById('transactionList');
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
        ${transaction.description}: R$${transaction.amount.toFixed(2)} 
        <span class="badge badge-warning" style="cursor: pointer;" onclick="editTransaction(${transaction.id})">Editar</span>
        <span class="badge badge-danger" style="cursor: pointer;" onclick="removeTransaction(${transaction.id})">Remover</span>
        <br>
        <small>Categoria: ${transaction.category}</small>
    `;
    transactionList.appendChild(li);
}

function displayTransactions() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        displayTransaction(transaction);
    });
}

// Exemplo de contas e transações iniciais
accounts.push({ username: 'user1', password: 'password1', transactions: [] });
accounts.push({ username: 'user2', password: 'password2', transactions: [] });
currentUser = accounts[0];
