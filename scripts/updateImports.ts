import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();

function isAbsolute(value: string) {
  const layers = ["app", "features", "entities", "widgets", "pages", "shared"];

  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((declaration) => {
    const value = declaration.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      declaration.setModuleSpecifier("@/" + value);
    }
  });
});

project.save();
