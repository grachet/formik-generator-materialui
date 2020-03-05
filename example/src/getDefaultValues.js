

export default (fieldsArray, noValues) => {

  if (noValues) {
    return fieldsArray.map(a => ({}))
  }

  return fieldsArray.map((fields) => fields.reduce((obj, item) => {
    switch (item.typeField) {
      //todo not last
      case "text":
        obj[last(item.path)] = randomString(10);
        break;
      case "checkbox":
      case "switch":
        obj[last(item.path)] = randomBoolean();
        break;
      default:
        obj[last(item.path)] = null;
    }
    return obj
  }, {}))
}

function randomBoolean() {
  return Math.random() >= 0.5;
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
