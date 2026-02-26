# 🔧 Guia para Resolver Conflitos de Merge Localmente

## Passo 1: Preparar o ambiente

```bash
# Certifique-se de estar na branch main
git checkout main

# Atualize a main com as últimas alterações do remoto
git pull origin main

# Atualize a homologacao também
git checkout homologacao
git pull origin homologacao
```

## Passo 2: Fazer o merge localmente

```bash
# Volte para a main
git checkout main

# Tente fazer o merge da homologacao na main
git merge homologacao
```

**Neste momento, os conflitos aparecerão.**

## Passo 3: Ver quais arquivos têm conflitos

```bash
# Liste os arquivos com conflito
git status
```

Os arquivos em conflito aparecerão em vermelho com a mensagem "both modified".

## Passo 4: Resolver os conflitos

Abra cada arquivo com conflito no VS Code. Você verá marcações assim:

```
<<<<<<< HEAD
código da branch main
=======
código da branch homologacao
>>>>>>> homologacao
```

**Para cada conflito, escolha:**
- **Accept Current Change** (manter o código da main)
- **Accept Incoming Change** (usar o código da homologacao)
- **Accept Both Changes** (manter ambos)
- **Editar manualmente** (escolher partes de cada um)

**Dica:** Como a homologacao é a versão mais recente com todas as features, geralmente você vai querer aceitar as mudanças dela (Accept Incoming Change).

## Passo 5: Após resolver todos os conflitos

```bash
# Adicione os arquivos resolvidos
git add .

# Finalize o merge
git commit -m "Merge branch homologacao into main - conflitos resolvidos"
```

## Passo 6: Enviar para o GitHub

```bash
# Envie a main atualizada
git push origin main
```

## ⚠️ Comandos de Emergência

Se algo der errado e você quiser cancelar o merge:

```bash
# Abortar o merge e voltar ao estado anterior
git merge --abort
```

## 📋 Checklist

- [ ] Fiz backup ou commit de todas as alterações
- [ ] Atualizei main e homologacao com git pull
- [ ] Iniciei o merge: `git merge homologacao`
- [ ] Resolvi todos os conflitos nos arquivos
- [ ] Testei o site localmente
- [ ] Finalizei com `git add .` e `git commit`
- [ ] Enviei com `git push origin main`

## 💡 Dica Extra

Se houver muitos conflitos, você pode usar uma ferramenta visual:

```bash
# Abrir ferramenta de merge do VS Code
code .
```

Ou usar o merge tool do Git:

```bash
git mergetool
```

---

**Boa sorte! Se precisar de ajuda em algum arquivo específico, me avise.**
