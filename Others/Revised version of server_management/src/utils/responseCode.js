function genResponses(_res, _code, _msg, _data = null) {
  const resp = {
    respcode: _code.toString(),
    respdesc: _msg.toString(),
    data: _data,
  };
  return _res.status(_code).json(resp);
}

export default genResponses;
