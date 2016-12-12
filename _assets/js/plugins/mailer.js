$(function() {
    //https://ajax.microsoft.com/ajax/jquery.validate/1.15.1/additional-methods.js

    $.validator.addMethod( "lettersonly", function( value, element ) {
        return this.optional( element ) || /^[a-z]+$/i.test( value );
    }, "Letters only please" );

    $("form[name='contact']").validate({
        rules: {
            name: {
                required: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 10,
            }
        },
        messages: {
            name: {
                required: "Insira seu nome",
                lettersonly: "Números não são permitidos aqui"
            },
            email: {
                required: "Insira seu email",
                email: "Esse email não existe, tente outro."
            },
            phone: {
                required: "Insira seu telefone",
                minlength: "Numero incompleto (DDD obrigatório)"
            }
        },
        submitHandler: function(form) {
            NProgress.start();
            $.ajax({
                url: form.action,
                type: form.method,
                data: $(form).serialize(),
                success: function(response) {
                    NProgress.done();
                    alert.append('<div class="alert -success">Mensagem Enviada =]</div>').delay(3000).fadeOut();
                    formulario.clearForm();
                }            
            });
        }
    });


});

$.fn.clearForm = function() {
    return this.each(function() {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag == 'form')
            return $(':input',this).clearForm();
        if (type == 'text' || type == 'email' || type == 'tel' || type == 'password' || tag == 'textarea')
            this.value = '';
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};