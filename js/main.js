/* 
cách chia folder
Chia nhỏ code --> tìm dễ

    folder Model --> Lớp đối tượng
      SinhVien
      ValidatorSV
    folder Controller --> xử lý logic

    file main.js để xử lý chung của file, lưu ý khi nhúng vào html theo thứ tự trên xuống để máy đọc hiểu hết các dòng.



file main.js
  luồng xử lý: 

    Để xóa trong local, thì không vào local tìm id để xóa, mà xóa từ đoạn array sau lưu lại về local, và lấy lại local, khi đó local đã xóa cái cần xóa rồi

*/

var danhSachSinhVien = [];
var validatorSV = new ValidatorSV();

var DSSV_LOCALSTORAGE = "DSSV_LOCALSTORAGE";

//hàm tìm kiếm: truyền vào id(Mã số sinh viên) và array(danhsachSinhVien), trả về vị trí lưu id đó. hàm tìm kiếm này để xóa và validate trùng
var timKiemViTri = function (id, array) {
  return array.findIndex(function (sv) {
    //return về vị trí đầu tiên nơi mà sv.maSV trùng với id
    return sv.maSV === id;
  });
};

//hàm lưu vào local, sẽ chạy khi thêm xong sinh viên và xóa sinh viên. thêm sinh viên --> danhSachSinhVien thay đổi, xóa sinh viên -->danhSachSinhVien thay đổi
const luuLocalStorage = function () {
  //convert array to json để lưu vào local storage, hàm JSON.stringify() dùng để convert Array to JSON và lưu vào biến dssvJson
  var dssvJson = JSON.stringify(danhSachSinhVien);

  //xong lưu vào local với tên:DSSV_LOCALSTORAGE dùng setItem('tên của nơi lưu trữ', dữ liệu lưu trữ)
  localStorage.setItem(DSSV_LOCALSTORAGE, dssvJson);
  // console.log("dssv", dssvJson); //mảng dssvJson
};

//  Lấy dữ liệu từ local khi user tải lại trang
var dssvJason = localStorage.getItem(DSSV_LOCALSTORAGE);

//nếu dssvJason = false; không chạy đoạn code dưới
if (dssvJason) {
  //gán cho array gốc và render lại giao diện. hàm parse() dùng để convert chuỗi JSON --> Array
  danhSachSinhVien = JSON.parse(dssvJason);
  //chạy lại hàm xuatDanhSachSinhVien() để đưa thông tin vào bảng
  xuatDanhSachSinhVien(danhSachSinhVien);
}

function themSinhVien() {
  var newSinhVien = layThongTinTuForm(); //tạo một sinh viên mới
  var isValid = true;

  //validate findIndex để không nhập 2 sinh viên có cùng mã sinh viên
  var index = danhSachSinhVien.findIndex(function (item) {
    return item.maSV == newSinhVien.maSV;
  });
  // console.log({ index });
  var isValidMaSV =
    validatorSV.kiemTraRong(
      "txtMaSV",
      "spanMaSV",
      "Mã sinh viên không được rỗng"
    ) && validatorSV.kiemTraIdHopLe(newSinhVien, danhSachSinhVien);

  var isValidEmail = validatorSV.kiemTraRong(
    "txtEmail",
    "spanEmailSV",
    "Email không được rỗng"
  );
  //Kiểm tra trường nhập vào cỗ rỗng hay không? main/validator -> lớp ValidatorSV -> kiemTraRong()

  /*   isValid =
    validatorSV.kiemTraIdHopLe(newSinhVien, danhSachSinhVien) &
    validatorSV.kiemTraRong(
      "txtEmail",
      "spanEmailSV",
      "Email không được rỗng"
    ) &
    validatorSV.kiemTraRong(
      "txtMaSV",
      "spanMaSV",
      "Mã sinh viên không được rỗng"
    ) &
    validatorSV.kiemTraRong(
      "txtTenSV",
      "spanTenSV",
      "Tên sinh viên không được rỗng"
    );
  console.log({ isValid }); */

  /* findIndex tra ve -1 neu khong phat hien trung
    Array.prototype.findIndex()
        The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
  Như vậy, nếu index = -1 là trong mảng không có đối tượng trùng trước đó --> if index = -1 là ok điều kiện dưới*/
  if (index == -1) {
    //Lưu sinh viên mới được tạo vào mảng đã tạo trước đó
    danhSachSinhVien.push(newSinhVien);
    // console.log(danhSachSinhVien);

    //lưu vào local sau khi nhập vào danhSachSV
    luuLocalStorage();

    //xuất danhSachSinhVien vào bảng
    xuatDanhSachSinhVien(danhSachSinhVien);
  }
}

function xoaSinhVien(id) {
  //ý tưởng: tìm id sinh viên cần xóa sau đó dùng splice để xóa ngay vị trí trí tìm thấy. lấy id từ onclick="xoaSinhVien('${sinhVien.maSV}'). ${sinhVien.maSV} này là dữ liệu sẵn

  // console.log("id", id);

  var viTri = timKiemViTri(id, danhSachSinhVien);
  // console.log({ viTri });

  //xóa tại vị trí tìm thấy với số lượng là 1
  danhSachSinhVien.splice(viTri, 1);
  xuatDanhSachSinhVien(danhSachSinhVien);

  //lưu lại danhsachSinhVien vào local để load lại thì mảng đã xóa sinh viên rồi
  luuLocalStorage();
}

function suaSinhVien(id) {
  var viTri = timKiemViTri(id, danhSachSinhVien);
  // console.log("viTri", viTri);

  var sinhVien = danhSachSinhVien[viTri];
  xuatThongTinLenForm(sinhVien);
}

function capNhatSinhVien() {
  var sinhVienEdit = layThongTinTuForm();
  console.log("sinhVienEdit", sinhVienEdit);
  //tìm vị trí sinh viên đã sửa
  var vitri = timKiemViTri(sinhVienEdit.maSV, danhSachSinhVien);

  //cập nhật sinh viên edit vào danhSachSinhVien
  danhSachSinhVien[vitri] = sinhVienEdit;

  //in lại xuống bảng
  xuatDanhSachSinhVien(danhSachSinhVien);

  //lưu lại trên local
  luuLocalStorage();
}
