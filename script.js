// ===== INICIALIZACIÓN DE AOS =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: false,
        offset: 100
    });
    
    // Mostrar mensaje de carga
    console.log('🚀 CyberShield - Página cargada correctamente');
});

// ===== SALUDO DINÁMICO =====
document.addEventListener('DOMContentLoaded', function() {
    function actualizarSaludo() {
        const hora = new Date().getHours();
        const saludoElement = document.getElementById('textoSaludo');
        let saludo = '';
        let icono = '';
        
        if (hora >= 5 && hora < 12) {
            saludo = '¡Buenos días! Bienvenido a CyberShield';
            icono = '🌅';
        } else if (hora >= 12 && hora < 19) {
            saludo = '¡Buenas tardes! Bienvenido a CyberShield';
            icono = '☀️';
        } else {
            saludo = '¡Buenas noches! Bienvenido a CyberShield';
            icono = '🌙';
        }
        
        const fecha = new Date().toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        saludoElement.innerHTML = `${icono} ${saludo} ${icono}<br><small class="fs-6">${fecha}</small>`;
        
        console.log(`🕒 ${new Date().toLocaleTimeString('es-MX')} - ${saludo}`);
    }
    
    actualizarSaludo();
    setInterval(actualizarSaludo, 60000);
});

// ===== FORMULARIO DE CONTACTO =====
document.addEventListener('DOMContentLoaded', function() {
    const formContacto = document.getElementById('formContacto');
    const mensajeExito = document.getElementById('mensajeExito');
    
    if (!formContacto) return;
    
    // Validación de Bootstrap
    (function() {
        'use strict';
        var forms = document.querySelectorAll('.needs-validation');
        Array.prototype.slice.call(forms).forEach(function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                if (form.checkValidity()) {
                    procesarFormulario();
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    })();
    
    function procesarFormulario() {
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        const terminos = document.getElementById('terminos').checked;
        
        // Crear objeto con los datos
        const datosFormulario = {
            nombre: nombre,
            telefono: telefono,
            email: email,
            mensaje: mensaje || "Sin mensaje adicional",
            terminos: terminos,
            fechaEnvio: new Date().toLocaleString('es-MX'),
            timestamp: new Date().toISOString()
        };
        
        // MOSTRAR EN CONSOLA (ESTA ES LA PARTE IMPORTANTE)
        console.log("========================================");
        console.log("📋 DATOS DEL FORMULARIO ENVIADOS:");
        console.log("========================================");
        console.log("👤 NOMBRE COMPLETO:", datosFormulario.nombre);
        console.log("📞 TELÉFONO:", datosFormulario.telefono);
        console.log("📧 EMAIL:", datosFormulario.email);
        console.log("💬 MENSAJE:", datosFormulario.mensaje);
        console.log("✅ TÉRMINOS ACEPTADOS:", datosFormulario.terminos ? "Sí" : "No");
        console.log("📅 FECHA DE ENVÍO:", datosFormulario.fechaEnvio);
        console.log("🕒 TIMESTAMP:", datosFormulario.timestamp);
        console.log("========================================");
        console.log("🎯 Formulario procesado correctamente!");
        console.log("========================================");
        
        // Mostrar mensaje de éxito
        mostrarMensajeExito();
        
        // Reiniciar formulario después de 3 segundos
        setTimeout(function() {
            formContacto.reset();
            formContacto.classList.remove('was-validated');
        }, 3000);
    }
    
    function mostrarMensajeExito() {
        if (mensajeExito) {
            mensajeExito.classList.remove('d-none');
            mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(function() {
                mensajeExito.classList.add('d-none');
            }, 5000);
        }
    }
    
    // Botón Limpiar
    const btnLimpiar = formContacto.querySelector('button[type="reset"]');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', function() {
            formContacto.classList.remove('was-validated');
            mensajeExito.classList.add('d-none');
            
            // Limpiar clases de validación
            const inputs = formContacto.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
            
            console.log("🧹 Formulario limpiado");
        });
    }
    
    // Validación en tiempo real para teléfono
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            // Solo números
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Validar longitud
            if (this.value.length === 10) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else if (this.value.length > 0) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            }
        });
    }
    
    console.log("✅ Script del formulario cargado");
});

