import get from "lodash.get";

export const last = (arr) => arr && arr[arr.length - 1];


export const getValidationSchema = (fields) => {

  let getVerification = ({ typeField, path, yup, subfields }, obj) => {
    let validationObj = { ...obj };
    if (typeField === "group") {
      subfields.forEach(subfieldData => {
        validationObj = getVerification(subfieldData, validationObj)
      });
    } else if (typeField !== "checkbox" && typeField !== "switch") {
      if (yup && path) {
        validationObj[path] = yup;
      }
    }
    return validationObj
  }

  return fields.reduce((validationObject, fieldData) => getVerification(fieldData, validationObject), {});
}
