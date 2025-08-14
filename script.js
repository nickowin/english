function playWord() {
    const audio = new Audio('english-learning-app/audio/hello.mp3');
    audio.play();
}

function startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                const audioChunks = [];
                
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };
                
                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.play();
                };
                
                mediaRecorder.start();
                
                setTimeout(() => {
                    mediaRecorder.stop();
                    stream.getTracks().forEach(track => track.stop());
                }, 3000);
            })
            .catch(error => {
                console.error('Lỗi khi truy cập microphone:', error);
            });
    } else {
        console.error('Trình duyệt không hỗ trợ ghi âm');
    }
}

function nextWord() {
    const words = ['Hello', 'World', 'Good', 'Morning', 'Thank you'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('current-word').textContent = randomWord;
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim()) {
        addMessage(message, 'user');
        input.value = '';
        
        // Giả lập phản hồi AI
        setTimeout(() => {
            addMessage('Cảm ơn bạn! Đây là phản hồi từ AI.', 'ai');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function startVoiceChat() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chat-input').value = transcript;
            sendMessage();
        };
        
        recognition.start();
    } else {
        console.error('Trình duyệt không hỗ trợ nhận diện giọng nói');
    }
}

function selectTopic(topic) {
    const topics = {
        'daily-life': 'Cuộc sống hàng ngày',
        'travel': 'Du lịch',
        'food': 'Ẩm thực',
        'work': 'Công việc'
    };
    
    addMessage(`Hãy nói về chủ đề ${topics[topic]} nhé!`, 'ai');
}

function startTopic(topic) {
    alert(`Bắt đầu học chủ đề: ${topic}`);
}

function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function saveSettings() {
    const voice = document.getElementById('voice-select').value;
    const speed = document.getElementById('speed-slider').value;
    localStorage.setItem('voice', voice);
    localStorage.setItem('speed', speed);
    closeSettings();
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    // Thiết lập navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Ẩn tất cả sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Hiện section được chọn
            document.getElementById(targetSection).classList.add('active');
            
            // Cập nhật active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Load saved settings
    const savedVoice = localStorage.getItem('voice') || 'en-US';
    const savedSpeed = localStorage.getItem('speed') || '1';
    document.getElementById('voice-select').value = savedVoice;
    document.getElementById('speed-slider').value = savedSpeed;
});

// Thêm các chức năng khác tại đây
