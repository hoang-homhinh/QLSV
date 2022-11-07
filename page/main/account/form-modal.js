

var listDepartment = [];
getListDepartment();
function getListDepartment() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/departments",
        dataType: "json",
        success: function (response) {
            listDepartment = [];
            listDepartment = response["content"];
            //console.log(listDepartment);

            for (let index = 0; index < listDepartment.length; index++) {
                //jqAppend: nối html vào nơi mình cần nối
                $("#form-department").append(`
                <option value="${listDepartment[index].id}">${listDepartment[index].name}</option>
                `)
            }
        }})
}

$(function () {
    $('#form-modal-btn-create').on('click', function (event) {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/accounts',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                username: $('#form-username').val(),
                password: $('#form-password').val(),
                firstName: $('#form-first-name').val(),
                lastName: $('#form-last-name').val(),
                role: $('#form-role').val(),
                departmentId: $('#form-department').val()
            }),
            success: function (data) {
                loadAccounts();
                $('#account-form').trigger("reset");
                bootstrap.Modal.getOrCreateInstance($('#form-modal')).hide();
            }
        });
    });

    $('#form-modal-btn-update').on('click', function (event) {
        const id = $('#form-id').val();
        const username = $('#form-username').val();
        $.ajax({
            method: 'PUT',
            url: 'http://localhost:8080/api/v1/accounts/' + id,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: id,
                // username: username,
                password: $('#form-password').val(),
                firstName: $('#form-first-name').val(),
                lastName: $('#form-last-name').val(),
                role: $('#form-role').val(),
                departmentId: $('#form-department').val()
            }),
            success: function (data) {
                loadAccounts();
                $('#account-form').trigger("reset");
                bootstrap.Modal.getOrCreateInstance($('#form-modal')).hide();
            }
        });
    });
});