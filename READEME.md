#App 

Gympass style app.

## Rfs (REQUISITOS FUNCIONAIS)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o numero de check ins realizado pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RN  (REGRAS DE NEGOCIO)

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [ ] O usuário  não pode fazer 2 check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto da academia(100m)
- [ ] O check in so pode ser validado após 20min ser criado
- [ ] O check-in so pode ser validado por administradores
- [ ] A Academia so pode ser cadastrada por administradores

## RNF (REQUISITOS NÃO FUNCIONAIS)

- [x] A Senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam esta persistidos em um banco PostgreSQL
- [ ] Todas as Listas de Dados, precisam estar paginadas com 20 itens  dedos
- [ ] O usuário deve ser identificado por um JWT(JSON Web Token)