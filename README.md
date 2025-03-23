# Toy Catalogue

Sistema de catálogo de brinquedos desenvolvido com Next.js, Prisma e PostgreSQL.

## Credenciais de Acesso

### Administrador
- Email: admin@toycatalogue.com
- Senha: admin123

### Cliente
- Email: cliente@toycatalogue.com
- Senha: cliente123

## Funcionalidades

### Área Administrativa
- Gerenciamento de produtos
- Gerenciamento de categorias
- Gerenciamento de marcas
- Gerenciamento de usuários
- Configurações do sistema

### Área do Cliente
- Visualização do catálogo de produtos
- Filtragem por categorias e marcas
- Busca de produtos
- Visualização detalhada dos produtos

## Tecnologias Utilizadas

- Next.js 14
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- shadcn/ui

## Como Executar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Execute o seed para criar o usuário administrador:
```bash
npm run seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

7. Acesse http://localhost:3000 no navegador

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
git clone https://github.com/ronei-rcm/toy-catalogue.git
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

- `