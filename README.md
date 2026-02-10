# 🏥 Projeto PD Clínica

Este repositório contém o desenvolvimento do **Projeto PD Clínica**, um site institucional e funcional de uma clínica médica fictícia, criado como parte de uma **atividade/projeto em grupo** pelos estagiários **Elias Costa, Igor Santos, Matheus Artico e Roger Leal**, integrantes da **Turma Q1 Vênus – Tarde**.

O projeto foi desenvolvido exclusivamente em **front-end**, com foco em organização de código, responsividade, acessibilidade e simulação de funcionalidades comuns a sistemas de clínicas médicas modernas.

---

## Objetivo do Projeto

Desenvolver um site web profissional, acessível e responsivo que represente uma clínica médica moderna, oferecendo:

* Conteúdo institucional
* Apresentação de especialidades médicas
* Blog e artigos informativos
* Área do paciente simulada
* Área administrativa simulada
* Agendamento médico fictício

Não há integração com backend real, banco de dados ou autenticação verdadeira — todas as funcionalidades são simuladas em JavaScript.

---

## Tecnologias Utilizadas

O projeto foi desenvolvido respeitando as tecnologias permitidas na especificação:

* **HTML5** — Estrutura semântica das páginas
* **CSS3** — Estilização e layout
* **Bootstrap 5** — Grid system, componentes e responsividade
* **JavaScript (ES6)** — Validações, simulações de login, interações e funcionalidades dinâmicas

### Tecnologias não utilizadas

* Frameworks JavaScript (React, Vue, Angular, etc.)
* Backend real
* Banco de dados
* APIs externas
* CMS ou templates prontos

---

## Divisão de Tarefas

A equipe se organizou dividindo o desenvolvimento das páginas e funcionalidades da seguinte forma:

### Igor Santos

* Home
* Sobre a Clínica
* Estrutura Física
* Nossa História
* Lista de Especialidades
* Scrum Master (Análise de PRs e Resolução de Conflitos)

### Elias Costa

* Definição de pelo menos 5 especialidades
* Blog
* Página de Artigo Médico
* FAQ
* Convênios

### Roger Leal

* Login
* Cadastro
* Perfil do Paciente
* Agendamento
* Dark-Mode
* Validação de Formulários
* Feedback Visual

### Matheus Artico

* Contato
* Trabalhe Conosco
* Orçamento
* Localização
* Dashboard Administrativo
* Agenda Médica
* Relatórios
* Configurações

---

## Funcionamento do Login (Simulado)

O sistema de login do projeto é **totalmente simulado**, implementado apenas em JavaScript, conforme definido no escopo.

### Acesso à Área Administrativa

Para acessar a **área administrativa**, é obrigatório utilizar **exatamente** as seguintes credenciais:

* **Email:** `admin@gmail.com`
* **Senha:** `12345`

Qualquer tentativa de login com:

* O email `admin@gmail.com` e **senha diferente de `12345`**

resultará em um **alerta**, e o login **não será realizado**.

---

### Acesso à Área do Paciente

Para acessar a **área do paciente**, o sistema aceita:

* **Qualquer email**, desde que **não seja** `admin@gmail.com`
* **Qualquer senha numérica com no mínimo 5 dígitos**

Atendendo a essas condições, o acesso à área do paciente é liberado normalmente.

> Importante: não existe validação real de usuários. Todo o processo é apenas uma simulação visual e funcional.

---

## Fluxo de Desenvolvimento (Git)

O versionamento do projeto seguiu um fluxo de desenvolvimento organizado, utilizando branches para garantir estabilidade e colaboração.

### Estrutura de Branches

* **main**: branch principal, contendo a versão final e estável do projeto
* **homologacao**: branch de integração e testes
* **feature/***: branches para desenvolvimento de novas funcionalidades
* **fix/***: branches para correções

### Fluxo Utilizado

1. A branch **homologacao** foi criada a partir da **main**
2. As branches **feature** e **fix** foram criadas **a partir da homologacao**
3. Após o desenvolvimento, as alterações eram integradas novamente na **homologacao**
4. Ao final do projeto, foi realizado o **merge da homologacao na main**, consolidando a versão final

Esse fluxo permitiu melhor organização, testes e controle de versões durante o desenvolvimento em equipe.

---

## Boas Práticas Adotadas

* Código organizado em pastas
* Separação de HTML, CSS e JavaScript
* Uso de nomes semânticos
* Responsividade para mobile, tablet e desktop
* Acessibilidade com `label`, `aria-label` e textos alternativos
* Feedback visual para ações do usuário

---

## Observações Finais

Este projeto tem caráter **educacional**, sendo desenvolvido como parte das atividades de estágio e aprendizado em desenvolvimento front-end. Todas as funcionalidades que envolvem login, agendamento e áreas restritas são **simulações**, sem qualquer tratamento de dados reais.

---

**Turma:** Q1 Vênus – Tarde
**Projeto:** PD Clínica
**Desenvolvido por:** Elias Costa, Igor Santos, Matheus Artico e Roger Leal
