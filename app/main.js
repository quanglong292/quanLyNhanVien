var nvService = new NhanVienServices();
var valid = new Validation();


function getELE (id) {
    return document.getElementById(id);
}
getDSNV();
function getDSNV () {
    var promise = nvService.layDS();
    promise.then(function(result){
        console.log(result.data);
        hienThi(result.data);
    }).catch(function(error){
        console.log(error);
    });
}

function delNV (id) {
    nvService.xoaNV(id).then(function(result){
        getDSNV();
    }).catch(function(error){
        console.log(error);
    });
}

// Cập nhật
function capNhat (id) {
    
    var taiKhoan = getELE("tknv").value;
    var hoTen = getELE("name").value;
    var matKhau = getELE("password").value;
    var email = getELE("email").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    var isValid = true;

    isValid &= valid.checkEmpt(taiKhoan, getELE("tbTKNV"), "Tài khoản không được để trống!") && valid.checkLength(taiKhoan, getELE("tbTKNV"), "Tài khoản: 4-6 ký tự (bao gồm số)", 4, 6);

    isValid &= valid.checkEmpt(hoTen, getELE("tbTen"), "Họ tên không được để trống!") && valid.checkLetters(hoTen, getELE("tbTen"), "Họ tên chỉ có chữ!");

    isValid &= valid.checkEmpt(email, getELE("tbEmail"), "Email không được để trống!") && valid.emailCheck(email, getELE("tbEmail"), "Email không hợp lệ");

    isValid &= valid.checkEmpt(matKhau, getELE("tbMatKhau"), "Mật khẩu không được để trống!") && valid.checkLength(matKhau, getELE("tbMatKhau"), "Độ dài ký tự: 6-10", 6, 10);

    isValid &= valid.checkEmpt(ngayLam, getELE("tbNgay"), "Date không được để trống!") && valid.dateFormat(ngayLam, getELE("tbNgay"), "Không hợp lệ");
    
    isValid &= valid.checkEmpt(luongCB, getELE("tbLuongCB"), "Lương cơ bản không được để trống!") && valid.checkValue(luongCB, getELE("tbLuongCB"), "Sai mức lương cơ bản", 10, 20);

    isValid &= valid.checkEmpt(gioLam, getELE("tbGiolam"), "Giờ làm không được để trống!") && valid.checkLength(gioLam, getELE("tbGiolam"), "Sai mức giờ làm cơ bản", 80, );

    if (isValid) {
        var nv = new NhanVien (taiKhoan, hoTen, matKhau, email, ngayLam, luongCB, chucVu, gioLam);
        nv.tongLuong(nv.chucVu, nv.luongCB);
        nv.phanLoaiNV(gioLam);
    
        nvService.updateInfo(nv, id).then(function(){
            getDSNV();
        }).catch(function(result){
            console.log(result);
        });
    }
}

function infoNV (id) {
    var modalCapNhatbtn = document.querySelector("#myModal #modal-footer");
    modalCapNhatbtn.innerHTML = `<button type="button" class="btn btn-success" onclick="capNhat('${id}')">Cập nhật</button>
    
    <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>`;
    var clearContent = "";

    getELE("tbTKNV").innerHTML = clearContent;
    getELE("tbTen").innerHTML = clearContent;
    getELE("tbMatKhau").innerHTML = clearContent;
    getELE("tbEmail").innerHTML = clearContent;
    getELE("tbNgay").innerHTML = clearContent;
    getELE("tbLuongCB").innerHTML = clearContent;
    getELE("tbGiolam").innerHTML = clearContent;
    getELE("tbChucVu").innerHTML = clearContent;

    nvService.getInfo(id).then(function(result){
        getELE("tknv").value = result.data.taiKhoan;
        getELE("name").value = result.data.hoTen;
        getELE("password").value = result.data.matKhau;
        getELE("email").value = result.data.email;
        getELE("datepicker").value = result.data.ngayLam;
        getELE("luongCB").value = result.data.luongCB;
        getELE("chucvu").value = result.data.chucVu;
        getELE("gioLam").value = result.data.gioLam;
    }).catch(function(error){
        console.log(error);
    }); 
}

