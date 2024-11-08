// projects/juicebar/schematics/module/index.ts
import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  chain,
  mergeWith
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export function module(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ..._options,
      }),
      // Change from src/app/modules to src/lib/modules for library use
      move(`modules/${strings.dasherize(_options.name)}`)
    ]);

    return chain([
      mergeWith(templateSource)
    ])(tree, _context);
  };
}
