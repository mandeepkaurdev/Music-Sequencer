loginFunctions = {

    renderLogin: function () {
        $('body').append(
            $('<div>').addClass('ui login-screen').append(
                $('<form>').addClass('login-form').append(
                    $('<div>').attr('id', 'close-login').addClass('ui').append(
                        $('<i>').addClass('fas fa-times')
                    ),
                    $('<div>').addClass('ui username').append(
                        $('<h1>').text('USERNAME'),
                        $('<input>').attr('id', 'username-input')
                    ),
                    $('<div>').addClass('ui password').append(
                        $('<h1>').text('PASSWORD'),
                        $('<input>').attr({ 'id': 'password-input', 'type': 'password' })
                    ),
                    $('<h1>').attr('id', 'login-button').addClass('ui button acc').css({ 'height': '48px', 'margin': '8px' }).text('LOGIN'),
                    $('<div>').addClass('create-acc-box').append(
                        $('<h1>').text('Dont have an account?'),
                        $('<h1>').attr('id', 'create-acc-link').text('Create an Account!')
                    ),
                    $('<div>').addClass('create-account-form').append(
                        $('<div>').attr('id', 'close-login').addClass('ui').append(
                            $('<i>').addClass('fas fa-times')
                        ),
                        $('<div>').addClass('ui username').append(
                            $('<h1>').text('USERNAME'),
                            $('<input>').attr('id', 'create-username-input')
                        ),
                        $('<div>').addClass('ui password').append(
                            $('<h1>').text('PASSWORD'),
                            $('<input>').attr({ 'id': 'create-password-input', 'type': 'password' })
                        ),
                        $('<div>').addClass('create-acc-box').append(
                            $('<h1>').text('Already have an account?'),
                            $('<h1>').attr('id', 'login-link').text('Login to your Account!')
                        ),
                        $('<h1>').attr('id', 'create-account-button').addClass('ui button acc').css({ 'height': '48px', 'margin': '8px' }).text('CREATE ACCOUNT')
                    )
                )
            )
        )
    },

    login: function () {
        var user = {
            username: $('#username-input').val(),
            password: $('#password-input').val()
        }
        $.ajax({url: '/api/beats', method: 'GET', data: user.username})
        $('.login-screen').remove()
        iflogged = user.username;
        return iflogged;
    },

    createAccount: function (newUser) {
        var newUser = {
            username: $('#create-username-input').val(),
            password: $('#create-password-input').val()
        }
        $.ajax({url: '/api/users', method: 'POST', data: newUser})
            .catch(function () {
                alert('That username has been taken')
            })
        $('.login-screen').remove()
        iflogged = newUser.username;
        return iflogged;
    },

}

$(document).ready(function () {

    $(document).on('click', '#login-button', function () {
        if ($('#username-input').val() === '') {
            alert('Please enter a username');
            return
        }
        if ($('#password-input').val() === '') {
            alert('Please enter a password');
        } else {
            loginFunctions.login();
        }
    });

    $(document).on('click', '#create-account-button', function () {
        if ($('#create-username-input').val() === '') {
            alert('Please enter a username');
            return
        }
        if ($('#create-password-input').val() === '') {
            alert('Please enter a password');
        } else {
            loginFunctions.createAccount();
        }
    });

    $(document).keypress(function (e) {
        if ($('#create-password-input').is(':focus')) {
            if (e.which == 13) {
                if ($('#create-username-input').val() === '') {
                    alert('Please enter a username');
                    return
                }
                if ($('#create-password-input').val() === '') {
                    alert('Please enter a password');
                } else {
                    loginFunctions.createAccount();
                }
            }
        }
        if ($('#create-username-input').is(':focus')) {
            if (e.which == 13) {
                if ($('#create-username-input').val() === '') {
                    alert('Please enter a username');
                } else {
                    $('#create-password-input').focus();
                }
            }
        }
        if ($('#password-input').is(':focus')) {
            if (e.which == 13) {
                if ($('#username-input').val() === '') {
                    alert('Please enter a username');
                    return
                }
                if ($('#password-input').val() === '') {
                    alert('Please enter a password');
                } else {
                    loginFunctions.login();
                }
            }
        }
        if ($('#username-input').is(':focus')) {
            if (e.which == 13) {
                if ($('#username-input').val() === '') {
                    alert('Please enter a username');
                } else {
                    $('#password-input').focus();
                }
            }
        }
    });

    $(document).on('click', '#login-link', function () {
        $('.create-account-form').addClass('create-out');
        $('.create-account-form').removeClass('create-in');
    });

    $(document).on('click', '#create-acc-link', function () {
        $('.create-account-form').addClass('create-in');
        $('.create-account-form').removeClass('create-out');
    });

    $(document).on('click', '#open-login-button', function () {
        loginFunctions.renderLogin();
    });

    $(document).on('click', '#close-login', function () {
        $('.login-screen').remove()
    });

})