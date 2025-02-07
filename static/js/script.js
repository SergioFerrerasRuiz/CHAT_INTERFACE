$(document).ready(function() {
    // Evitar que el formulario se recargue
    $("#chat-form").on("submit", function(e) {
        e.preventDefault();  // Esto evita que se recargue la página

        const loadingCircle = $("#loading-circle");
        loadingCircle.removeClass("hidden");

        const userQuestion = $("#chat-input").val().trim();

        // Si el input está vacío, no hacemos nada
        if (userQuestion === "") {
            loadingCircle.addClass("hidden");
            return;
        }

        // Agrega el mensaje del usuario al chat
        $("#chat-box").append(`<div class='message user-message'><strong>Tú:</strong> ${userQuestion}</div>`);
        $("#chat-input").val("");  // Limpia el campo de entrada

        $.ajax({
            type: "POST",  // Usamos POST para enviar la pregunta
            url: "/ask",   // Esta es la ruta de la API de Flask
            contentType: "application/json",
            data: JSON.stringify({ question: userQuestion }),  // Enviamos la pregunta como JSON
            success: function(response) {
                loadingCircle.addClass("hidden");
                console.log('Respuesta recibida:', response);  // Verifica la respuesta

                if (response.answer) {
                    // Si hay respuesta, la añadimos al chat
                    $("#chat-box").append(`<div class='message bot-message'><strong>SERYI:</strong> ${response.answer}</div>`);
                } else {
                    $("#chat-box").append(`<div class='message bot-message text-red-500'>Error en la respuesta</div>`);
                }

                // Hacemos scroll al final del chat
                $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);
            },
            error: function(xhr, errmsg, err) {
                loadingCircle.addClass("hidden");
                console.log('Error en AJAX:', errmsg);  // Si hay un error en la petición
                $("#chat-box").append(`<div class='message bot-message text-red-500'>Error en AJAX</div>`);
            }
        });
    });

    // Si el usuario hace clic en la papelera, limpia el chat
    $("#clear-chat").on("click", function() {
        $("#chat-box").empty();
    });
});
