document.getElementById('sendButton').addEventListener('click', async function () {
    const query = document.getElementById('userInput').value; // Kullanıcı girdisi
    if (!query) {
        alert('Please enter a message!');
        return;
    }

    // Kullanıcı mesajını ekleyelim
    displayMessage(query, 'user');

    // JSON yapısını oluşturuyoruz
    const body = {
        contents: [
            {
                parts: [
                    {
                        text: query // Kullanıcıdan gelen metin buraya ekleniyor
                    }
                ]
            }
        ]
    };

    try {
        // API çağrısı
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC7A_WfBZu5uD4GLs_ZErsOFEiDdf1nqq8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) // JSON'u string formatında gönderiyoruz
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // API'den gelen yanıtı işleme
        const data = await response.json();
        const result = data.contents?.[0]?.parts?.[0]?.text || "No response from AI.";

        // AI cevabını ekleyelim
        displayMessage(result, 'ai');
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Error fetching response.', 'ai');
    }
});

// Mesajları ekleyen fonksiyon
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Chat kutusunun sonuna kaydırma
    chatBox.scrollTop = chatBox.scrollHeight;

    // Kullanıcı girişi kutusunu temizle
    document.getElementById('userInput').value = '';
}
