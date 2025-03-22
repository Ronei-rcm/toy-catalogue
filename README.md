# Catálogo de Brinquedos

Sistema de catálogo de brinquedos desenvolvido com Next.js 14, Prisma, Tailwind CSS e Radix UI.

## 🚀 Tecnologias

- **Framework:** Next.js 14
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** NextAuth.js
- **Estilização:** Tailwind CSS
- **Componentes UI:** Radix UI
- **Formulários:** React Hook Form
- **Validação:** Zod
- **Notificações:** React Hot Toast
- **Upload de Imagens:** Cloudinary

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Cloudinary (para upload de imagens)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/toy-catalogue.git
cd toy-catalogue
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure as seguintes variáveis no arquivo `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/toy_catalogue"
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"
```

5. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas da aplicação
│   ├── admin/             # Páginas administrativas
│   ├── api/               # Rotas da API
│   └── (auth)/            # Páginas de autenticação
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base
│   └── shared/           # Componentes compartilhados
├── lib/                   # Utilitários e configurações
├── prisma/               # Schema e migrações do Prisma
└── services/             # Serviços e lógica de negócios
```

## 🎯 Funcionalidades

### Área Administrativa
- Gerenciamento de produtos (CRUD)
- Gerenciamento de categorias (CRUD)
- Gerenciamento de marcas (CRUD)
- Upload de imagens para produtos
- Interface responsiva com diálogos de confirmação
- Feedback visual com toasts

### Área Pública
- Listagem de produtos com filtros
- Detalhes do produto
- Carrinho de compras
- Checkout
- Histórico de pedidos

## 🔒 Autenticação e Autorização

- Login/Registro de usuários
- Níveis de acesso (Admin/Usuário)
- Proteção de rotas administrativas
- Sessões persistentes

## 🎨 Componentes UI

O projeto utiliza uma combinação de Tailwind CSS e Radix UI para criar uma interface moderna e acessível:

- **Botões:** Componente Button com variantes (default, destructive, outline, etc.)
- **Diálogos:** AlertDialog para confirmações
- **Formulários:** Input, Label, Textarea
- **Tabelas:** Table para listagens
- **Tabs:** Navegação por abas
- **Toasts:** Notificações temporárias

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Mobile First
- Breakpoints personalizados
- Layouts flexíveis
- Componentes adaptáveis

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter
- `npm run test`: Executa os testes
- `npx prisma studio`: Abre o Prisma Studio para gerenciar o banco de dados

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
