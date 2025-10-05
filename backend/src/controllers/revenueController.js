const Revenue = require("../models/Revenue");
const { startOfISOWeek, endOfISOWeek, subWeeks } = require("date-fns");

const create = async (req, res) => {
  try {
    const { amount, source, date } = req.body;

    const newRevenue = new Revenue({
      amount,
      source,
      date
    });
    await newRevenue.save();

    return res.status(201).json({
      message: "Revenue record created successfully",
      revenue: newRevenue
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const dashboard = async (req, res) => {
  try {
    const { date } = req.query; 

    let start, end;
    const today = date ? new Date(date) : new Date();
    start = startOfISOWeek(today);
    end = endOfISOWeek(today);

    const weeklyData = await Revenue.aggregate([
      {
        $match: {
          date: { $gte: start, $lte: end }
        }
      },
      {
        $project: {
          dayOfWeek: { $isoDayOfWeek: "$date" },
          amount: 1,
          source: 1
        }
      },
      {
        $group: {
          _id: { dayOfWeek: "$dayOfWeek", source: "$source" },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.dayOfWeek",
          revenue: {
            $push: { k: "$_id.source", v: "$total" }
          }
        }
      },
      {
        $addFields: {
          revenue: { $arrayToObject: "$revenue" }
        }
      },
      {
        $project: {
          _id: 0,
          dayOfWeek: "$_id",
          pos: "$revenue.POS",
          eatclub: "$revenue.EATCLUB",
          labour: "$revenue.LABOUR"
        }
      },
      { $sort: { dayOfWeek: 1 } }
    ]);
    const prevWeeklyData = await Revenue.aggregate([
      {
        $match: {
          date: { $gte: subWeeks(start, 1), $lte: subWeeks(end, 1) }
        }
      },
      {
        $project: {
          dayOfWeek: { $isoDayOfWeek: "$date" },
          amount: 1,
          source: 1
        }
      },
      {
        $group: {
          _id: { dayOfWeek: "$dayOfWeek", source: "$source" },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.dayOfWeek",
          revenue: {
            $push: { k: "$_id.source", v: "$total" }
          }
        }
      },
      {
        $addFields: {
          revenue: { $arrayToObject: "$revenue" }
        }
      },
      {
        $project: {
          _id: 0,
          dayOfWeek: "$_id",
          pos: "$revenue.POS",
          eatclub: "$revenue.EATCLUB",
          labour: "$revenue.LABOUR"
        }
      },
      { $sort: { dayOfWeek: 1 } }
    ]);

    return res.status(200).json({
      start,
      end,
      weeklyData,
      prevWeeklyData
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const revenues = await Revenue.find().sort({ date: -1 });
    return res.status(200).json({ revenues });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, source, date } = req.body;
    const revenue = await Revenue.findById(id);
    if (!revenue) {
      return res.status(404).json({ message: "Revenue record not found" });
    }
    if (amount !== undefined) revenue.amount = amount;
    if (source !== undefined) revenue.source = source;
    if (date !== undefined) revenue.date = date;
    await revenue.save();
    return res.status(200).json({ message: "Revenue record updated", revenue });
  } 
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const deleteFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const revenue = await Revenue.findById(id);
    if (!revenue) {
      return res.status(404).json({ message: "Revenue record not found" });
    }
    await revenue.remove();
    return res.status(200).json({ message: "Revenue record deleted" });
  }
  catch(error){
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  create,
  dashboard,
  getAll,
  update,
  deleteFunc
};
