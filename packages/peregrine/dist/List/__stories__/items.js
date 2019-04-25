import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Items from '..';
import docs from '../__docs__/items.md';
var data = {
  s: {
    id: 's',
    value: 'Small'
  },
  m: {
    id: 'm',
    value: 'Medium'
  },
  l: {
    id: 'l',
    value: 'Large'
  }
};
var stories = storiesOf('Items', module);
stories.add('default', withReadme(docs, function () {
  return React.createElement(Items, {
    items: Object.entries(data)
  });
}));
//# sourceMappingURL=items.js.map