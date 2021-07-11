const { CoreApi } = require("midtrans-client");
const { v4: uuidv4 } = require("uuid");
const config = {
  isProduction: process.env.MIDTRANS_ENV == "production",
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_ID,
};
const MidtransService = new CoreApi(config);

const freeTextBCA = (package) => {
  return {
    inquiry: [
      {
        id: `paket ${package} Comika Media`,
        en: `${package} plan Comika Media`,
      },
    ],
    payment: [
      {
        id: `Paket ${package} berhasil`,
        en: `${package} plan successful`,
      },
    ],
  };
};

const payloadSpesialmethod = (method, payload, package) => {
  switch (method) {
    case "bca":
      payload.bank_transfer.free_text = freeTextBCA(package);
      break;
    case "permata":
      payload.payment_type = "permata";
      payload.bank_transfer.permata = { recipient_name: payload.customer_details.first_name };
      break;
    case "mandiri":
      delete payload.bank_transfer;
      payload.payment_type = "echannel";
      payload.echannel = {
        bill_info1: "For:",
        bill_info2: listPackage[package].name,
      };
      break;
    case "gopay":
      delete payload.bank_transfer;
      payload.payment_type = "gopay";
      payload.gopay = {
        enable_callback: true,
        callback_url: process.env.WEB_FE,
      };
      break;
    default:
      break;
  }
  console.log(payload);
  return payload;
};

const listPackage = {
  yearly: {
    id: 1,
    price: 356000,
    quantity: 1,
    name: "yearly plan",
  },
  monthly: {
    id: 2,
    price: 30000,
    quantity: 1,
    name: "monthly plan",
  },
  weekly: {
    id: 3,
    price: 7000,
    quantity: 1,
    name: "weekly plan",
  },
};

const setParametersInvoice = async ({
  method = "bca",
  paymentType = "bank_transfer",
  customerDetails,
  package = "weekly",
}) => {
  let payload = {
    payment_type: paymentType,
    transaction_details: {
      gross_amount: listPackage[package].price,
      order_id: uuidv4(),
    },
    bank_transfer: {
      bank: method,
    },
    item_details: listPackage[package],
    customer_details: customerDetails,
  };

  payload = payloadSpesialmethod(method, payload, package);
  return payload;
};

const setResponse = (method, response) => {
  const template = {
    transaction_id: response.transaction_id,
    order_id: response.order_id,
    gross_amount: response.gross_amount,
  };
  switch (method) {
    case "permata":
      template.virtual_account = response.permata_va_number;
      template.method = "permata";
      break;
    case "mandiri":
      template.method = "mandiri";
      template.virtual_account = null;
      template.mandiri = {
        bill_key: response.bill_key,
        biller_code: response.biller_code,
      };
      break;
    case "gopay":
      template.method = "gopay";
      template.virtual_account = null;
      template.gopay = response.actions;
      break;
    default:
      template.virtual_account = response.va_numbers[0].va_number;
      template.method = response.va_numbers[0].bank;
      break;
  }
  return template;
};
module.exports = async (
  options = {
    method,
    paymentType,
    customerDetails,
    package,
  }
) => {
  const params = await setParametersInvoice(options);
  const requestMidtrans = await MidtransService.charge(params);
  return setResponse(options.method, requestMidtrans);
};
