// 获取所有目标
function getGoals() {
    const goals = localStorage.getItem('futureGoals');
    return goals ? JSON.parse(goals) : [];
}

// 保存目标
function saveGoals(goals) {
    localStorage.setItem('futureGoals', JSON.stringify(goals));
}

// 格式化日期显示
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 获取状态显示文本
function getStatusText(status) {
    const statusMap = {
        'pending': '待开始',
        'in-progress': '进行中',
        'completed': '已完成'
    };
    return statusMap[status] || status;
}

// 获取状态样式类
function getStatusClass(status) {
    return `status-${status}`;
}

// 添加新目标
function addGoal() {
    const titleInput = document.getElementById('goalTitle');
    const dateInput = document.getElementById('targetDate');
    const statusInput = document.getElementById('goalStatus');
    const detailsInput = document.getElementById('goalDetails');
    
    const title = titleInput.value.trim();
    const targetDate = dateInput.value;
    const status = statusInput.value;
    const details = detailsInput.value.trim();
    
    if (title && targetDate && details) {
        const goals = getGoals();
        const newGoal = {
            id: Date.now(),
            title,
            targetDate,
            status,
            details,
            createdAt: new Date().toISOString(),
            updates: []
        };
        
        goals.unshift(newGoal);
        saveGoals(goals);
        renderGoals();
        
        // 清空输入
        titleInput.value = '';
        dateInput.value = '';
        statusInput.value = 'pending';
        detailsInput.value = '';
    } else {
        alert('请填写完整的目标信息！');
    }
}

// 更新目标状态
function updateGoalStatus(id) {
    const goals = getGoals();
    const goal = goals.find(g => g.id === id);
    if (goal) {
        const newStatus = prompt('更新状态进展：', '');
        if (newStatus) {
            goal.updates.push({
                date: new Date().toISOString(),
                content: newStatus
            });
            saveGoals(goals);
            renderGoals();
        }
    }
}

// 删除目标
function deleteGoal(id) {
    if (confirm('确定要删除这个目标吗？')) {
        const goals = getGoals();
        const filteredGoals = goals.filter(goal => goal.id !== id);
        saveGoals(filteredGoals);
        renderGoals();
    }
}

// 渲染目标列表
function renderGoals() {
    const goalsList = document.getElementById('goalsList');
    const goals = getGoals();
    
    goalsList.innerHTML = goals.map(goal => `
        <div class="goal-card">
            <div class="goal-header">
                <h3 class="goal-title">${goal.title}</h3>
                <span class="goal-date">目标日期：${formatDate(goal.targetDate)}</span>
            </div>
            <div class="goal-status ${getStatusClass(goal.status)}">
                ${getStatusText(goal.status)}
            </div>
            <p>${goal.details}</p>
            ${goal.updates.map(update => `
                <div class="update-item">
                    <small>${formatDate(update.date)}：</small>
                    <p>${update.content}</p>
                </div>
            `).join('')}
            <div class="goal-actions">
                <button class="update-btn" onclick="updateGoalStatus(${goal.id})">更新进展</button>
                <button class="delete-btn" onclick="deleteGoal(${goal.id})">删除目标</button>
            </div>
        </div>
    `).join('');
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    renderGoals();
}); 