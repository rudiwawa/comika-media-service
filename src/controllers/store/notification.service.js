const sendEmail = require("../../services/sendEmail");
const { setRupiah } = require("../../helpers/currency");
const template = (products, link) => {
  let qty = 0;
  let total = 0;
  return `<p>Halo sahabat comika, kamu pasti udah gak sabar ya buat dapat barang favoritmu dari <b>Comika Store</b> ? benerkan ini barang yang kamu pengen</p>
    <div style="display:flex;justify-content:center">
        <table border="1" width="100%" style="text-align: center;">
            <thead>
                <th width="5%">No.</th>
                <th style="text-align: left;">Keterangan</th>
                <th width="10%">Qty</th>
                <th width="20%">Harga</th>
                <th width="25%">Total</th>
            </thead>
            <tbody>
                ${products.map((item, i) => {
                  qty += Number(item.qty);
                  total += Number(item.qty * item.price);
                  return `<tr>
                                <td>${i + 1}</td>
                                <td style="text-align: left;">${item.name}</td>
                                <td>${item.qty}</td>
                                <td style="text-align: right;">${setRupiah(item.price)}</td>
                                <td style="text-align: right;">${setRupiah(item.qty * item.price)}</td>
                            </tr>`;
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" style="text-align: right;"><b>Total</b></td>
                    <td><b>${qty}</b></td>
                    <td colspan="2" style="text-align: right;"><b>${setRupiah(total)}</b></td>
                </tr>
            </tfoot>
        </table>
    </div>
    <center>
        <p>Pembayarannya bisa klik tombol berikut
            <br>
            <br>
            <a href="${link}" target="_blank" class="btn">LINK INI</a>
            <br>
            <br>
            atau <a href="${link}" target="_blank">${link}</a>
        </p>
    </center>`;
};

module.exports = (to, products, link) => {
  const body = template(products, link);
  sendEmail(to, "INVOICE STORE", body);
};
