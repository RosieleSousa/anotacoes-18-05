"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.resetTasks = resetTasks;
let tasks = [];
let nextId = 1;
function getTasks(_req, res) {
    res.json(tasks);
}
function getTaskById(req, res) {
    const task = tasks.find((t) => t.id === Number(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    res.json(task);
}
function createTask(req, res) {
    const { title } = req.body;
    if (!title || title.trim() === '') {
        res.status(400).json({ error: 'Title is required' });
        return;
    }
    const task = { id: nextId++, title: title.trim(), done: false };
    tasks.push(task);
    res.status(201).json(task);
}
function updateTask(req, res) {
    const index = tasks.findIndex((t) => t.id === Number(req.params.id));
    if (index === -1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    const { title, done } = req.body;
    if (title !== undefined)
        tasks[index].title = title.trim();
    if (done !== undefined)
        tasks[index].done = done;
    res.json(tasks[index]);
}
function deleteTask(req, res) {
    const index = tasks.findIndex((t) => t.id === Number(req.params.id));
    if (index === -1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    tasks.splice(index, 1);
    res.status(204).send();
}
// Usado nos testes para resetar o estado em memória entre cada teste
function resetTasks() {
    tasks = [];
    nextId = 1;
}
