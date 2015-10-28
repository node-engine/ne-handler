var _ = require("lodash");
var React = require('react');
var element = React.createElement;

var neHandler = {
    flattenObject: function(ob) {
        var self = this
        var toReturn = {};
        var flatObject;
        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) {
                continue;
            }
            if ((typeof ob[i]) === 'object') {
                flatObject = self.flattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) {
                        continue;
                    }
                    toReturn[i + (!!isNaN() ? '.' + x : '')] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    }
};


var buildFormFields = function(dataName, object, dataRef, options){

    console.log('');
    console.log('');
    console.log('buildEditFields dataName');
    console.log(dataName);
    console.log('buildEditFields object');
    console.log(object);
    console.log('');
    console.log('');

    var flatObject = neHandler.flattenObject(object);

    console.log('');
    console.log('');
    console.log('buildEditFields flatObject');
    console.log(flatObject);
    console.log('');
    console.log('');


    var dataRefIndex = _.findIndex(dataRef, function(chr) {
        return chr.name == dataName;
    });

    console.log('');
    console.log('');
    console.log('buildEditFields flatObject');
    console.log(flatObject);
    console.log('buildEditFields dataRefIndex');
    console.log(dataRefIndex);
    console.log('');
    console.log('');


    var fields = [];

    dataRef[dataRefIndex].fields.forEach(function(field, index2){

        console.log('');
        console.log('');
        console.log('buildEditFields options.editGroup');
        console.log(options.editGroup);
        console.log('buildEditFields field.editGroup');
        console.log(field.editGroup);
        console.log('');
        console.log('');

        if(options.editGroup && field.editGroup === "undefined"){

            console.log('');
            console.log('');
            console.log("buildEditField: Field skipped because not in current editGroup");
            console.log('buildEditField: Field:');
            console.log(field);
            console.log('');
            console.log('');

        }
        else if(options.editGroup && field.editGroup !== options.editGroup){

            console.log('');
            console.log('');
            console.log("buildEditField: Field skipped because not in current editGroup");
            console.log('buildEditField: Field:');
            console.log(field);
            console.log('');
            console.log('');

        }
        else{

            if(options && options.noEdit && options.noEdit  === true){

                console.log('');
                console.log('');
                console.log('buildEditField: Field: options.noEdit === true');
                console.log(field);
                console.log('');
                console.log('');

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label',
                        {},
                        field.data
                    ),
                    element(
                        'br',
                        {}
                    ),
                    element(
                        "label",
                        {},
                        flatObject[field.data]
                    ),
                    element(
                        'br',
                        {}
                    )
                ))

            }

            else if(field.editType && field.editType === "noEdit"){

                console.log('');
                console.log('');
                console.log('buildEditField: Field: field.editType === "noEdit"');
                console.log(field);
                console.log('');
                console.log('');

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label',
                        {},
                        field.data
                    ),
                    element(
                        'br',
                        {}
                    ),
                    element(
                        "label",
                        {},
                        flatObject[field.data]
                    ),
                    element(
                        'br',
                        {}
                    )
                ))

            }

            else if(field.editType && field.editType === "select"){

                console.log('');
                console.log('');
                console.log('buildEditField: field.editType === "select"');
                console.log(field);
                console.log('');
                console.log('');


                var selectOptions = field.selectOptions.map(function(option, index3){

                    console.log('');
                    console.log('');
                    console.log('buildEditField: field.editType === "select" : option');
                    console.log(option);
                    console.log('');
                    console.log('');

                    return element(
                        "option",{value: option, key: index3},
                        option
                    )

                });

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label', {},
                        field.label + ": "
                    ),
                    element(
                        "label", {},
                        flatObject[field.data]
                    ),
                    element(
                        'br', {}
                    ),
                    element(
                        "select", { type: "text", name: field.data, defaultValue: flatObject[field.data]},
                        selectOptions
                    ),
                    element(
                        'br', {}
                    )
                ))


            }

            else if(field.editType && field.editType === "textarea"){

                console.log('');
                console.log('');
                console.log('buildEditField: field.editType === "textarea"');
                console.log(field);
                console.log('');
                console.log('');

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label', {},
                        field.label
                    ),
                    element(
                        'br', {}
                    ),
                    element(
                        "textarea",
                        {name: field.data},
                        flatObject[field.data]
                    ),
                    element(
                        'br', {}
                    )
                ))

            }

            else{

                console.log('');
                console.log('');
                console.log('buildEditField: field.editType nothing specified');
                console.log(field);
                console.log('');
                console.log('');

                fields.push(element(
                    'div', {id: index2, key: index2, className: "ne-data-field-" + dataName},
                    element(
                        'label', {},
                        field.label
                    ),
                    element(
                        'br', {}
                    ),
                    element(
                        "input",
                        {type: "text", name: field.data, defaultValue: flatObject[field.data]}
                    ),
                    element(
                        'br', {}
                    )

                ))

            }

        }

    });

    console.log('');
    console.log('');
    console.log('buildEditFields fields');
    console.log(fields);
    console.log('');
    console.log('');

    return fields

};

module.exports = buildFormFields;