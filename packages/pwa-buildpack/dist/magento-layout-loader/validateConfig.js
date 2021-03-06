"use strict";

const Ajv = require('ajv');

const ajv = new Ajv();
/**
 * Given an aggregate configuration for all layout operations
 * (generated by the Magento store), validates each config conforms
 * to babel-plugin-magento-layout's requirements
 *
 * @param {object} config
 * @returns {{ passed: bool, error: string | null }}
 */

module.exports = config => {
  for (const rules of Object.values(config)) {
    for (const rule of rules) {
      const validator = validatorsByOperation[rule.operation];
      validator(rule);

      if (validator.errors && validator.errors.length) {
        return {
          passed: false,
          error: formatError(validator.errors[0], rule)
        };
      }
    }
  }

  return {
    passed: true,
    error: null
  };
};

function formatError(error, rule) {
  const {
    message
  } = error;
  return `Encountered a layout configuration that does not match the required schema.\n` + `Message: ${message}\n` + `Received: ${JSON.stringify(rule)}`;
}

const validatorsByOperation = {
  removeContainer: ajv.compile({
    additionalProperties: false,
    required: ['operation', 'targetContainer'],
    properties: {
      operation: {
        constant: 'removeContainer'
      },
      targetContainer: {
        type: 'string'
      }
    }
  }),
  removeChild: ajv.compile({
    additionalProperties: false,
    required: ['operation', 'targetContainer', 'targetChild'],
    properties: {
      operation: {
        constant: 'removeChild'
      },
      targetContainer: {
        type: 'string'
      },
      targetChild: {
        type: 'string'
      }
    }
  }),
  insertBefore: ajv.compile({
    additionalProperties: false,
    required: ['operation', 'targetContainer', 'targetChild', 'componentPath'],
    properties: {
      operation: {
        constant: 'insertBefore'
      },
      targetContainer: {
        type: 'string'
      },
      targetChild: {
        type: 'string'
      },
      componentPath: {
        type: 'string'
      }
    }
  }),
  insertAfter: ajv.compile({
    additionalProperties: false,
    required: ['operation', 'targetContainer', 'targetChild', 'componentPath'],
    properties: {
      operation: {
        constant: 'insertAfter'
      },
      targetContainer: {
        type: 'string'
      },
      targetChild: {
        type: 'string'
      },
      componentPath: {
        type: 'string'
      }
    }
  })
};
//# sourceMappingURL=validateConfig.js.map