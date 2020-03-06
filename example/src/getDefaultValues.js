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
        case "array":
          let newArray = setValue([], { ...item.subfield, path: "0" })
          newArray = setValue(newArray, { ...item.subfield, path: "1" })
          newArray = setValue(newArray, { ...item.subfield, path: "2" })
          set(obj, item.path, newArray)
          console.log(newArray, obj)
          break;
        case "select":
          set(obj, item.path, item.choice[0] && item.choice[0].category ? null : randomArrayItem(item.choice))
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
