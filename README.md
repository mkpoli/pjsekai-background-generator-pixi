# pjsekai-background-generator-pixi
[![npm version](https://badge.fury.io/js/pjsekai-background-generator-pixi.svg)](https://badge.fury.io/js/pjsekai-background-generator-pixi)

A simple tool for generating PJSekai style background with a jacketImage.

## Example

```javascript
import { generate } from 'pjsekai-background-generator-pixi'

(async () => {
  const response = await fetch('./examples/jacket.png')
  const image = await response.blob()
  return await generate(image)
})().then(image => {
  const img = document.createElement('img')
  img.src = URL.createObjectURL(image)
  document.body.appendChild(img)
})
```

### Input
![Example input](/examples/jacket.png)

### Output
![Example output](/examples/output.png)

## Development
```bash
$ pnpm install
$ pnpm watch
```

### Commit Message Convention

```regex
(F|R|D|S|V|I): <Verb Phrase>
```

- **F** for **F**eature (Additions, Fixes, Ajustments of functionalities, etc.)
- **R** for **R**efactor (Adjustments of code structure, naming, typing, comments, etc.)
- **D** for **D**ocumentation (Documentation, README, etc.)
- **S** for **S**tyle (Styling, Visual Design Adjustments, etc.)
- **V** for **V**ersion (Versioning, Dependencies, Licensing, etc.)
- **I** for **I**18n (Translation, Localisation, etc.)

## Acknowledgement

- Some of the data and assets are from [FriedPotato](https://github.com/sevenc-nanashi/FriedPotato) server.
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=sevenc-nanashi&repo=FriedPotato&theme=gradient&bg_color=30,ff57ab,6040ff&title_color=fff&text_color=fff)](https://github.com/sevenc-nanashi/FriedPotato)