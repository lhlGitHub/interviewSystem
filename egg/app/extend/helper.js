module.exports = {
  res: ({code=200, message='请求成功', data = null}) => {
    console.log('res',data)
    return {
      code,
      message,
      data,
    };
  },
};
