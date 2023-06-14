![LogotipoWordsGeek](https://github.com/SamaraSilvia81/ProjectGeeksWorldFullstack/assets/100232025/23df698d-9dcf-4d5e-9cd6-01ec441e624e)

# Geek's World - Project Fullstack React Native + NodeJS
![Badge Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=23232e&style=for-the-badge)

## Introdução
![X-men](https://github.com/SamaraSilvia81/ProjectGeeksWorldFullstack/assets/100232025/610988f2-d1b6-4991-b503-bbdf4d265267)

O presente documento tem como por objetivo compor toda a documentação do projeto final das disciplinas de Programação para Dispositivos Móveis e Aplicações Orientada a Serviço, no qual propus a criação de um APP de conteúdo livre, expondo todo o repertório dado em sala de aula.

Nesse viés, esta documentação conterá a visão geral do projeto, bem como os requisitos, funcionalidades, tecnologias e é claro todo o processo de desenvolvimento do projeto. 

A equipe responsável pelo projeto foram os alunos Eudes Clovis Pereira e Samara Silvia Sabino Correa, graduandos do 4° período do curso de Sistemas para Internet.

## Problema 
![Batman Roby](https://github.com/SamaraSilvia81/ProjectGeeksWorldFullstack/assets/100232025/23bd2302-5aec-4847-9cec-c2652b1fad9b)

No contexto cultural atual, a necessidade de um API de catálogo de personagens da Marvel e da DC como forma de entretenimento merece ser problematizada. Vivemos em uma época marcada pela ascensão do universo cinematográfico, no qual filmes de super-heróis se tornaram extremamente populares. 

Essa popularidade despertou o interesse de muitas pessoas em explorar mais a fundo o vasto universo das histórias em quadrinhos, que servem como base para essas adaptações para o cinema.

Diante de pensar, atendendo a necessidade do público surgiu a ideia de criar um APP que auxilie os internautas  a mergulhar mais nesses dois universos.

## Geeks World

O WorldsGeek é um app de informações, voltado a conteúdos visuais. No qual, por meio do seu sistema ele busca otimizar, flexibilizar e facilitar o acesso aos recursos nerds, referentes à Marvel e a DC.

Esse app, entrega ao seu usuário um conteúdo rápido e de fácil acesso, incluindo a visualização de cards segregados entre heróis e vilões, uma página com o nome, nickname, descrição e poderes daquele personagem; e a possibilidade de criar pastas como “favoritos’, sugerido pelo sistema, para o usuário guardar os seus heróis ou vilões favoritos de ambas as indústrias no seu perfil. Tudo isso lhe será concedido quando o mesmo se logar no app com um email de sua preferência.

Assim, pelo acesso facilitado a tais informações, o usuário poderá usufruir do app com conforto.

## Tecnologias
## Entidades e Relacionamentos

### User
![Miles](https://github.com/SamaraSilvia81/ProjectGeeksWorldFullstack/assets/100232025/dff42b8f-3261-4529-b027-ae286a68f94a)
A entidade USER foi criada para que o cliente não perca os seus dados, visto que como existe a funcionalidade de criar listas e adicionar os seus personagens favoritos nela, foi necessário essa autenticação.

### Character
![PeterPark](https://github.com/SamaraSilvia81/ProjectGeeksWorldFullstack/assets/100232025/f86c8696-96aa-4655-8191-e27ae4cfe49a)
A entidade CHARACTER foi criada para expor os dados mais cruciais acerca dos dois universos cinematográficos, explorando seus habilidades, identidades, relacionamentos e entre outros aspectos.

### List
![Gwen](https://github.com/SamaraSilvia81/ProjectGeeksWorldFullstack/assets/100232025/0f8e9ec4-a2dc-48f1-9f1f-0a3c9f7f338b)
A entidade LIST foi criada para que o usuário pudesse interagir com o app guardando em uma "lista" os seus personagens favoritos.

## Requisitos Funcionais
![Wanda](https://github.com/SamaraSilvia81/ProjectGeeksWorldFullstack/assets/100232025/0b6ace94-b092-420f-b7b4-65fe665bf7d3)

### Criação da conta e login 
Essa funcionalidade conta com a inserção do nome/email e senha do usuário. Ela, por sua vez, estará disposta na segunda tela que aparece para o geek que inicialmente irá navegar para a parte inferior da tela, clicando em "SignUP" para se cadastrar e após ter feito isso e queira entrar no app é só fazer o login.

### Visualização de Personagens
Tendo feito, o cadastro no app ou realizado o login, o usuário terá acesso aos recursos do app, no qual inclui a prima visa a visualização dos personagens. Para isso, ele terá que selecionar que tipo de personagem quer vê clicando em um dos cards "Marvel" ou "DC" e depois repetirá o mesmo processo, mas agora para decidir se quer vê um "Herói" ou "Vilão".

### Página de Personagens
Essa página é onde estará os dados dos personagens, no caso o seu nome, altergo, atributos, relacionamentos, poderes e ademais características. Além de, ter a opção para adicionar esse personagem a alguma lista existente, apenas clicando no botão "Add to List".

### Criação e Visualização de Listas
Na barra de navegação inferior do app, o usuário poderá escolher entre ir para a tela home, no qual verá os personagens ou visualizar/criar a sua lista. Quando ele navegar para essa página logo de imediato conterá uma lista chamada "MyList" gerada automaticamente pelo sistema, mas clicando no botão, localizado no lado extremo direito superior, poderá criar uma inserindo o seu nome.

### Editar e Deletar lista
Ainda na página de listas, o usuário verá que no card de lista tem dois botões um para editar e outro para deletar.

### Personagens da Lista
Tendo visualizado suas listas, quando o usuário clicar em uma aparecerá no primeiro contato verá apenas um botão no meio da página para adicionar um personagem. Depois disso, ele poderá vê o card dos personagens que ele adicionou e na parte extrema superior direita verá um botão para adicionar mais caso queira.

## Squad
