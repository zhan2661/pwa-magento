import React from 'react';
import { storiesOf } from '@storybook/react';
import ContainerChild from '..';
import docs from '../__docs__/ContainerChild.md';
import { withReadme } from 'storybook-readme';
var stories = storiesOf('ContainerChild', module);
stories.add('default', withReadme(docs, function () {
  return React.createElement(ContainerChild, {
    id: "example.container.child.id",
    render: function render() {
      return React.createElement("div", null, "An example ContainerChild component, rendering its children from the \"render\" prop");
    }
  });
}));
//# sourceMappingURL=ContainerChild.js.map