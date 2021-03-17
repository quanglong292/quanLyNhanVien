function NhanVien (_taiKhoan, _hoTen, _matKhau, _email, _ngayLam, _luongCB, _chucVu, _gioLam, _loaiNV) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.matKhau = _matKhau;
    this.email = _email;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.loaiNV = "";

    this.tongLuong = function (chucVu, luongCB) {
        if (chucVu.trim() === "Nhân viên") {
            // Biến tổng lương vẫn được có thể tạo trong if ?
            this.tongLuong = luongCB;
        } else if (chucVu.trim() === "Trưởng phòng") {
            this.tongLuong = luongCB*2;
        } else {
            this.tongLuong = luongCB*3;
        }
        // return tongLuong;
    }

    this.phanLoaiNV = function (gio) {
        if (gio < 160) {
            this.loaiNV = "Trung bình";
        } else if (gio >= 160 && gio < 176) {
            this.loaiNV = "Khá";
        } else if (gio >= 176 && gio < 192) {
            this.loaiNV = "Giỏi";
        } else {
            this.loaiNV = "Xuất sắc";
        }
    }
}