const express = require('express');
const sqlite3 = require('sqlite3').verbose();

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

// ... Seus outros endpoints ...

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
