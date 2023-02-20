const sendEmail = require("../../services/sendEmail");
const notification = require("../../services/sendNotification");
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
                  item = item.dataValues;
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
            <a href="${link}" target="_blank" class="btn" style="background-color: #0265b6;height: 50px; padding: 10px 20px;color: white;border-radius: 4px;">LINK INI</a>
            <br>
            <br>
            atau <a href="${link}" target="_blank">${link}</a>
        </p>
    </center>`;
};

module.exports = (user, products, link, dataOrder) => {
  //   const body = template(products, link);
  //   sendEmail(user.email, "INVOICE STORE", null);
  const description = generateDescription(dataOrder);
  const img = "https://api.comika.media/uploads/comika/checkout.png";
  notification.create(user.id, "INVOICE STORE", description, img, dataOrder.id);
};

const generateDescription = (dataOrder) => {
  return `Segera selesaikan transaksi ${dataOrder.code} senilai ${setRupiah(
    dataOrder.price
  )} dan dapatkan keseruan lainnya.`;
};
