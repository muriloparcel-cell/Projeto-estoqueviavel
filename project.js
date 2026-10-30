const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 399;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
	console.log(`Servidor do Projeto final rodando com o PORT ${PORT}`);
});
