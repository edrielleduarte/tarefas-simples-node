const express = require('express');

const app = express();
const port = 8080;
const useRoutes = require('./routes/User');

app.use(express.json());
app.use(useRoutes);

app.listen(port, () => {
  console.log(`Servidor sendo executado na porta ${port}`);
});
