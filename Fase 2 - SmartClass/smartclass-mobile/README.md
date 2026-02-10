# 📱 SmartClass Mobile – Tech Challenge Fase 04

## 📘 1. Visão Geral do Projeto

O **SmartClass Mobile** é a versão nativa do projeto educacional desenvolvido como parte do **Tech Challenge – Fase 04** da **Pós-Tech FIAP (Full Stack Development)**.

### 🎯 Objetivo

Criar uma aplicação mobile completa utilizando **React Native** que permita:

- **Professores** gerenciem posts educacionais (criar, editar, excluir)
- **Alunos** visualizem e acessem conteúdos publicados
- Autenticação segura com controle de permissões por perfil
- Integração total com backend REST (Node.js + Express + JSON Server)

### 📋 Contexto Acadêmico

Segundo o documento do Tech Challenge Fase 04:

> "Desenvolver uma aplicação mobile nativa com React Native que integre funcionalidades de CRUD, autenticação de usuários e controle de acesso baseado em perfis, proporcionando experiência diferenciada para professores e alunos."

O projeto demonstra competências em:

- Desenvolvimento mobile nativo com React Native
- Integração com APIs REST
- Gerenciamento de estado e navegação
- Controle de permissões e segurança
- UX/UI mobile responsiva

---

## ⚙️ 2. Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **React Native** | 0.74+ | Framework mobile multiplataforma |
| **Expo** | ~51.0 | Toolchain para desenvolvimento ágil |
| **TypeScript** | 5.1+ | Tipagem estática para maior confiabilidade |
| **React Navigation** | 6.1+ | Navegação entre telas (Stack + Bottom Tabs) |
| **Axios** | 1.6+ | Cliente HTTP para integração REST |
| **AsyncStorage** | 1.23+ | Persistência local de dados |
| **React Native Paper** | 5.12+ | Componentes Material Design nativos |

### 🔗 Backend Integrado

- **Node.js + Express** (API REST existente)
- **JSON Server** (Mock database para desenvolvimento)
- **Endpoints**: `/api/users`, `/api/posts`

---

## 🏗️ 3. Arquitetura da Aplicação

### 📂 Estrutura de Pastas

```
smartclass-mobile/
├── src/
│   ├── screens/              # Telas da aplicação
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ClassDetailScreen.tsx
│   │   ├── NewClassScreen.tsx
│   │   └── AdminScreen.tsx
│   │
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ClassCard.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── services/            # Camada de integração com API
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── post.service.ts
│   │   └── user.service.ts
│   │
│   ├── contexts/            # Gerenciamento de estado global
│   │   └── AuthContext.tsx
│   │
│   └── navigation/          # Configuração de rotas
│       └── AppNavigator.tsx
│
├── assets/                 # Imagens, fontes, ícones
├── App.tsx                # Ponto de entrada
├── app.json              # Configuração Expo
└── package.json          # Dependências
```

### 🔐 Fluxo de Autenticação

```
Abertura do App
    ↓
Sessão Salva? → Não → Tela de Login → Autenticar via API
    ↓ Sim                                    ↓
Validar Token                           Salvar Sessão
    ↓                                        ↓
Tela Principal ←─────────────────────────────┘
```

### 🛡️ Controle de Permissões

| Ação | Aluno | Professor |
|------|-------|-----------|
| Visualizar posts | ✅ | ✅ |
| Buscar posts | ✅ | ✅ |
| Criar post | ❌ | ✅ |
| Editar post | ❌ | ✅ |
| Excluir post | ❌ | ✅ |
| Gerenciar usuários | ❌ | ✅ |

---

## ✅ 4. Funcionalidades Implementadas

### 🎓 Para Alunos

#### 📚 Visualização de Posts
- **Listagem completa** de posts publicados
- **Card visual** com título, autor e descrição
- **Busca em tempo real** por palavras-chave
- **Leitura completa** do conteúdo ao tocar no card

#### 🔍 Busca Inteligente
- Filtro por **título**, **autor** ou **palavras-chave**
- **Empty state** quando não há resultados
- Performance otimizada com debounce

---

### 👨‍🏫 Para Professores

#### ✍️ CRUD Completo de Posts

**Criar Post:**
- Formulário com validação de campos obrigatórios
- Upload de imagem (via seletor nativo)
- Editor de texto para conteúdo
- Preview antes de publicar

**Editar Post:**
- Carregamento dos dados existentes
- Edição inline com salvamento automático
- Confirmação antes de salvar alterações

**Excluir Post:**
- Diálogo de confirmação
- Exclusão com feedback visual
- Atualização automática da lista

#### 📊 Painel Administrativo

**Gestão de Posts:**
- Lista completa com status (publicado/rascunho)
- Botões de ação (editar/excluir) em cada item
- Estatísticas visuais (total de posts)

---

### 🔐 Autenticação e Autorização

