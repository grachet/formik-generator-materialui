import { last, get } from "lodash";

export const addValues = (field, values, data) => {
    let newField = { ...field };
    if (field.typeField === "group") {
        for (let i in field.subfields) {
            if (field.subfields[i].typeField === "group") {
                for (let j in field.subfields[i].subfields) {
                    if (field.subfields[i].subfields[j].typeField === "displayValue") {

                        newField.subfields[i].subfields[j].value = newField.subfields[i].subfields[j].display.map(obj => {
                            let newValue = obj.path ? Object.keys(values).indexOf(last(obj.path)) !== -1 ? values[last(obj.path)] : get(data, obj.path) : obj.values;
                            return obj.transformation ? obj.transformation(newValue) : newValue
                        }).join(newField.subfields[i].subfields[j].separator || (""));
                        if (newField.subfields[i].subfields[j].transformation) {
                            newField.subfields[i].subfields[j].value = newField.subfields[i].subfields[j].transformation(newField.subfields[i].subfields[j].value)
                        }

                    } else {
                        newField.subfields[i].subfields[j].value = values[last(field.subfields[i].subfields[j].path)];
                    }
                }
            } else if (newField.subfields[i].typeField === "displayValue") {

                newField.subfields[i].value = newField.subfields[i].display.map(obj => {
                    let newValue = obj.path ? Object.keys(values).indexOf(last(obj.path)) !== -1 ? values[last(obj.path)] : get(data, obj.path) : obj.values;
                    return obj.transformation ? obj.transformation(newValue) : newValue
                }).join(newField.subfields[i].separator || "");
                if (newField.subfields[i].transformation) {
                    newField.subfields[i].value = newField.subfields[i].transformation(newField.subfields[i].value)
                }

            } else {
                newField.subfields[i].value = values[last(field.subfields[i].path)];
            }
        }
    } else if (field.typeField === "displayValue") {
        newField.value = field.display.map(obj => {
            let newValue = obj.path ? values[last(obj.path)] || get(data, obj.path) : obj.values;
            return obj.transformation ? obj.transformation(newValue) : newValue
        }).join(field.separator || "");
    } else {
        newField.value = values[last(field.path)];
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