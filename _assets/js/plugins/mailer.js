$(function() {
    var form   = $( '#contact-form' );
    var action = form.attr('action');
    var alert  = $('.site-alert');

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

            form.submit(function(e) {
                e.preventDefault();

                NProgress.start();
                var values = $(this).serialize();

                $.post(action, values, function(data) {
                    form.clearForm();
                }, 'json').fail(function() {
                    NProgress.done();
                    alert.append('<div class="alert -success">Mensagem Enviada =]</div>');
                    form.clearForm();
                }).done(function() {
                    NProgress.done();
                    alert.append('<div class="alert -success">Mensagem Enviada =]</div>');
                    form.clearForm();
                });
                return false
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