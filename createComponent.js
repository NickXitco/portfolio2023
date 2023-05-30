const fs = require('fs')
const path = require('path')

const componentName = process.argv[2]
if (!componentName) {
	console.error('Please provide a component name')
	process.exit(1)
}

const componentDir = path.join(__dirname, 'src', 'components', componentName)

fs.mkdirSync(componentDir, { recursive: true })

const componentContent = `
import { FC } from 'react'
import styles from './${componentName}.module.scss'
export interface ${componentName}Props {}

export const ${componentName}: FC<${componentName}Props> = (props) => {
  return (
    <div className={styles.container}>
      <h2>${componentName}</h2>
    </div>
  );
}; 
`

fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent, 'utf8')

fs.writeFileSync(path.join(componentDir, `${componentName}.module.scss`), '.container {\n\n}', 'utf8')

const indexContent = `export * from './${componentName}'`
fs.writeFileSync(path.join(componentDir, `index.ts`), indexContent, 'utf8')

console.log(`Component ${componentName} created successfully!`)
