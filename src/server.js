
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middlewares:
app.use(cors());            // permite que o app (celular) acesse este servidor
app.use(express.json());    // permite ler JSON no corpo das requisicoes

// Caminho do "banco de dados" (arquivo JSON)
const DB_PATH = path.join(__dirname, "db.json");

// --- Funcoes auxiliares para ler e gravar o arquivo JSON ---

// Le todos os registros do arquivo. Se nao existir, devolve lista vazia.
function lerRegistros() {
  if (!fs.existsSync(DB_PATH)) {
    return [];
  }
  const conteudo = fs.readFileSync(DB_PATH, "utf-8");
  return conteudo ? JSON.parse(conteudo) : [];
}

// Grava a lista de registros no arquivo JSON.
function salvarRegistros(registros) {
  fs.writeFileSync(DB_PATH, JSON.stringify(registros, null, 2));
}

app.post("/registros", (req, res) => {
  // Dados que o app envia no corpo da requisicao:
  const { latitudeUsuario, longitudeUsuario, paraciclo } = req.body;

  // Validacao basica: os campos sao obrigatorios.
  if (latitudeUsuario == null || longitudeUsuario == null || !paraciclo) {
    return res.status(400).json({
      erro: "Envie latitudeUsuario, longitudeUsuario e paraciclo.",
    });
  }

  const registros = lerRegistros();

  // Monta o novo registro com um id e a data/hora atual.
  const novoRegistro = {
    id: Date.now(),                       // id simples baseado no tempo
    latitudeUsuario,                      // onde o usuario estava
    longitudeUsuario,
    paraciclo,                            // dados do paraciclo (vindo do Dados Recife)
    criadoEm: new Date().toISOString(),   // quando foi registrado
  };

  registros.push(novoRegistro);
  salvarRegistros(registros);

  // 201 = criado com sucesso
  return res.status(201).json(novoRegistro);
});

// ============================================================
//  ROTA GET /registros
//  Devolve todos os registros salvos (mais novos primeiro).
// ============================================================
app.get("/registros", (req, res) => {
  const registros = lerRegistros();
  // reverse() para mostrar os mais recentes no topo
  return res.json(registros.slice().reverse());
});

// Rota raiz so para testar se o servidor esta no ar.
app.get("/", (req, res) => {
  res.send("Backend Dados Recife rodando! Use /registros");
});

// Inicia o servidor.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
