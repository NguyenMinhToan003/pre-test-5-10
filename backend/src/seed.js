const { CONNECT_DB, CLOSE_DB } = require('./config/db');
const { startOfISOWeek, endOfISOWeek, addDays, subWeeks } = require('date-fns');
const Revenue = require('./models/Revenue');
const { hashPassword } = require('./utils/password');
const User = require('./models/User');

async function seedRevenue() {
  try {
    await CONNECT_DB();

    console.log("Using DB:", Revenue.db.name);

    // Xoá dữ liệu cũ
    await Revenue.deleteMany({});

    const today = new Date();

    // Tính ngày đầu và cuối của tuần hiện tại và tuần trước
    const startCurrent = startOfISOWeek(today);
    const startPrev = startOfISOWeek(subWeeks(today, 1));

    const sources = ["POS", "EATCLUB", "LABOUR"];
    const docs = [];

    // Helper random amount
    const randomAmount = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // ✅ Seed tuần hiện tại
    for (let i = 0; i < 7; i++) {
      const date = addDays(startCurrent, i);
      sources.forEach(source => {
        docs.push({
          amount: randomAmount(100, 500),
          source,
          date
        });
      });
    }

    // ✅ Seed tuần trước
    for (let i = 0; i < 7; i++) {
      const date = addDays(startPrev, i);
      sources.forEach(source => {
        docs.push({
          amount: randomAmount(100, 500),
          source,
          date
        });
      });
    }

    // Ghi vào DB
    await Revenue.insertMany(docs);
    console.log(`✅ Đã seed ${docs.length} records vào Revenue`);
    await User.deleteMany({});
    await User.create({
      email: 'admin@mail.com',
      name: 'admin',
      password: await hashPassword('1234'),
      role: 'admin'
    });

    await User.create({
      email: 'user@mail.com',
      name: 'user',
      password: await hashPassword('1234'),
      role: 'user'
    });


  } catch (err) {
    console.error("❌ Lỗi seed:", err);
  } finally {
    await CLOSE_DB();
  }
}

seedRevenue();
