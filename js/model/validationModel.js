/* Ý tưởng:

    tạo 1 đối tượng kiểm tra riêng, nơi các phương thức sẽ xử lý việc kiểm tra dữ liệu nhập vào của đối tượng.

        kiểm tra rỗng: kiểm tra id của input -> lấy id của span -> nhập thông tin message vào span.innerText
        trả về false/true

*/

function ValidatorSV() {
  this.kiemTraRong = function (idTarget, idError, messageError) {
    var valueTarget = document.getElementById(idTarget).value.trim();
    // console.log({valueTarget});

    /* valueTarget == "" <=> valueTarget == false (false ="") --> !valueTarget = true */
    if (!valueTarget) {
      document.getElementById(idError).innerText = messageError;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  };
  this.kiemTraIdHopLe = function (newSinhVien, danhSachSinhVien) {
    var index = danhSachSinhVien.findIndex(function (item) {
      return item.maSV == newSinhVien.maSV;
    });
    
    if (index == -1) {
      document.getElementById("spanMaSV").innerHTML = "";
      return true;
    }
    document.getElementById(
      "spanMaSV"
    ).innerHTML = `Mã sinh viên đã tồn tại, vui lòng nhập lại`;
    return false;
  };
}
