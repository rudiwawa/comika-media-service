exports.setRupiah = (nominal) => {
  nominal -= 0;
  let positive = true;
  if (parseFloat(nominal) < 0) {
    positive = false;
    nominal = parseFloat(nominal) * -1;
  }
  let number_string = nominal.toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    const separator = sisa ? "," : "";
    rupiah += separator + ribuan.join(",");
  }
  rupiah = split[1] ? rupiah + "," + split[1] : rupiah;
  if (positive) return "Rp " + rupiah;
  return "-Rp " + rupiah;
};

const getRupiah = (rupiah = 0) => {
  let angka = rupiah.replace("Rp ", "").replace(/\./g, "").replace(/\-/g, "");
  if (rupiah.substr(0, 1) == "-") return angka * -1;
  return (angka -= 0);
};
