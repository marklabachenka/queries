import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { createSchema } from "./schema";
import { getOverduePendingOrders } from "./queries/order_queries";
import { sendSlackMessage } from "./slack";

async function main() {
  const db = await open({
    filename: "ecommerce.db",
    driver: sqlite3.Database,
  });

  await createSchema(db, false);

  const overdueOrders = await getOverduePendingOrders(db, 3);

  for (const order of overdueOrders) {
    const customerName = `${order.customer_first_name} ${order.customer_last_name}`;
    const phone = order.customer_phone ?? "no phone on file";
    const text =
      `*Pending order alert:* Order \`${order.order_number}\` has been pending for ` +
      `${order.days_pending} day(s).\n` +
      `Customer: ${customerName} | Phone: ${phone}`;

    await sendSlackMessage("#order-alerts", text);
  }
}

main();
