const ids = {
  order: "NwAgiWiN6CrTtgzrS5Ck",
  payment: "igxZPqX9tcHP0Xl6cJk4",
  purchase: "mock1234",
};

export const user = {
  email: "test@mail.com",
  fullname: "Satoshi Nakamoto",
};

export const order = {
  _id: ids.order,
  createdAt: "2019-01-01T00:00:00.000Z",
  paymentId: ids.payment,
  purchaseId: ids.purchase,
  status: "completed",
  user: user,
};

export const payment = {
  _id: ids.payment,
  amount: 2000,
  createdAt: "2019-01-01T00:00:00.000Z",
  method: "mercadopago",
  orderId: ids.order,
  preference_id: "1214914114-9c036983-8928-42f5-acd4-14fcffbcb20f",
  status: "waiting",
};

export const purchase = {
  _id: ids.purchase,
  status: "ready",
  user,
  order,
  payment,
};

const fixture = {
  orders: [order],
  payments: [payment],
  purchases: [purchase],
};

export default fixture;
