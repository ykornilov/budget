# Сервис для ведения семейного бюджета

## Настройки IDE

### VS Code

Для автоформатирования кода применяется плагин [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)  

Настройки для workspace в VS Code:
``` 
  "editor.formatOnSave": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
```

Для линтинга кода применяется плагин
[dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Настройки для workspace в VS Code:
```
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.format.enable": false
```

Для линтинга стилей применяется плагин
[stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

Настройки для workspace в VS Code:
```
  "css.validate": false
```
