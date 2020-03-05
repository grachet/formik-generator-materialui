import get from "lodash.get";

export const last = (arr) => arr && arr[arr.length - 1];

export const getDisplayValue = (fieldData, values) => {
  return fieldData.display.map(displayItem => {
    if (displayItem && displayItem.path) {
      let newValue = values[last(displayItem.path)]
      if (displayItem.transformation) {
        newValue = displayItem.transformation(newValue);
      }
      return newValue
    } else if (displayItem || displayItem === 0) {
      return displayItem
    } else {
      return ""
    }
  }).join(fieldData.separator || "");
}

export const addValues = (fieldData, values) => {
  let newField = { ...fieldData };
  if (fieldData.typeField === "group") {
    newField.subfields = newField.subfields.map(subfieldData => {
      return addValues(subfieldData, values)
    })
  } else if (fieldData.typeField === "displayValue") {
    newField.value = getDisplayValue(fieldData, values);
  } else {
    newField.value = values[last(fieldData.path)];
  }
  return newField
};

export const getValidationSchema = (fields) =>
  fields.reduce((obj, item) => {
    let yup = item.yup;
    if (item.typeField === "group") {
      for (let sub1 of item.subfields) {
        if (sub1.typeField === "group") {
          for (let sub2 of sub1.subfields) {
            if (sub2.yup) {
              obj[last(sub2.path)] = sub2.yup;
            }
          }
        } else {
          if (sub1.yup) {
            obj[last(sub1.path)] = sub1.yup
          }
        }
      }
    } else if (yup) {
      obj[last(item.path)] = yup;
    }
    return obj
  }, {});

// export const getInitialValues = (fieldsData, initialValues) => {

//   console.log(fieldsData, initialValues)

//   let setValue = (field) => {
//     if (field.typeField === "group") {
//       getValue
//     } else {
//       get(initialValues, sub2.path)
//     }
//   }

//   return fieldsData.map((fields) => fields.reduce((obj, item) => {
//     obj[last(sub2.path)] = setValue(fields)
//     return obj
//   }, {}))


//   fieldsData.reduce((obj, item) => {
//     if (item.typeField === "group") {
//       for (let sub1 of item.subfields) {
//         if (sub1.typeField === "group") {
//           for (let sub2 of sub1.subfields) {
//             obj[last(sub2.path)] = get(initialValues, sub2.path) || (/*sub2.typeField === "select" ? sub2.choice[0] : */(get(initialValues, sub2.path) === 0 ? 0 : ""))
//           }
//         } else {
//           obj[last(sub1.path)] = get(initialValues, sub1.path) || (/*sub1.typeField === "select" ? sub1.choice[0] : */ (get(initialValues, sub1.path) === 0 ? 0 : ""))
//         }
//       }
//     } else {
//       obj[last(item.path)] = get(initialValues, item.path) || (/*item.typeField === "select" ? item.choice[0] :*/  (get(initialValues, item.path) === 0 ? 0 : ""))
//     }
//     return obj

//   }, {});
// }
