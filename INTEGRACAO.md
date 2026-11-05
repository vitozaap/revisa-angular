# Integração front-end ↔ API do Revisa

Guia para ligar este projeto Angular à API do back-end (Spring Boot). Lista os endpoints, o que enviar, o que volta e como chamar cada um com o `HttpClient`.

---

## 1. Visão geral

- **Endereço da API:** `http://localhost:8080`
- **Front liberado no CORS:** `http://localhost:4200` (o `ng serve` padrão)
- **Login por sessão com cookie.** Ao fazer login, a API devolve um cookie `SESSION` (`HttpOnly`, o JavaScript não consegue ler). O navegador guarda e reenvia esse cookie sozinho, **desde que toda chamada use `withCredentials: true`**. Não existe token para guardar no `localStorage`.
- **Todas as rotas exigem login**, menos `POST /auth/register` e `POST /auth/login`. Sem sessão válida, a resposta é `401`.
- **Formatos:** cadastro e análises usam **JSON**; o login usa **formulário** (`x-www-form-urlencoded`); o envio de currículo usa **`multipart/form-data`**.

---

## 2. Configuração no Angular (fazer uma vez)

### 2.1 Endereço da API no `environment`

```ts
// src/environments/environment.schema.ts
const environmentSchema = z.object({
  production: z.boolean().nonoptional(),
  primeNgLicense: z.string().nonoptional(),
  apiUrl: z.string().nonoptional(),
});
```

```ts
// src/environments/environment.development.ts (e o environment.ts, com a URL de produção)
export const environment: Environment = {
  production: false,
  primeNgLicense: '...',
  apiUrl: 'http://localhost:8080',
};
```

### 2.2 `HttpClient` enviando o cookie em todas as chamadas

```ts
// src/app/credentials.interceptor.ts
import type { HttpInterceptorFn } from '@angular/common/http';

// Toda chamada leva o cookie de sessão (SESSION)
export const credentialsInterceptor: HttpInterceptorFn = (req, next) =>
  next(req.clone({ withCredentials: true }));
```

```ts
// src/app/app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsInterceptor } from './credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([credentialsInterceptor])),
    // ...os providers que já existem
  ],
};
```

Sem o `withCredentials`, o login até responde `200`, mas as chamadas seguintes chegam sem o cookie e recebem `401`.

---

## 3. Erros

A API responde com o **status HTTP** certo, e o front deve escolher a mensagem a partir dele. O corpo do erro tem este formato:

```json
{ "timestamp": "...", "status": 409, "error": "Conflict", "path": "/auth/register" }
```

Em desenvolvimento, o corpo também traz `message` (ex.: "Email já cadastrado") e um `trace` enorme; **em produção eles não vêm**. Por isso, não dependa do `message`.

| Status | Significado no Revisa |
| --- | --- |
| `400` | Dados faltando (cadastro sem campo, currículo vazio, `POST /reviews` sem corpo) |
| `401` | Não está logado, ou email/senha errados no login |
| `404` | Não encontrado, **ou é de outro usuário** (a API não diferencia, de propósito) |
| `409` | Email já cadastrado |
| `500` | Erro no servidor: a IA falhou ou está sobrecarregada, ou um texto passou do tamanho que o banco aceita |
| `502` | A IA devolveu uma nota inválida (raro) |

---

## 4. Endpoints

### 4.1 Autenticação

#### `POST /auth/register` — cadastro

**Envia (JSON):**
```json
{ "name": "Ana Souza", "email": "ana@email.com", "password": "123456" }
```

**Responde `201`:**
```json
{ "id": 1, "name": "Ana Souza", "email": "ana@email.com" }
```

**Erros:** `400` campo faltando · `409` email já cadastrado.

```ts
this.http.post<User>(`${api}/auth/register`, { name, email, password });
```

O cadastro **não faz login**: depois dele, chame o `POST /auth/login`.

#### `POST /auth/login` — login

**Envia: formulário** (não JSON), com os campos `email` e `password`.

**Responde `200`** com corpo vazio e o cookie `SESSION`. **Erro:** `401` (email inexistente ou senha errada; mesma resposta nos dois casos).

```ts
import { HttpParams } from '@angular/common/http';

// HttpParams como corpo vira application/x-www-form-urlencoded automaticamente
const body = new HttpParams().set('email', email).set('password', password);
this.http.post(`${api}/auth/login`, body);
```

Depois do login, chame o `GET /auth/me` para pegar os dados do usuário.

#### `GET /auth/me` — usuário logado

**Responde `200`:**
```json
{ "id": 1, "name": "Ana Souza", "email": "ana@email.com" }
```

**Erro:** `401` não está logado.

```ts
this.http.get<User>(`${api}/auth/me`);
```

Use ao abrir o app (ou num *guard* das rotas logadas): `200` = logado; `401` = mandar para o login. A sessão vale **7 dias sem uso**.

