import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
html,
    body {
    padding: 0;
    margin: 0;
    line-height: 1.2;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background: #f1f2f4;
    color: #444444;
}

* {
    box-sizing: border-box;
}
p {
    font-size: 16px;
}
`