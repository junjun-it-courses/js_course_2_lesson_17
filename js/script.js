let form = document.getElementById('todoForm');
const STORE_ID = 'todoItems';
const TODO_CONTAINER =  document.getElementById('todoItems');

document.addEventListener('DOMContentLoaded', function () {
    if(!localStorage[STORE_ID]) return;

    const data = JSON.parse(localStorage[STORE_ID]);

    data.forEach(function (item) {
        // document.getElementById('todoItems')
        const template = createTemplate(item.heading, item.content);
        TODO_CONTAINER.prepend(template);
    })

});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const heading = e.target.querySelector('input[name=title]');
    const content = e.target.querySelector('textarea[name=description]');

    if(!heading.value || !content.value) {
        alert('Заполните все поля !!!!');
        return;
    }

    const template = createTemplate(heading.value, content.value);
    useStorage(heading.value, content.value)

    // document.getElementById('todoItems')
    TODO_CONTAINER.prepend(template);

    e.target.reset();
});

function useStorage(heading, content) {
    // localStorageArray  = 'todoItems'
    if(localStorage[STORE_ID]) {
        const storeData = JSON.parse(localStorage.getItem(STORE_ID));
        storeData.push({heading, content});

        localStorage.setItem(STORE_ID, JSON.stringify(storeData));
        return;
    }


    const arr = JSON.stringify([{heading, content}]);
    localStorage.setItem(STORE_ID, arr);
    return {heading, content};
}

function createTemplate(title, taskBody) {
    const mainWrp = document.createElement('div');
    mainWrp.className = 'col-4';

    const taskWrp = document.createElement('div');
    taskWrp.className = 'taskWrapper';

    const heading = document.createElement('div');
    heading.className = 'taskHeading';
    heading.innerText = title;

    const taskDesc = document.createElement('div');
    taskDesc.className = 'taskDescription';
    taskDesc.innerText = taskBody;


    mainWrp.append(taskWrp);
    taskWrp.append(heading)
    taskWrp.append(taskDesc)

    return mainWrp;
}