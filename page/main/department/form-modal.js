


$(function () {
    $('#form-modal-btn-create').on('click', function (event) {
        // document.getElementById("name-form-erorr-length").style.display = "none";
        // document.getElementById("form-name-help").style.display="none";
       
        // var nameForm = $('#form-name').val();
        // if(!nameForm || nameForm.length >= 6 && nameForm.length <= 50){
        //     document.getElementById("form-name-help").style.display="none";
        //     document.getElementById("name-form-erorr-length").style.display="block";
        //     document.getElementById("name-form-erorr-length").innerHTML="Deparment name phải có kí tự từ 6 đến 30 kí tự";
        //     return;
        // }

        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/departments',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                name: $('#form-name').val(),
                totalMembers: $('#form-total-members').val(),
                type: $('#form-type').val()
            }),
            success: function (data) {
                loadDepartments();
                $('#department-form').trigger("reset");
            }
        });
    });



    $('#form-modal-btn-update').on('click', function (event) {
        const id = $('#form-id').val();
        $.ajax({
            method: 'PUT',
            url: 'http://localhost:8080/api/v1/departments/' + id,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id: id,
                name: $('#form-name').val(),
                totalMembers: $('#form-total-members').val(),
                type: $('#form-type').val()
            }),
            success: function (data) {
                loadDepartments();
                $('#department-form').trigger("reset");
                bootstrap.Modal.getOrCreateInstance($('#form-modal')).hide();
            }
        });
    });

    
});