
var listDepartment1 = [];
getListDepartment1();
function getListDepartment1() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/departments/departmentName",
        dataType: "json",
        success: function (response) {
            listDepartment1 = [];
            listDepartment1 = response;
            console.log(listDepartment1);

            for (let index = 0; index < listDepartment1.length; index++) {
                //jqAppend: nối html vào nơi mình cần nối
                $("#form-department1").append(`
                <option value="${listDepartment1[index].id}">${listDepartment1[index].name}</option>
                `)
            }
        }})
}

$(function () {
    $('#toast-container').load('/common/toast/toast.html');

    $('#btn-register').on('click', event => {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/auth/register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                username: $('#username').val(),
                firstName: $('#first-name').val(),
                lastName: $('#last-name').val(),
                password: $('#password').val(),
                role: $('#role').val(),
                departmentId: $('#form-department1').val()
            }),
            success: data => {
                console.log('Đăng ký thành công.');
                showToast('Đăng ký thành công', 'Chúng tôi đang chuyển hướng bạn đến trang đăng nhập...');
                setTimeout(function () {
                    window.location.replace('/page/authentication/login/login.html');
                }, 2000);
            },
            error: () => {
                console.log('Đăng ký thất bại.');
                showToast('Đăng ký thất bại');
            }
        });
    });
});

function showToast(title, message) {
    $('#toast-title').text(title);
    $('#toast-body').text(message);
    bootstrap.Toast.getOrCreateInstance($('#toast')).show();
}