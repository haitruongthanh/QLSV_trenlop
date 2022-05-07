function layThongTinTuForm() {
  var maSV = document.getElementById("txtMaSV").value;
  var tenSV = document.getElementById("txtTenSV").value;
  var emailSV = document.getElementById("txtEmail").value;
  var toan = document.getElementById("txtDiemToan").value * 1;
  var ly = document.getElementById("txtDiemLy").value * 1;
  var hoa = document.getElementById("txtDiemHoa").value * 1;

  var sinhVien = new SinhVien(maSV, tenSV, emailSV, toan, ly, hoa);

  return sinhVien;
}

function xuatDanhSachSinhVien(dssv) {
  var contentHTML = "";
  for (var i = 0; i < dssv.length; i++) {
    var sinhVien = dssv[i];
    var contentTrTag = /* html */ `
        <tr>
        <td>${sinhVien.maSV}</td>
        <td>${sinhVien.tenSV}</td>
        <td>${sinhVien.email}</td>
        <td>0</td>
        <td>
        <button type="button" class="btn btn-success" onclick="suaSinhVien('${sinhVien.maSV}')">Sửa</button>
        <button type="button" class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSV}')">Xóa</button>
        </td>
        
        `;
        contentHTML += contentTrTag
  }
  document.getElementById('tbodySinhVien').innerHTML = contentHTML;
}

function xuatThongTinLenForm(sv) {
  document.getElementById('txtMaSV').value = sv.maSV;
  document.getElementById('txtTenSV').value = sv.tenSV;
  document.getElementById('txtEmail').value = sv.email;
  document.getElementById('txtDiemToan').value = sv.diemToan;
  document.getElementById('txtDiemLy').value = sv.diemLy;
  document.getElementById('txtDiemHoa').value = sv.diemHoa;
}