#### `POST /auth/logout` — sair

**Responde `204`** (apaga a sessão no servidor e o cookie).

```ts
this.http.post(`${api}/auth/logout`, null);
```

---

### 4.2 Currículos

Cada envio cria uma **nova versão**; a análise usa sempre a **mais recente** (o "currículo atual"). As versões antigas ficam guardadas, mas não há rota para listá-las nem para baixar o PDF.

#### `POST /resumes` — enviar currículo

**Envia: `multipart/form-data`** com o arquivo no campo **`file`**.

**Responde `201`:**
```json
{ "id": 3, "fileName": "curriculo-ana.pdf", "uploadedAt": "2026-11-05T14:30:00" }
```

**Erro:** `400` arquivo vazio.

```ts
const form = new FormData();
form.append('file', file); // o File vindo do <input type="file">
this.http.post<Resume>(`${api}/resumes`, form);
```

- **Não defina o `Content-Type` manualmente**: o navegador monta o `multipart/form-data` sozinho.
- **A API não confere se é PDF nem o tamanho do arquivo.** Mantenha o `validateResumeFile` (`src/app/utils/resume-file.ts`) e o `accept="application/pdf"` antes de enviar. O limite do servidor é **5 MB**; acima disso, a resposta é erro.

#### `GET /resumes/current` — currículo atual

**Responde `200`:**
```json
{ "id": 3, "fileName": "curriculo-ana.pdf", "uploadedAt": "2026-11-05T14:30:00" }
```

**Erro:** `404` o usuário ainda não enviou nenhum currículo.

```ts
this.http.get<Resume>(`${api}/resumes/current`);
```

Serve para saber se o usuário já tem currículo (`404` → mostrar a tela de envio antes de liberar a nova análise), mostrar qual arquivo será analisado e pegar o `id` para excluir.

#### `DELETE /resumes/{id}` — excluir currículo

**Responde `204`.** Apaga também **todas as análises desse currículo**. **Erro:** `404` (não existe ou é de outro usuário).

```ts
this.http.delete(`${api}/resumes/${id}`);
```

Avise o usuário antes, porque as análises somem junto.

---

### 4.3 Análises

#### `POST /reviews` — nova análise

Analisa o **currículo atual** com a IA. A vaga é opcional.

**Envia (JSON):**
```json
{ "jobTitle": "Desenvolvedora Front-end", "jobDescription": "Vaga com Angular, testes..." }
```
**Sem vaga:** envie `{}` (o corpo é obrigatório; sem corpo nenhum, a resposta é `400`).

**Responde `201`** com a análise completa (formato na seção 4.4). **Leva uns 10 segundos**: mostre um carregamento.

**Erros:** `404` o usuário não tem currículo · `500` a IA falhou ou está sobrecarregada (dá para tentar de novo) · `502` nota inválida da IA.

```ts
this.http.post<Review>(`${api}/reviews`, { jobTitle, jobDescription });
this.http.post<Review>(`${api}/reviews`, {}); // sem vaga
```

**A API não valida os textos**; as regras ficam no front (já estão no `new-analysis-form.ts`):
- título com no máximo **120** caracteres e descrição com no máximo **4000** (acima do limite do banco, a resposta é `500`);
- título obrigatório quando houver descrição;
- considera-se que "há vaga" quando a **descrição** não está vazia. Só título, sem descrição, vira análise sem vaga.

#### `GET /reviews` — histórico

**Responde `200`** com a lista de análises do usuário, **da mais recente para a mais antiga** (vazia se não houver).

```ts
this.http.get<Review[]>(`${api}/reviews`);
```

#### `GET /reviews/{id}` — uma análise (relatório)

**Responde `200`** com a análise. **Erro:** `404` (não existe ou é de outro usuário).

```ts
this.http.get<Review>(`${api}/reviews/${id}`);
```

#### `DELETE /reviews/{id}` — excluir análise

**Responde `204`.** **Erro:** `404`.

```ts
this.http.delete(`${api}/reviews/${id}`);
```

### 4.4 Formato da análise (`Review`)

```json
{
  "id": 12,
  "resumeId": 3,
  "fileName": "curriculo-ana.pdf",
  "jobTitle": "Desenvolvedora Front-end",
  "jobDescription": "Vaga com Angular, testes...",
  "finalScore": 53,
  "resumeScore": 62,
  "jobAdherenceScore": 45,
  "feedbackTitle": "NEEDS_ATTENTION",
  "feedbackDescription": "Boa base técnica, mas faltam resultados mensuráveis e requisitos como testes.",
  "strengths": ["Experiência prática com Angular."],
  "weaknesses": ["Experiências descrevem só tarefas: inclua resultados com números."],
  "formattingErrors": [{ "original": "javascript", "suggestion": "JavaScript" }],
  "attendedRequirements": ["Angular"],
  "notAttendedRequirements": ["Testes automatizados"],
  "createdAt": "2026-11-05T14:31:10.123"
}
```

