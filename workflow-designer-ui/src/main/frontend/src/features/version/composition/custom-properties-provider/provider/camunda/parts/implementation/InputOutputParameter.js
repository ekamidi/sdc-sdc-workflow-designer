import inputOutputHelper from './InputOutputHelper';

var is = require('bpmn-js/lib/util/ModelUtil').is;

var elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
    utils = require('bpmn-js-properties-panel/lib/Utils');

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    script = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/Script')(
        'scriptFormat',
        'value',
        true
    );

function createElement(type, parent, factory, properties) {
    return elementHelper.createElement(type, properties, parent, factory);
}

function isScript(elem) {
    return is(elem, 'camunda:Script');
}

function isList(elem) {
    return is(elem, 'camunda:List');
}

function isMap(elem) {
    return is(elem, 'camunda:Map');
}

function ensureInputOutputSupported(element, insideConnector) {
    return inputOutputHelper.isInputOutputSupported(element, insideConnector);
}

export default function(element, bpmnFactory, options, translate, config) {
    var typeInfo = {
        'camunda:Map': {
            value: 'map',
            label: translate('Map')
        },
        'camunda:List': {
            value: 'list',
            label: translate('List')
        },
        'camunda:Script': {
            value: 'script',
            label: translate('Script')
        }
    };

    options = options || {};

    var insideConnector = !!options.insideConnector,
        idPrefix = options.idPrefix || '';

    var getSelected = options.getSelectedParameter;

    if (!ensureInputOutputSupported(element, insideConnector)) {
        return [];
    }

    var entries = [];

    var isSelected = function(element, node) {
        return getSelected(element, node);
    };

    // parameter name ////////////////////////////////////////////////////////

    entries.push(
        entryFactory.validationAwareTextField({
            id: idPrefix + 'parameterName',
            label: 'Name',
            modelProperty: 'name',

            getProperty: function(element, node) {
                return (getSelected(element, node) || {}).name;
            },

            setProperty: function(element, values, node) {
                var param = getSelected(element, node);
                return cmdHelper.updateBusinessObject(element, param, values);
            },

            validate: function(element, values, node) {
                var bo = getSelected(element, node);

                var validation = {};
                if (bo) {
                    var nameValue = values.name;

                    if (nameValue) {
                        if (utils.containsSpace(nameValue)) {
                            validation.name = 'Name must not contain spaces';
                        }
                    } else {
                        validation.name = 'Parameter must have a name';
                    }
                }

                return validation;
            },

            hidden: function(element, node) {
                return !isSelected(element, node);
            },
            disabled: function(element) {
                return !inputOutputHelper.isCreateDeleteSupported(element);
            }
        })
    );

    // parameter type //////////////////////////////////////////////////////

    var selectOptions = [
        { value: 'text', name: 'Text' },
        { value: 'script', name: 'Script' },
        { value: 'list', name: 'List' },
        { value: 'map', name: 'Map' }
    ];

    entries.push(
        entryFactory.selectBox({
            id: idPrefix + 'parameterType',
            label: 'Type',
            selectOptions: selectOptions,
            modelProperty: 'parameterType',

            get: function(element, node) {
                var bo = getSelected(element, node);

                var parameterType = 'text';

                if (typeof bo !== 'undefined') {
                    var definition = bo.get('definition');
                    if (typeof definition !== 'undefined') {
                        var type = definition.$type;
                        parameterType = typeInfo[type].value;
                    }
                }

                return {
                    parameterType: parameterType
                };
            },

            set: function(element, values, node) {
                var bo = getSelected(element, node);

                var properties = {
                    value: undefined,
                    definition: undefined
                };

                var createParameterTypeElem = function(type) {
                    return createElement(type, bo, bpmnFactory);
                };

                var parameterType = values.parameterType;

                if (parameterType === 'script') {
                    properties.definition = createParameterTypeElem(
                        'camunda:Script'
                    );
                } else if (parameterType === 'list') {
                    properties.definition = createParameterTypeElem(
                        'camunda:List'
                    );
                } else if (parameterType === 'map') {
                    properties.definition = createParameterTypeElem(
                        'camunda:Map'
                    );
                }

                return cmdHelper.updateBusinessObject(element, bo, properties);
            },

            show: function(element, node) {
                return isSelected(element, node);
            },
            disabled: function(element) {
                return !inputOutputHelper.isCreateDeleteSupported(element);
            }
        })
    );

    // parameter value (type = text) ///////////////////////////////////////////////////////

    entries.push(
        entryFactory.textBox({
            id: idPrefix + 'parameterType-text',
            label: 'Value',
            modelProperty: 'value',
            get: function(element, node) {
                return {
                    value: (getSelected(element, node) || {}).value
                };
            },

            set: function(element, values, node) {
                var param = getSelected(element, node);
                values.value = values.value || undefined;
                return cmdHelper.updateBusinessObject(element, param, values);
            },

            show: function(element, node) {
                var bo = getSelected(element, node);
                return bo && !bo.definition;
            }
        })
    );

    // parameter value (type = script) ///////////////////////////////////////////////////////

    entries.push({
        id: idPrefix + 'parameterType-script',
        html: '<div data-show="isScript">' + script.template + '</div>',
        get: function(element, node) {
            var bo = getSelected(element, node);
            return bo && isScript(bo.definition)
                ? script.get(element, bo.definition)
                : {};
        },

        set: function(element, values, node) {
            var bo = getSelected(element, node);
            var update = script.set(element, values);
            return cmdHelper.updateBusinessObject(
                element,
                bo.definition,
                update
            );
        },

        validate: function(element, values, node) {
            var bo = getSelected(element, node);
            return bo && isScript(bo.definition)
                ? script.validate(element, bo.definition)
                : {};
        },

        isScript: function(element, node) {
            var bo = getSelected(element, node);
            return bo && isScript(bo.definition);
        },

        script: script
    });

    // parameter value (type = list) ///////////////////////////////////////////////////////

    entries.push(
        entryFactory.table({
            id: idPrefix + 'parameterType-list',
            modelProperties: ['value'],
            labels: ['Value'],

            getElements: function(element, node) {
                var bo = getSelected(element, node);

                if (bo && isList(bo.definition)) {
                    return bo.definition.items;
                }

                return [];
            },

            updateElement: function(element, values, node, idx) {
                var bo = getSelected(element, node);
                var item = bo.definition.items[idx];
                return cmdHelper.updateBusinessObject(element, item, values);
            },

            addElement: function(element, node) {
                var bo = getSelected(element, node);
                var newValue = createElement(
                    'camunda:Value',
                    bo.definition,
                    bpmnFactory,
                    { value: undefined }
                );
                return cmdHelper.addElementsTolist(
                    element,
                    bo.definition,
                    'items',
                    [newValue]
                );
            },

            removeElement: function(element, node, idx) {
                var bo = getSelected(element, node);
                return cmdHelper.removeElementsFromList(
                    element,
                    bo.definition,
                    'items',
                    null,
                    [bo.definition.items[idx]]
                );
            },

            editable: function(element, node, prop, idx) {
                var bo = getSelected(element, node);
                var item = bo.definition.items[idx];
                return !isMap(item) && !isList(item) && !isScript(item);
            },

            setControlValue: function(element, node, input, prop, value, idx) {
                var bo = getSelected(element, node);
                var item = bo.definition.items[idx];

                if (!isMap(item) && !isList(item) && !isScript(item)) {
                    input.value = value;
                } else {
                    input.value = typeInfo[item.$type].label;
                }
            },

            show: function(element, node) {
                var bo = getSelected(element, node);
                return bo && bo.definition && isList(bo.definition);
            }
        })
    );

    // parameter value (type = map) ///////////////////////////////////////////////////////

    entries.push(
        entryFactory.table({
            id: idPrefix + 'parameterType-map',
            modelProperties: ['key', 'value'],
            labels: ['Key', 'Value'],
            addLabel: 'Add Entry',

            getElements: function(element, node) {
                var bo = getSelected(element, node);

                if (bo && isMap(bo.definition)) {
                    return bo.definition.entries;
                }

                return [];
            },

            updateElement: function(element, values, node, idx) {
                var bo = getSelected(element, node);
                var entry = bo.definition.entries[idx];

                if (
                    isMap(entry.definition) ||
                    isList(entry.definition) ||
                    isScript(entry.definition)
                ) {
                    values = {
                        key: values.key
                    };
                }

                return cmdHelper.updateBusinessObject(element, entry, values);
            },

            addElement: function(element, node) {
                var bo = getSelected(element, node);
                var newEntry = createElement(
                    'camunda:Entry',
                    bo.definition,
                    bpmnFactory,
                    { key: undefined, value: undefined }
                );
                return cmdHelper.addElementsTolist(
                    element,
                    bo.definition,
                    'entries',
                    [newEntry]
                );
            },

            removeElement: function(element, node, idx) {
                var bo = getSelected(element, node);
                return cmdHelper.removeElementsFromList(
                    element,
                    bo.definition,
                    'entries',
                    null,
                    [bo.definition.entries[idx]]
                );
            },

            editable: function(element, node, prop, idx) {
                var bo = getSelected(element, node);
                var entry = bo.definition.entries[idx];
                return (
                    prop === 'key' ||
                    (!isMap(entry.definition) &&
                        !isList(entry.definition) &&
                        !isScript(entry.definition))
                );
            },

            setControlValue: function(element, node, input, prop, value, idx) {
                var bo = getSelected(element, node);
                var entry = bo.definition.entries[idx];

                if (
                    prop === 'key' ||
                    (!isMap(entry.definition) &&
                        !isList(entry.definition) &&
                        !isScript(entry.definition))
                ) {
                    input.value = value;
                } else {
                    input.value = typeInfo[entry.definition.$type].label;
                }
            },

            show: function(element, node) {
                var bo = getSelected(element, node);
                return bo && bo.definition && isMap(bo.definition);
            }
        })
    );

    //workflow source parameter  (type = text) ///////////////////////////////////////////////////////
    const workflowInputs = config.workflowInputOutput.inputs.map(item => ({
        name: item.name,
        value: item.name
    }));

    const workflowOutputs = config.workflowInputOutput.outputs.map(item => ({
        name: item.name,
        value: item.name
    }));

    const workflowSources = [
        { name: '', value: '' },
        ...workflowInputs,
        ...workflowOutputs
    ];

    entries.push(
        entryFactory.selectBox({
            id: 'parameter-workflowSource',
            label: 'Workflow Source Parameter',
            selectOptions: workflowSources,
            modelProperty: 'workflowSource',

            get: function(element, node) {
                return {
                    workflowSource: (getSelected(element, node) || {})
                        .workflowSource
                };
            },

            set: function(element, values, node) {
                const properties = {
                    workflowSource: undefined
                };

                properties.workflowSource = values.workflowSource;
                const param = getSelected(element, node);
                values.workflowSource = values.workflowSource || undefined;

                return cmdHelper.updateBusinessObject(element, param, values);
            },

            hidden: function(element, node) {
                const selected = getSelected(element, node);
                return !inputOutputHelper.isWorkflowSourceSupported(
                    element,
                    selected
                );
            }
        })
    );

    //workflow target parameter  (type = text) ///////////////////////////////////////////////////////
    entries.push(
        entryFactory.selectBox({
            id: 'parameter-workflowTarget',
            label: 'Workflow Target Parameter',
            selectOptions: workflowSources,
            modelProperty: 'workflowTarget',

            get: function(element, node) {
                return {
                    workflowTarget: (getSelected(element, node) || {})
                        .workflowTarget
                };
            },

            set: function(element, values, node) {
                const properties = {
                    workflowTarget: undefined
                };

                properties.workflowTarget = values.workflowTarget;
                const param = getSelected(element, node);
                values.workflowTarget = values.workflowTarget || undefined;

                return cmdHelper.updateBusinessObject(element, param, values);
            },

            hidden: function(element, node) {
                const selected = getSelected(element, node);
                return !inputOutputHelper.isWorkflowTargetSupported(
                    element,
                    selected
                );
            }
        })
    );

    return entries;
}
