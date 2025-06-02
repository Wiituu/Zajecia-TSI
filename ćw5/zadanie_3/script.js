document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskInput.value}</span>
        <span class="delete">✖</span>
    `;

    li.querySelector('span').addEventListener('click', function() {
        this.classList.toggle('completed');
    });

    li.querySelector('.delete').addEventListener('click', function() {
        li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = '';
}