const express = require('express');

const server = express();

server.use(express.json());

const tarefas = [];

server.get('/tarefas', (req, res) => {
  return res.json(tarefas.sort((a, b) => a.id - b.id));
});

server.get('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const tarefa = tarefas.find((idTarefa) => idTarefa.id === Number(id));
  return res.json(tarefa);
});

server.post('/tarefas', (req, res) => {
  const { id, tarefa } = req.body;
  const result = tarefas.some((idTarefa) => {
    if (idTarefa.id === id) {
      return res.status(404).json({ error: 'ID/Tarefa já cadastrada' });
    }
  });

  if (result) {
    return result;
  } else {
    tarefas.push({ id, tarefa });
    res.status(201).json(tarefas);
  }
});

server.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { tarefa } = req.body;
  const tarefaAtualizada = tarefas.find(
    (idTarefa) => idTarefa.id === Number(id),
  );
  tarefaAtualizada.tarefa = tarefa;
  return res.json(tarefaAtualizada);
});

server.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;

  const tarefaDeletada = tarefas.find((idTarefa) => idTarefa.id === Number(id));
  if (tarefaDeletada) {
    tarefas = tarefas.filter((idTarefa) => idTarefa.id !== Number(id));
    return res.status(200).json({ mensagem: 'Tarefa deletada com sucesso' });
  } else {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});
