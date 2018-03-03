const newExampleHtml = () =>
  `
{% macro render(id) %}
  <section id="{{ id }}" class="{{ id }}">
    <article>Add example here...</article>
  </section>
{% endmacro %}`

const newExampleScss = name => `.${name} {
  
}`

const newExampleJs = (name, type) =>
  `
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import ${type} from 'lib/${type.toLowerCase()}';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function ${name}() {
  const containers = document.querySelectorAll('#${name}');

  const ${type.toLowerCase()} = new ${type}(containers);

  // --- ${type} events --- //
  ${type.toLowerCase()}.on('drag:start', evt => {
    console.log('Drag start', evt);
  });

  return ${type.toLowerCase()};
}
  `

const viewHtml = (description, name, type) =>
  `
{% extends 'templates/document.html' %}

{% import 'components/Document/Head.html' as Head %}
{% import 'components/Sidebar/Sidebar.html' as Sidebar %}
{% import 'components/PageHeader/PageHeader.html' as PageHeader %}

{% import 'content/${type}/${name}/${name}.html' as ${name} %}

{% set ViewAttr = {
  id: '${name}',
  parent: '${type}',
  child: '${name}',
  subheading: '${description}'
} %}

{% block PageId %}{{ ViewAttr.id }}{% endblock %}

{% block head %}
  {{ Head.render(ViewAttr) }}
{% endblock %}

{% block sidebar %}
  {{ Sidebar.render(ViewAttr, DataPages) }}
{% endblock %}

{% block main %}
  {{ PageHeader.render(ViewAttr.parent, ViewAttr.subheading) }}
  {{ ${name}.render(ViewAttr.id) }}
{% endblock %}
`

module.exports = {
  newExampleHtml,
  newExampleJs,
  newExampleScss,
  viewHtml,
}
