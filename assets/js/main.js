(function autoInvoke() {
    
    const taskInput = document.querySelector ('#task-input');
    const tasks = document.querySelector ('.tasks');

    document.body.addEventListener ('click', e => {

        const element = e.target;
        
        if (element.id === 'task-confirm') {

            addTask (tasks, taskInput);

            return true;            

        } else if (element.classList.contains ('delete')) {

            deleteTask (element.parentElement);

            return true;

        } else if (element.id === 'toggle-mode' || element.closest('#toggle-mode')) {

            toggleMode ();

            return true;
        }

    })

    document.addEventListener ('keypress', e => {

        if (e.key !== 'Enter') return;

        addTask (tasks, taskInput);
        e.preventDefault ();

        return true; 

    })

    loadTasks (tasks);
    loadMode ();

}) ()

function addTask (element, toAdd) {

    const inputText = typeof toAdd === 'string' ? toAdd : toAdd.value.trim ();

    if (!inputText) {
        alert ('A tarefa não pode estar vazia.');
        return;
    }
    
    const list = document.createElement ('li');
    list.innerText = inputText;
    element.appendChild (list);

    clearInput (toAdd);
    createDeleteButton (list);
    saveTasks (element);

    return true;

}

function clearInput (input) {

    if (typeof input === 'string') return;
    
    input.value = '';
    input.focus ();

    return true;
}

function createDeleteButton (list) {

    list.innerText += ' ';
    
    const button = document.createElement ('button');
    button.innerText = 'Apagar';

    list.appendChild (button);
    button.setAttribute ('class', 'delete');

}

function saveTasks (allTasks) {
    
    const tasks = [...allTasks.querySelectorAll('li')].map(task => task.innerText.replace('Apagar', '').trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function loadTasks (taskElement) {
    
    try {

        const data = localStorage.getItem ('tasks');
        const tasks = JSON.parse (data) || [];

        tasks.forEach (taskText => {

            const task = document.createElement ('li');
            task.innerText = taskText;

            taskElement.appendChild (task);
            createDeleteButton (task);

        });

    } catch (error) {
        console.error ('Erro ao carregar tarefas:', error);
    }

}

function deleteTask (element) {

    if (confirm ('Tem certeza que deseja remover esta tarefa?')) {

        element.remove ();
        saveTasks(document.querySelector ('.tasks'));

    }

}

function toggleMode () {
    document.body.classList.toggle ('black-mode');
    saveMode ();
}

function saveMode () {
    const isBlackMode = document.body.classList.contains ('black-mode');
    localStorage.setItem ('mode', isBlackMode ? 'black' : 'white');
}

function loadMode () {
    const mode = localStorage.getItem ('mode');
    if (mode === 'black') {
        document.body.classList.add ('black-mode');
    }
}