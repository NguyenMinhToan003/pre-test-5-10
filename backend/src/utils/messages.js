// Format Joi validation errors
function formatJoiErrors(error) {
  return error.details.map((detail) => {
    return {
      field: detail.path.join('.'), // tên field bị lỗi
      message: detail.message       // thông báo mặc định của Joi
    };
  });
}

module.exports = { formatJoiErrors };
