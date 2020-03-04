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

export const getInitialValues = (fieldsNames, data) =>
  fieldsNames.reduce((obj, item) => {

    if (item.typeField === "group") {
      for (let sub1 of item.subfields) {
        if (sub1.typeField === "group") {
          for (let sub2 of sub1.subfields) {
            obj[last(sub2.path)] = get(data, sub2.path) || (/*sub2.typeField === "select" ? sub2.choice[0] : */(get(data, sub2.path) === 0 ? 0 : ""))
          }
        } else {
          obj[last(sub1.path)] = get(data, sub1.path) || (/*sub1.typeField === "select" ? sub1.choice[0] : */ (get(data, sub1.path) === 0 ? 0 : ""))
        }
      }
    } else {
      obj[last(item.path)] = get(data, item.path) || (/*item.typeField === "select" ? item.choice[0] :*/  (get(data, item.path) === 0 ? 0 : ""))
    }
    return obj
  }, {});
