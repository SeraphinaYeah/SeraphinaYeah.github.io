// 设置日期头部
function setDateHeader() {
    const dateHeader = document.querySelector('.date-header');
    const today = new Date();
    dateHeader.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
}

// 获取待办事项列表
function getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

// 保存待办事项列表
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 添加新的待办事项
function addTodo() {
    const input = document.getElementById('newTodoInput');
    const text = input.value.trim();
    
    if (text) {
        const todos = getTodos();
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            date: new Date().toISOString().split('T')[0]
        };
        
        todos.push(newTodo);
        saveTodos(todos);
        renderTodos();
        input.value = '';
    }
}

// 切换待办事项状态
function toggleTodo(id) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

// 渲染待办事项列表
function renderTodos() {
    const todoList = document.getElementById('todoList');
    const todos = getTodos();
    const today = new Date().toISOString().split('T')[0];
    
    // 只显示今天的待办事项
    const todayTodos = todos.filter(todo => todo.date === today);
    
    todoList.innerHTML = todayTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span>${todo.text}</span>
        </div>
    `).join('');
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    setDateHeader();
    renderTodos();
    
    // 添加回车键监听
    document.getElementById('newTodoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
}); 