| Campo | Observação |
| --- | --- |
| `jobTitle`, `jobDescription` | `null` em análise sem vaga |
| `jobAdherenceScore` | `null` em análise sem vaga |
| `attendedRequirements`, `notAttendedRequirements` | **listas vazias** em análise sem vaga |
| listas em geral | nunca vêm `null`; no máximo vazias |
| `finalScore` | sem vaga = `resumeScore`; com vaga = média de `resumeScore` e `jobAdherenceScore` |
| `feedbackTitle` | um de 5 valores (tabela abaixo), calculado pela `finalScore` |
| `fileName` | nome do currículo analisado (para o histórico) |
| `createdAt` | **texto** no formato ISO, sem fuso (horário do servidor); converta com `new Date(...)` se precisar |

**`feedbackTitle` → texto na tela** (as cores ficam a critério do design):

| Valor | Texto | `finalScore` |
| --- | --- | --- |
| `EXCELLENT` | Excelente | 90–100 |
| `VERY_GOOD` | Muito bom | 75–89 |
| `GOOD_WITH_ADJUSTMENTS` | Bom, com ajustes | 60–74 |
| `NEEDS_ATTENTION` | Precisa de atenção | 40–59 |
| `INSUFFICIENT` | Insuficiente | 0–39 (inclui "o arquivo não é um currículo") |

---

## 5. Ajustes nos models do front (`src/app/models/review.ts`)

Os models atuais foram feitos antes da API e diferem dela:

```ts
// Antes: tinha path, userId, createdAt e updatedAt. A API devolve só isto:
export interface Resume {
  id: number;
  fileName: string;
  uploadedAt: string; // ISO
}

// Antes: só 3 valores
export type FeedbackTitle =
  | 'EXCELLENT'
  | 'VERY_GOOD'
  | 'GOOD_WITH_ADJUSTMENTS'
  | 'NEEDS_ATTENTION'
  | 'INSUFFICIENT';

export interface Review {
  id: number;
  resumeId: number;
  fileName: string; // novo: vem da API
  jobTitle: string | null;
  jobDescription: string | null;
  finalScore: number;
  resumeScore: number;
  jobAdherenceScore: number | null;
  feedbackTitle: FeedbackTitle;
  feedbackDescription: string;
  strengths: string[];
  weaknesses: string[];
  formattingErrors: FormattingError[];
  attendedRequirements: string[];
  notAttendedRequirements: string[];
  createdAt: string; // ISO; antes era Date
}

export interface User {
  id: number;
  name: string;
  email: string;
}
```

Depois, troque os dados de exemplo (`src/app/mocks/reviews.ts`) pelas chamadas acima.

---

## 6. Fluxos principais

1. **Abrir o app:** `GET /auth/me` → `200` segue logado; `401` vai para o login.
2. **Cadastro:** `POST /auth/register` → `POST /auth/login` → `GET /auth/me`.
3. **Login:** `POST /auth/login` (formulário) → `GET /auth/me`.
4. **Nova análise:**
   1. `GET /resumes/current`; se `404`, pedir o envio;
   2. se precisar, `POST /resumes` com o PDF;
   3. `POST /reviews` com a vaga (ou `{}`), mostrando um carregamento;
   4. abrir o relatório com a análise que voltou (ou `GET /reviews/{id}`).
5. **Histórico:** `GET /reviews`; ao excluir, `DELETE /reviews/{id}` e remover da lista.
6. **Trocar de currículo:** `POST /resumes` com o novo arquivo; as próximas análises usam o novo.
7. **Sair:** `POST /auth/logout` → tela de login.

---

## 7. Checklist

- [ ] `apiUrl` no `environment` e no schema
- [ ] `provideHttpClient` com o interceptor de `withCredentials`
- [ ] Login com `HttpParams` (formulário), e não JSON
- [ ] `GET /auth/me` para saber se está logado
- [ ] Envio de currículo com `FormData`, campo `file`, sem `Content-Type` manual
- [ ] Validação do PDF e dos 5 MB antes do envio (já existe)
- [ ] `{}` no `POST /reviews` sem vaga; carregamento de ~10 s
- [ ] Limites de 120/4000 caracteres e título obrigatório com descrição (já existem)
- [ ] Models atualizados (seção 5), incluindo os 5 valores do `feedbackTitle`
- [ ] Mensagens de erro escolhidas pelo status (seção 3)
- [ ] Aviso antes de excluir currículo (apaga as análises dele)

## 8. Rodando o back localmente

Na pasta do back-end: `./mvnw spring-boot:run` (precisa de Java 27 e Docker ligado; o Postgres e o armazenamento de arquivos sobem sozinhos). Para as análises funcionarem, o back precisa de uma chave do Gemini na variável de ambiente `GEMINI_API_KEY`.
