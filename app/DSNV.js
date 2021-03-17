function NhanVienServices () {
    // Phương thức lấy danh sách người dùng
    this.layDS = function (){
        var promise = axios({
            method: 'get',
            url: 'https://5fd0d27f1f2374001663242a.mockapi.io/NhanVien',
            // Lấy dữ liệu không cần gọi data
          });
        return promise;
    }

    this.themNV = function (nv){
        var promise = axios({
            method: 'post',
            url: 'https://5fd0d27f1f2374001663242a.mockapi.io/NhanVien',
            data: nv,
        });
        return promise;
    }

    this.xoaNV = function (id) {
        var promise = axios({
            method: 'delete',
            url: `https://5fd0d27f1f2374001663242a.mockapi.io/NhanVien/${id}`,
        });
        return promise;
    }

    this.getInfo = function (id) {
        var promise = axios({
            method: 'get',
            url: `https://5fd0d27f1f2374001663242a.mockapi.io/NhanVien/${id}`,
        });
        return promise;
    }

    this.updateInfo = function (nv, id) {
        var promise = axios({
            method: 'put',
            url: `https://5fd0d27f1f2374001663242a.mockapi.io/NhanVien/${id}`,
            data: nv
        });
        return promise;
    }
}