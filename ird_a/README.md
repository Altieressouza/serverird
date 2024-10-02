# Brasileirão Classificação Atualizável

Este é um sistema simples para gerenciar e visualizar a tabela de classificação do Brasileirão. O sistema possui duas páginas principais:

1. **Classificação (`index.html`)**: Exibe a tabela de classificação atualizada.
2. **Adicionar Resultado (`add-result.html`)**: Permite inserir os resultados das partidas.

## **Funcionalidades**

- **Adicionar Resultados de Partidas**: Insira os resultados das partidas selecionando os times e informando os gols marcados.
- **Visualizar Classificação Atualizada**: Veja a tabela de classificação baseada nos resultados inseridos.
- **Persistência de Dados**: Todos os dados são armazenados no `Local Storage` do navegador, garantindo que as informações persistam mesmo após recarregar a página.

## **Como Usar**

1. **Abrir a Página de Classificação**
   - Abra o arquivo `index.html` no seu navegador.
   - Aqui você verá a tabela de classificação atualizada com base nos resultados inseridos.

2. **Adicionar Resultados de Partidas**
   - Navegue para a página `add-result.html`.
   - Preencha o formulário selecionando o **Time da Casa** e o **Time Visitante**.
   - Insira os gols marcados por cada time.
   - Clique em **"Adicionar Resultado"** para salvar o resultado.
   - Após adicionar, você será notificado e poderá verificar a classificação atualizada na página de classificação.

## **Personalização de Equipes**

O sistema vem com uma lista inicial de equipes. Para adicionar mais equipes:

1. Abra o arquivo `add-result.js`.
2. Localize o array `initialTeams` e adicione novos objetos de equipe conforme o exemplo:

```javascript
const initialTeams = [
    { id: 1, name: "Flamengo", logo: "URL_DO_LOGO" },
    { id: 2, name: "Palmeiras", logo: "URL_DO_LOGO" },
    // Adicione mais equipes aqui
];
