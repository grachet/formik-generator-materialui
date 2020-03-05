

export default (fieldsArray, noValues) => {

  if (noValues) {
    return fieldsArray.map(a => { })
  }

  return fieldsArray.map((fields) => {
    return fields.reduce((obj, item) => {
      obj[last(item.path)] = randomString(10);
      return obj
    }, {})
  })
}

function randomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const last = (arr) => arr && arr[arr.length - 1];
