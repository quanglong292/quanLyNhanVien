function Validation() {

    this.checkEmpt = function (inputVal, spanELE, message) {
        if (inputVal.trim() === "") {
            spanELE.innerHTML = message;
            return false
        } else {
            spanELE.innerHTML = "";
            return true;
        }
    }

    this.checkLength = function(inputVal, spanELE, message, min, max) {
        if (inputVal.length >= min && inputVal.length <= max) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.innerHTML = message;
            return false;
        }
    };

    this.checkValue = (inputVal, spanELE, message, min, max) => {
        if (inputVal >= min && inputVal <= max) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.innerHTML = message;
            return false;
        }
    }

    this.checkLetters = function (inputVal, spanELE, message) {
        var letter = new RegExp ("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if (letter.test(inputVal)) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.innerHTML = message;
            return false;
        }
    }

    this.emailCheck = function (inputVal, spanELE, message) {
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputVal.match(emailPattern)) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.innerHTML = message;
            return false;
        }
    }   

    this.dateFormat = function (input, spanELE, message) {
        var dateFormat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

        if (input.match(dateFormat)) {
            panELE.innerHTML = "";
            return true;
        } else {
            spanELE.innerHTML = message;
            return false;
        }
    }
}