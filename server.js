const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');

const app = express();
const port = 4000;

const db = new sqlite3.Database('database.db');

app.use(express.json());

// Endpoint para obter os dados do usuário
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    db.get('SELECT * FROM accounts WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro no servidor');
        } else {
            if (row) {
                res.json({
                    username: row.username,
                    // Adicione outros campos conforme necessário
                });
            } else {
                res.status(404).send('Usuário não encontrado');
            }
        }
    });
});

/// Configurações do Nodemailer (substitua com suas informações de e-mail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha'
    }
});

app.use(bodyParser.json());

// Rota para lidar com o pedido de redefinição de senha
app.post('/reset-password', (req, res) => {
    const userEmail = req.body.email;

    // Verificar se o e-mail está cadastrado (substitua com sua lógica de verificação de e-mail)
    const userExists = accounts.some(account => account.email === userEmail);

    if (!userExists) {
        return res.status(404).json({ message: 'E-mail não cadastrado' });
    }

    // Gerar uma senha aleatória de até 8 dígitos
    const newPassword = Math.random().toString(36).slice(-8);

    // Enviar e-mail com a nova senha
    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: userEmail,
        subject: 'Redefinição de Senha',
        text: `Sua nova senha é: ${newPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao enviar e-mail' });
        }
        console.log('E-mail enviado: ' + info.response);
        return res.status(200).json({ message: 'E-mail enviado com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
