# Tabnews Clone

Este é um clone do Tabnews do Filipe Deschamps. O projeto foi desenvolvido com as seguintes tecnologias:

## Stack

### Frontend
- **Next.js**: Framework React que facilita a criação de aplicativos web rápidos e escaláveis.
- **Tailwind CSS**: Biblioteca CSS utilitária que permite estilizar componentes de forma eficiente.
- **Chakra UI**: Biblioteca de componentes React com foco em acessibilidade e design.
- **TypeScript**: Linguagem de programação tipada que melhora a manutenção e a segurança do código.
- **Relay**: Biblioteca GraphQL para gerenciamento de estado no frontend.

### Backend
- **Koa**
- **Node.js**
- **GraphQL**
- **MongoDB**

## Funcionalidades

1. **Listagem de Publicações**: Exibe uma lista de publicações, podendo ser filtrada por relevantes ou recentes, com tabcoins, quantidade de comentários, username do autor e quando foi criada.
2. **Detalhes da Publicação**: Permite visualizar os detalhes completos de uma publicação específica.
3. **Atualização da Publicação**: Os usuários conseguem atualizar o conteúdo de suas publicações.
4. **Exclusão de Publicação**: Os usuários conseguem excluir uma publicação.
5. **Autenticação**: Suporte para autenticação de usuários.
6. **Atualização de Perfil**: Os usuários conseguem atualizar as informações de seu perfil.
7. **Paginação**: Divide as notícias em páginas para facilitar a navegação.
8. **Transações Tabcoins**: Os usuários podem votar em publicações e receber ou gastar Tabcoins.
9. **Markdown**: Os usuários escrevem as postagens por meio de um editor Markdown, assim como para visualização dos posts.

### Como funcionam as transações de Tabcoins:
1. **Cadastro de Usuário**: Ao se cadastrar, o usuário é criado com 5 Tabcoins.
2. **Criação de Publicação**: Ao criar uma publicação, 5 Tabcoins são acrescidas do saldo do autor e 1 Tabcoin é acrescida do saldo da publicação.
3. **Relevância de Publicações**: Os usuários podem usar suas Tabcoins para votar na relevância (positiva ou negativa) de publicações (com exceção das suas próprias) e, para isso:
   - 2 Tabcoins são descontadas de seu saldo.
   - Caso o voto seja positivo, 1 Tabcoin é acrescido do saldo da publicação e 1 Tabcoin do saldo do autor; caso contrário, 1 Tabcoin será decrescida.
4. **Exclusão de Publicação**: Ao excluir uma publicação, o usuário perde **TODAS** as Tabcoins que ganhou com o post.
