document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    
    // 1. Petición al backend
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // 2. Almacenar el Token JWT
            const token = data.token;
            localStorage.setItem('authToken', token);
            
            // ===================================================
            //  CAMBIO CLAVE: Redireccionar al catálogo
            // ===================================================
            window.location.href = 'catalogo.html';
        } else {
            // Mostrar error si la respuesta del backend no es OK (400, 401, etc.)
            messageElement.style.color = 'red';
            messageElement.textContent = data.message || 'Error desconocido';
        }
    } catch (error) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Error de conexión con el servidor.';
        console.error('Error:', error);
    }
});

// Nota: La función fetchProtectedData ahora no es necesaria en este archivo, 
// ya que la redirección a 'catalogo.html' moverá la lógica a esa nueva página.