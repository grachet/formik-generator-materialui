import set from "lodash.set"

export default (fieldsArray, noValues) => {

  if (noValues) {
    return fieldsArray.map(a => ({}))
  }

  return fieldsArray.map((fields) => fields.reduce((obj, item) => {

    let setValue = (obj, item) => {
      switch (item.typeField) {
        //todo not last
        case "text":
          set(obj, item.path, randomString(10))
          break;
        case "checkbox":
        case "switch":
          set(obj, item.path, randomBoolean())
          break;
        case "date":
          set(obj, item.path, randomDate())
          break;
        case "group":
          item.subfields.forEach(sub => {
            obj = setValue(obj, sub)
          });
          break;
        case "richTextEditor":
          set(obj, item.path, randomRTE())
          break;
        case "array":
          obj = setValue(obj, { ...item.subfield, path: item.path + ".0" })
          obj = setValue(obj, { ...item.subfield, path: item.path + ".1" })
          obj = setValue(obj, { ...item.subfield, path: item.path + ".2" })
          break;
        case "arrayObject":
          [0, 1].forEach(i => {
            item.subfields.forEach(subfield => {
              obj = setValue(obj, { ...subfield, path: item.path + "." + i + "." + subfield.name })
            })
          });
          break;
        case "select":
          set(obj, item.path, item.choice[0] && item.choice[0].category ? null : randomArrayItem(item.choice))
          break;
        case "autocomplete":
          set(obj, item.path, item.freeSolo ? randomString(10) : randomArrayItem(item.options))
          break;
        case "asyncAutocomplete":
          set(obj, item.path, item.freeSolo ? randomString(10) : null)
          break;
        default:
          set(obj, item.path, null)
      }
      return obj
    }
    return setValue(obj, item)
  }, {}))
}

function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomRTE() {
  return "{\"blocks\":[{\"key\":\"cfbbd\",\"text\":\"" + randomString(20) + "\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
}

function randomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)]
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
