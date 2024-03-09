## Tecnologias Usadas

### Front-end

- **React:** Uma biblioteca JavaScript para construir interfaces de usuário. Escolhido pela sua vasta comunidade, rica documentação e capacidade de criar uma UI dinâmica de forma eficiente.
- **NextJS:** Um framework React que oferece funcionalidades como renderização no lado do servidor e geração de sites estáticos, escolhido por melhorar o SEO e a performance da aplicação.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática. Usado para melhorar a qualidade do código e a produtividade do desenvolvedor através da detecção de erros em tempo de compilação.
- **Zustand:** Uma biblioteca de gerenciamento de estado para React, escolhida pela sua simplicidade e por promover uma forma menos verbosa e mais direta de gerenciar estados globais.
- **react-query:** Utilizado para buscar, sincronizar e atualizar dados no React, escolhido pela sua eficiência em gerenciar estados de servidor no cliente e melhorar a experiência do usuário com fetching de dados.

### Back-end

- **GO:** Uma linguagem de programação compilada conhecida por sua simplicidade, eficiência e concorrência. Escolhida por sua performance superior em aplicações de rede e capacidade de lidar com múltiplas solicitações simultaneamente, ideal para o backend de serviços web escaláveis.

## Como rodar o projeto

### Front-end

Para instalar as dependências e rodar o front-end do projeto, siga os passos abaixo no terminal:

```bash
# Instalar as dependências
pnpm i

# Rodar o projeto em modo de desenvolvimento
pnpm run dev
```

Isso iniciará o servidor de desenvolvimento e permitirá que você visualize a aplicação no navegador.

### Back-end

Para rodar o back-end do projeto, você precisará ter o `make` instalado em seu sistema. Siga os passos abaixo:

```bash
# Rodar o servidor backend
make run
```

Este comando irá compilar e iniciar o servidor backend, tornando a API disponível para o front-end.