// ===== CONTADOR INTERACTIVO =====
document.addEventListener('DOMContentLoaded', function() {
    let contador = 0;
    let clicsTotales = 0;
    let valorMaximo = 0;
    let intervaloAuto = null;
    let velocidad = 0;
    let ultimoClic = Date.now();
    
    // Elementos del DOM
    const numeroContador = document.getElementById('numeroContador');
    const btnIncrementar = document.getElementById('btnIncrementar');
    const btnDisminuir = document.getElementById('btnDisminuir');
    const btnReiniciar = document.getElementById('btnReiniciar');
    const btnAutomatico = document.getElementById('btnAutomatico');
    const clicsTotalesElement = document.getElementById('clicsTotales');
    const valorMaximoElement = document.getElementById('valorMaximo');
    const velocidadElement = document.getElementById('velocidad');
    
    if (!numeroContador) return;
    
    // Actualizar display
    function actualizarDisplay() {
        numeroContador.textContent = contador;
        clicsTotalesElement.textContent = clicsTotales;
        valorMaximoElement.textContent = valorMaximo;
        velocidadElement.textContent = velocidad.toFixed(1) + '/s';
        
        // Actualizar valor máximo
        if (contador > valorMaximo) {
            valorMaximo = contador;
        }
        
        // Cambiar color
        if (contador >= 100) {
            numeroContador.style.color = '#00ff00';
        } else if (contador >= 50) {
            numeroContador.style.color = '#ffd700';
        } else {
            numeroContador.style.color = '#ffa500';
        }
        
        // Actualizar título
        document.title = `CyberShield 🔢 ${contador}`;
    }
    
    // Incrementar
    function incrementarContador() {
        // Calcular velocidad
        const ahora = Date.now();
        const tiempoTranscurrido = (ahora - ultimoClic) / 1000;
        velocidad = tiempoTranscurrido > 0 ? 1 / tiempoTranscurrido : 0;
        ultimoClic = ahora;
        
        // Incrementar
        contador++;
        clicsTotales++;
        
        // Animación
        numeroContador.classList.remove('animar');
        void numeroContador.offsetWidth;
        numeroContador.classList.add('animar');
        
        actualizarDisplay();
        console.log(`➕ Contador: ${contador}`);
    }
    
    // Disminuir
    function disminuirContador() {
        if (contador > 0) {
            contador--;
            clicsTotales++;
            actualizarDisplay();
            console.log(`➖ Contador: ${contador}`);
        }
    }
    
    // Reiniciar
    function reiniciarContador() {
        if (contador > 0) {
            contador = 0;
            clicsTotales++;
            actualizarDisplay();
            console.log('🔄 Contador reiniciado');
        }
    }
    
    // Auto-incrementar
    function toggleAutoIncrementar() {
        if (intervaloAuto) {
            clearInterval(intervaloAuto);
            intervaloAuto = null;
            btnAutomatico.innerHTML = '<i class="bi bi-play-circle me-1"></i>Auto-incrementar';
            btnAutomatico.classList.remove('btn-success');
            btnAutomatico.classList.add('btn-outline-info');
        } else {
            intervaloAuto = setInterval(incrementarContador, 500);
            btnAutomatico.innerHTML = '<i class="bi bi-stop-circle me-1"></i>Detener auto';
            btnAutomatico.classList.remove('btn-outline-info');
            btnAutomatico.classList.add('btn-success');
        }
    }
    
    // Event listeners
    if (btnIncrementar) btnIncrementar.addEventListener('click', incrementarContador);
    if (btnDisminuir) btnDisminuir.addEventListener('click', disminuirContador);
    if (btnReiniciar) btnReiniciar.addEventListener('click', reiniciarContador);
    if (btnAutomatico) btnAutomatico.addEventListener('click', toggleAutoIncrementar);
    
    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            incrementarContador();
        }
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            incrementarContador();
        }
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            disminuirContador();
        }
    });
    
    // Inicializar
    actualizarDisplay();
    console.log('✅ Contador interactivo listo');
});

// ===== FUNCIONALIDADES ADICIONALES AOS =====
document.addEventListener('DOMContentLoaded', function() {
    // Reiniciar animaciones
    const btnReiniciarAnimaciones = document.getElementById('btnReiniciarAnimaciones');
    if (btnReiniciarAnimaciones) {
        btnReiniciarAnimaciones.addEventListener('click', function() {
            AOS.refresh();
            console.log('🔄 Animaciones AOS reiniciadas');
        });
    }
    
    // Ver código
    const btnVerCodigo = document.getElementById('btnVerCodigo');
    if (btnVerCodigo) {
        btnVerCodigo.addEventListener('click', function() {
            console.log('📝 Código de ejemplo AOS:');
            console.log('<div data-aos="fade-up">Contenido animado</div>');
            console.log('<div data-aos="zoom-in" data-aos-duration="2000">Zoom lento</div>');
            alert('Consulta la consola para ver ejemplos de código AOS');
        });
    }
});