#### Sistema de Login
```typescript
// Validação em tempo real
const isEmailValid = email.includes('@');
const isPasswordValid = password.length >= 6;

// Autenticação via API
const response = await AuthService.login(email, password);

// Persistência de sessão
await AsyncStorage.setItem('user', JSON.stringify(user));
```

#### Proteção de Rotas
```typescript
// Navegação condicional baseada em role
{user.role === 'professor' ? (
  <AdminStack />
) : (
  <StudentStack />
)}
```

---

## 🚀 5. Setup do Projeto

### 📋 Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Expo Go** instalado no dispositivo físico (opcional)
- **Android Studio** (para emulador Android) ou **Xcode** (para iOS)

---

### ⬇️ Passo a Passo

#### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/smartclass-mobile.git
cd smartclass-mobile
```

#### 2️⃣ Instale as dependências
```bash
npm install
```

#### 3️⃣ Configure a API

Edite o arquivo `src/services/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_IP:3001', // ⚠️ Substitua pelo IP da sua máquina
  timeout: 10000,
});

export default api;
```

**⚠️ Importante:**
- Para **emulador Android**: use `http://10.0.2.2:3001`
- Para **dispositivo físico**: use o IP da sua rede local (ex: `http://192.168.1.10:3001`)
- **Não use `localhost`** (não funciona em dispositivos móveis)

#### 4️⃣ Inicie o backend

No diretório do backend:

```bash
cd ../smartclass/api
node server.js
```

Verifique se está rodando em:
```
✅ http://localhost:3001
```

#### 5️⃣ Inicie o app mobile

```bash
npx expo start
```

Opções para executar:

- **Pressione `a`** → Abrir no emulador Android
- **Pressione `i`** → Abrir no simulador iOS
- **Escaneie o QR Code** → Abrir no Expo Go (dispositivo físico)

---

### 🔧 Troubleshooting Comum

**Problema:** Erro de conexão com API
```bash
# Verifique o IP da máquina
ipconfig      # Windows
ifconfig      # Mac/Linux

# Teste a API no navegador
http://SEU_IP:3001/api/users
```

**Problema:** Metro Bundler não inicia
```bash
# Limpe o cache
npx expo start --clear
```

---

## 📖 6. Guia de Uso

### 🎓 Fluxo do Aluno

#### 1. Login
- Abra o app
- Insira email e senha
- Toque em "Entrar"

```
Email: aluno@teste.com
Senha: 123456
```

#### 2. Página Inicial
- Visualize os **posts publicados**
- Use a **barra de busca** para filtrar conteúdos
- Toque em um card para **ler o conteúdo completo**

#### 3. Leitura de Post
- Veja o **título**, **autor** e **data**
- Role para **ler o conteúdo completo**
- Volte com o botão de navegação

---

### 👨‍🏫 Fluxo do Professor

#### 1. Login
```
Email: professor1@teste.com
Senha: 123456
```

#### 2. Dashboard
- Visualize **estatísticas** (total de posts, usuários)
- Acesse atalhos para **criar post** ou **gerenciar**

#### 3. Criar Novo Post
- Toque no botão **"+"** (FloatingActionButton)
- Preencha:
  - **Título** (mínimo 3 caracteres)
  - **Conteúdo** (mínimo 10 caracteres)
- Toque em **"Salvar"**
- Veja confirmação de sucesso

#### 4. Editar Post
- Na lista de posts, toque no **ícone de lápis**
- Modifique os campos desejados
- Toque em **"Salvar Alterações"**

#### 5. Excluir Post
- Na lista, toque no **ícone de lixeira**
- Confirme a exclusão no diálogo

---

### 🛠️ Área Administrativa

**Acessar:**
- Menu inferior → **"Admin"**

**Ações disponíveis:**
- **Criar novo** (botão "+")
- **Editar** (ícone lápis)
- **Excluir** (ícone lixeira)
- **Buscar** (campo de pesquisa)

---

## 🧠 7. Relato Técnico

### 🏛️ Decisões de Arquitetura

#### 1. Separação em Camadas

**Motivação:** Facilitar manutenção e testes

```
Screens (UI) → Services (API) → Backend
     ↓              ↓
  Contexts       Types
```

**Benefícios:**
- Reutilização de lógica de negócio
- Testes unitários mais simples
- Desacoplamento entre UI e API

---

#### 2. Context API vs Redux

**Decisão:** Utilizar **Context API** para gerenciamento de estado

**Justificativa:**
- Projeto de **porte médio** (não requer Redux)
- **Menos boilerplate** (sem actions, reducers, store)
- **Nativo do React** (sem dependências extras)
- **Suficiente** para autenticação e estado global simples

---

#### 3. AsyncStorage para Persistência

**Motivação:** Manter sessão do usuário entre aberturas do app

**Implementação:**
```typescript
// Salvar sessão
await AsyncStorage.setItem('user', JSON.stringify(user));

// Recuperar sessão
const savedUser = await AsyncStorage.getItem('user');
const user = savedUser ? JSON.parse(savedUser) : null;
```

