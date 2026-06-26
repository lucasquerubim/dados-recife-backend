# Backend – Paraciclos do Recife | Node.js + Express

API REST feita em **Node.js com Express** que dá suporte ao app mobile
**[Paraciclos do Recife](https://github.com/lucasquerubim/dados-recife-frontend)**.

Ela recebe e armazena os registros enviados pelo app: a localização do usuário
e o paraciclo mais próximo encontrado. Os dados ficam salvos em um arquivo
`db.json`, funcionando como um banco de dados simples.

> Repositório do app (frontend): https://github.com/lucasquerubim/dados-recife-frontend

---

## O que essa API faz

- Recebe registros do app (localização do usuário + paraciclo mais próximo) via **POST**.
- Devolve a lista de todos os registros salvos via **GET**.
- Guarda tudo em um arquivo local `db.json` (não precisa instalar banco de dados).

---

## Tecnologias

- Node.js
- Express (servidor e rotas)
- CORS (permite o app celular acessar a API)
- File System (`fs`) para ler e gravar o `db.json`

---

## Estrutura do projeto

```
backend/
├── package.json
└── src/
    ├── server.js   # servidor Express + rotas (GET e POST)
    └── db.json     # "banco de dados" (criado automaticamente)
```

---

## Rotas da API

| Método | Rota         | Descrição                                      |
| ------ | ------------ | ---------------------------------------------- |
| `GET`  | `/registros` | Retorna todos os registros salvos.             |
| `POST` | `/registros` | Salva um novo registro (localização + paraciclo). |

### Exemplo de corpo (body) no POST `/registros`

```json
{
  "latitude": -8.12326,
  "longitude": -34.89769,
  "paraciclo": "Orla de Boa Viagem - Próximo a rua Bruno Veloso"
}
```

---

## Como rodar localmente

> **Importante:** suba o **backend antes do app**, porque o app depende dele
> para salvar e listar os registros.

1. Instale as dependências:

```
cd backend
npm install
```

2. Inicie o servidor:

```
node src/server.js
```

Se tudo estiver certo, vai aparecer no terminal algo como:

```
Backend rodando na porta 3000
```

3. Teste no navegador do computador abrindo:

```
http://localhost:3000/registros
```

Se aparecer uma lista (ou `[]` vazio), a API está funcionando.

---

## Conectando o app (celular) ao backend

Para o app no celular conseguir acessar este backend, os dois precisam estar na
**mesma rede Wi-Fi**, e o app precisa apontar para o **IP do computador**
(não `localhost`).

1. Descubra o IP da sua máquina na rede Wi-Fi:
   - **Windows:** `ipconfig` → procure o **Endereço IPv4** do adaptador Wi-Fi.
   - **Mac/Linux:** `ifconfig` ou `ip addr`.

2. No app, abra `src/services/api.js` e coloque esse IP em `IP_DA_MAQUINA`:

```js
const IP_DA_MAQUINA = "192.168.0.10"; // troque pelo IP da sua máquina
```

## Autor

**Lucas Antônio Querubim**
