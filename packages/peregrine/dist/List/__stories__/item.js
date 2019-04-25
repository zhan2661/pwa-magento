import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Item from '..';
import docs from '../__docs__/item.md';
var stories = storiesOf('Item', module);
stories.add('default', withReadme(docs, function () {
  return React.createElement(Item, {
    classes: {
      root: 'foo'
    },
    item: {
      id: 's',
      value: 'Small'
    }
  });
}));
//# sourceMappingURL=item.js.map