---

#### 4. React Navigation (Stack + Bottom Tabs)

**Estrutura de navegação escolhida:**

```typescript
<NavigationContainer>
  {!user ? (
    <AuthStack>
      <Stack.Screen name="Login" component={LoginScreen} />
    </AuthStack>
  ) : user.role === 'professor' ? (
    <BottomTabs>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
    </BottomTabs>
  ) : (
    <BottomTabs>
      <Tab.Screen name="Home" component={HomeScreen} />
    </BottomTabs>
  )}
</NavigationContainer>
```

**Justificativa:**
- **Bottom Tabs** para navegação principal (padrão mobile)
- **Stack Navigator** para fluxos secundários (detalhes, edição)
- **Navegação condicional** baseada em `user.role`

---

### 🚧 Principais Desafios

#### 1. Integração com Backend Existente

**Problema:**
- Backend foi desenvolvido para Next.js (web)
- Não havia CORS configurado
- Endpoints retornavam estruturas inconsistentes

**Solução:**
```javascript
// server.js (backend)
const cors = require('cors');
app.use(cors({
  origin: '*', // Permitir todas as origens (ajustar em produção)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

---

#### 2. Gerenciamento de Estado de Loading

**Problema:**
- Telas ficavam "travadas" durante requisições
- Usuário não sabia se o app estava processando

**Solução:**
- Componente `Loading` padronizado em todas as telas
- Estados de loading/erro consistentes

---

#### 3. Validação de Formulários em Tempo Real

**Problema:**
- Usuários submetiam formulários com dados inválidos

**Solução:**
- Validação inline com feedback visual imediato

```typescript
const isEmailValid = email.includes('@') && email.includes('.');
const isPasswordValid = password.length >= 6;

<TextInput
  error={email.length > 0 && !isEmailValid}
/>
{email.length > 0 && !isEmailValid && (
  <Text style={styles.errorText}>Email inválido</Text>
)}
```

---

### 🎓 Aprendizados

#### 1. Diferenças entre Web e Mobile

| Aspecto | Web (Next.js) | Mobile (React Native) |
|---------|---------------|----------------------|
| **Componentes** | `<div>`, `<img>`, `<a>` | `<View>`, `<Image>`, `<TouchableOpacity>` |
| **Estilização** | CSS/SCSS | `StyleSheet` |
| **Navegação** | URL-based | Stack/Tab navigators |
| **Storage** | localStorage | AsyncStorage |

**Lição aprendida:**
- Não é possível "portar diretamente" código web para mobile
- Componentes e conceitos são **fundamentalmente diferentes**
- Requer **reescrita completa** da UI

---

#### 2. Importância da Tipagem com TypeScript

**Benefícios:**
- **Autocomplete** no editor (melhor DX)
- **Erros detectados antes** de rodar o app
- **Documentação implícita** no código

---

#### 3. Padrões de Código Limpo

**Princípios aplicados:**

✅ **Single Responsibility Principle (SRP)**
- Cada componente tem **uma única responsabilidade**

✅ **DRY (Don't Repeat Yourself)**
- Componentes reutilizáveis (`Loading`, `ErrorMessage`)

✅ **Separation of Concerns**
- **Services** lidam com API
- **Screens** lidam com UI
- **Contexts** lidam com estado global

---

## 📝 8. Considerações Finais

O **SmartClass Mobile** demonstra competência completa em desenvolvimento mobile nativo com React Native, integrando:

✅ **Arquitetura escalável** (services, contexts, navigation)  
✅ **Integração REST** completa com backend existente  
✅ **Controle de permissões** robusto por perfil  
✅ **UX mobile profissional** (loading, erros, empty states)  
✅ **CRUD completo** de posts e usuários  
✅ **Código limpo** e bem documentado  
✅ **TypeScript** para confiabilidade  

---

### 🚀 Próximos Passos (Roadmap)

#### Melhorias de Segurança
- [ ] Implementar **refresh tokens**
- [ ] Criptografar dados no AsyncStorage
- [ ] Adicionar **biometria** para login

#### Funcionalidades Avançadas
- [ ] **Comentários** em posts
- [ ] **Sistema de notificações** push
- [ ] **Upload de arquivos** (PDF, vídeos)

#### Performance
- [ ] Cache local com **SQLite**
- [ ] Modo offline com **sincronização**
- [ ] **Lazy loading** de imagens

---

## 👥 9. Contato

**Tech Challenge:** Fase 04 - Welcome to Mobile  
**Pós-Tech FIAP** - Full Stack Development  
**Data:** Janeiro 2026  

---

## 📄 10. Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do Tech Challenge da Pós-Tech FIAP.

**MIT License** - Uso educacional

---

**📱 SmartClass Mobile - Transformando Educação através da Tecnologia Mobile**
