// 获取所有笔记
function getNotes() {
    const notes = localStorage.getItem('readingNotes');
    return notes ? JSON.parse(notes) : [];
}

// 保存笔记
function saveNotes(notes) {
    localStorage.setItem('readingNotes', JSON.stringify(notes));
}

// 添加新笔记
function addNote() {
    const titleInput = document.getElementById('bookTitle');
    const contentInput = document.getElementById('noteContent');
    
    const title = titleInput.value.trim();
    const content = contentInput.innerHTML;
    
    if (title && content) {
        const notes = getNotes();
        const newNote = {
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toISOString(),
        };
        
        notes.unshift(newNote);
        saveNotes(notes);
        renderNotes();
        
        // 清空输入框
        titleInput.value = '';
        contentInput.innerHTML = '';
    } else {
        alert('请填写书名和笔记内容！');
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// 删除笔记
function deleteNote(id) {
    if (confirm('确定要删除这条笔记吗？')) {
        const notes = getNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        saveNotes(filteredNotes);
        renderNotes();
    }
}

// 渲染笔记列表
function renderNotes() {
    const notesList = document.getElementById('notesList');
    const notes = getNotes();
    
    notesList.innerHTML = notes.map(note => `
        <div class="note-card">
            <h3>${note.title}</h3>
            <div class="note-date">${formatDate(note.date)}</div>
            <div class="note-content">${note.content}</div>
            <button onclick="deleteNote(${note.id})" style="background-color: #ff4444; margin-top: 10px;">
                删除笔记
            </button>
        </div>
    `).join('');
}

// 格式化文档
function formatDoc(command, value = null) {
    document.execCommand(command, false, value);
    document.getElementById('noteContent').focus();
}

// 设置字体
document.getElementById('fontName').onchange = function() {
    formatDoc('fontName', this.value);
};

// 设置字号
document.getElementById('fontSize').onchange = function() {
    formatDoc('fontSize', this.value);
};

// 设置文字颜色
function setTextColor(color) {
    formatDoc('foreColor', color);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
    // 设置初始焦点
    document.getElementById('noteContent').focus();
}); 