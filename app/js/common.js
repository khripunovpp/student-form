var addFiles = function() {
    var filesNames = [];

    $('#files').on('change', function() {
        filesNames = [];
        getFilesNames(this)
        showFilesNames(filesNames)
    });

    function getFilesNames(input) {
        var errorMsg = $('.form__files-error'),
            taskWrap = $('.form__task');
        for (var i = 0; i < $(input).get(0).files.length; ++i) {
            if ($(input).get(0).files[i].size < 5242880) {
                errorMsg.fadeOut(100);
                taskWrap.removeClass('invalid')
                filesNames.push($(input).get(0).files[i].name);
            } else {
                errorMsg.fadeIn(100);
                taskWrap.addClass('invalid')
            }
        }
    }

    function showFilesNames(files) {
        $('.form__files-name').each(function() {
            $(this).remove()
        })
        files.forEach(function(item) {
            $('.form__files-label').before('<p class="form__files-name">' + item + '</p>')
        })
    }
}

var validation = function() {
    var submitBtn = $('.form__submit'),
        fields = $('#mainForm').find('.form__field, .form__textarea');

    submitBtn.on('click', function(event) {
        fields.each(function() {
            if ($(this).is(":invalid")) {
                $(this).closest('.form__task, .form__field').addClass('invalid')
                $(this).next('.form__field-error').fadeIn(100);
            } else {
                $(this).closest('.form__task, .form__field').removeClass('invalid')
                $(this).next('.form__field-error').fadeOut(100);
            }
        });
    });
    fields.on('input blur', function(event) {
        if ($(this).val()) $(this).closest('.form__task, .form__field').removeClass('invalid'), $(this).next('.form__field-error').fadeOut(100);
    });

    $('#phone').mask('+7 (999) 9999999');
}

$(function() {

    addFiles()
    validation()

});