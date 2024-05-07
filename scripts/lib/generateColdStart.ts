import fs from 'fs';

const goTemplate = (rand: number) => {
  return `
package lib

import (
  "fmt"
)

func ColdStart() {
  fmt.Println("${rand}")
}
`;
};
const nodeTemplate = (rand: number) => {
  return `export const coldStart = () => console.log(${rand});
`;
};
const rustTemplate = (rand: number) => {
  return `pub fn cold_start() {
    println!("${rand}");
}`;
};

export function generateColdStart() {
  const num = Math.floor(Math.random() * 1000);
  const go = goTemplate(num);
  const node = nodeTemplate(num);
  const rust = rustTemplate(num);

  fs.writeFileSync('src/go/lib/coldstart.go', go);
  fs.writeFileSync('src/node/coldstart.ts', node);
  fs.writeFileSync('src/rust/fibonacci/src/coldstart.rs', rust);

}