function modalFormatThemNV () {
    var modalCapNhatbtn = document.querySelector("#myModal #modal-footer");
    modalCapNhatbtn.innerHTML = `<button id="btnThemNV" type="button" class="btn btn-success" onclick="themNV()">Thêm nhân viên</button>
    <button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>`;

    var clearContent = "";
    
    getELE("tknv").value = clearContent;
    getELE("name").value = clearContent;
    getELE("password").value = clearContent;
    getELE("email").value = clearContent;
    getELE("datepicker").value = clearContent;
    getELE("luongCB").value = clearContent;
    getELE("chucvu").value = "Chọn chức vụ";
    getELE("gioLam").value = clearContent;

    getELE("tbTKNV").innerHTML = clearContent;
    getELE("tbTen").innerHTML = clearContent;
    getELE("tbMatKhau").innerHTML = clearContent;
    getELE("tbEmail").innerHTML = clearContent;
    getELE("tbNgay").innerHTML = clearContent;
    getELE("tbLuongCB").innerHTML = clearContent;
    // getELE("chucvu").innerHTML = clearContent;
    getELE("tbGiolam").innerHTML = clearContent;
    getELE("tbChucVu").innerHTML = clearContent;

}   
// Hàm hiển thị
function hienThi (mangDS) {
    var tbody = getELE("tableDanhSach");
    var content = "";

    mangDS.map(function(item){
        // Loop từng phần từ trong một mảng, có giá trị cần lấy => sẽ lấy hết tất cả giá trị đó trong mỗi mảng xuất lên UI
        content += `
        <tr> 
            <td>${item.taiKhoan}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngayLam}</td>
            <td>${item.chucVu}</td>
            <td>${item.tongLuong}</td>
            <td>${item.loaiNV}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="delNV('${item.id}')">Xóa</button>
                <button type="button" class="btn btn-success" onclick="infoNV('${item.id}')" data-toggle="modal"
                data-target="#myModal">Cập nhật</button>
            </td>
            </td>
        </tr>
        `
    });
    tbody.innerHTML = content;
}

function themNV () {
    var taiKhoan = getELE("tknv").value;
    var hoTen = getELE("name").value;
    var matKhau = getELE("password").value;
    var email = getELE("email").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;
    // var loaiNV = "";
            // if (chucVu === "Nhân viên") {
            //     tongLuong = luongCB;
            // } else if (chucVu === "Trưởng phòng") {
            //     tongLuong = luongCB*2;
            // } else {
            //     tongLuong = luongCB*3;
            // };

    var isValid = true;

    isValid &= valid.checkEmpt(taiKhoan, getELE("tbTKNV"), "Tài khoản không được để trống!") && valid.checkLength(taiKhoan, getELE("tbTKNV"), "Tài khoản: 4-6 ký tự (bao gồm số)", 4, 6);

    isValid &= valid.checkEmpt(hoTen, getELE("tbTen"), "Họ tên không được để trống!") && valid.checkLetters(hoTen, getELE("tbTen"), "Họ tên chỉ có chữ!");

    isValid &= valid.checkEmpt(email, getELE("tbEmail"), "Email không được để trống!") && valid.emailCheck(email, getELE("tbEmail"), "Email không hợp lệ");

    isValid &= valid.checkEmpt(matKhau, getELE("tbMatKhau"), "Mật khẩu không được để trống!") && valid.checkLength(matKhau, getELE("tbMatKhau"), "Độ dài ký tự: 6-10", 6, 10);

    isValid &= valid.checkEmpt(ngayLam, getELE("tbNgay"), "Date không được để trống!") && valid.dateFormat(ngayLam, getELE("tbNgay"), "Không hợp lệ");
    
    isValid &= valid.checkEmpt(luongCB, getELE("tbLuongCB"), "Lương cơ bản không được để trống!") && valid.checkValue(luongCB, getELE("tbLuongCB"), "Sai mức lương cơ bản: 100.000 - 10.000.000VND", 100000, 10000000);

    isValid &= valid.checkEmpt(gioLam, getELE("tbGiolam"), "Giờ làm không được để trống!") && valid.checkLength(gioLam, getELE("tbGiolam"), "Sai mức giờ làm cơ bản", 80, null);

    if (isValid) {
        // đã gọi truyền dữ liệu vào 9 tham số
        var nv = new NhanVien (taiKhoan, hoTen, matKhau, email, ngayLam, luongCB, chucVu, gioLam);
        // var tongLuong = nv.tongLuong(nv.chucVu, nv.luongCB);
        // tham số thứ 10 được gọi riêng vì nó nằm  trong một phương thức cần truyền tham số
        nv.tongLuong(nv.chucVu, nv.luongCB); // tongLuong được lấy dữ liệu (kết quả của phương thức)
        // result.data <=> result.nv.tongLuong()
        // post: đẩy một mảng nv vào dữ liệu JSON
        // get: lấy tất cả đối tượng trong mảng trả ra kết quả => chạy hàm hiển thị
        nv.phanLoaiNV(gioLam);
        nvService.themNV(nv).then(function(result){
            getDSNV();
        }).catch(function(error){
            console.log(error);
        });
    }
}