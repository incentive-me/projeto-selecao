<h1>Ilanche</h1>
<h2>Introdução</h2>
  <p>O projeto consiste em reproduzir as caracteristicas mais básicas do ifood.</p>
<h2>Tecnologias</h2>
  <p>O projeto é feito em ReactJS e NodeJS (AdonisJS).</p>
<h2>Porque escolheu essas tecnologias?</h2>
  <p>O ReactJS é um dos frameworks mais famosos no mercado. Criado pela equipe do Facebook, a sua fama se fez porque o reactJS anda de mãos dadas com react native, framework no    qual podemos fazer aplicativo nativo para android e ios de forma muito similar (quase identica) que fazemos projetos web com reactJS.</p>
  <p>Portanto, no front, a escolhe se dá pelo amadurecimento do framework e também pela facilidade de criar um aplicativo android/ios com o react native</p>
  <p>Ahhh... o adonis... Apesar de ser relativamente desconhecido no mercado ele se inspirou (se inspirou MUITO) no framework super conhecido LARAVEL. Num temos o artisan amado pelos programadores PHP, que por linhas de comandos controlam banco de dados (migration, seeds etc) criam models, controllers e diversos arquivos. No AdonisJS temos o mesmo raciocinio. <i>adonis make:model <Model> --migration</i> criamos um model já com o seu migration. Que Desenvolvedor não vai adorar isso?</p>
<p>O Adonis (como o laravel) já vem com várias configurações prontas para criar aplicações robustas. Seu criptografia conta com o Bcript por padrão (uma das cripitografias mais segura no mercado) contando com várias configurações onde fácilmente o desenvolvedor se defende dos ataques mais comum da web (SQL injection, XSS, false request etc)</p>
<p>Enfim, AdonisJS é uma ótima ferramenta para fazer aplicações robustas, segura e com certa facilidade.</p>
<h2>O que foi implementado?</h2>
<p>No momento é possível adicionar categorias, lojas, pratos e usuários. Todos esses itens podem ser adicionados (por enquanto) simplemente fazendo requisições do tipo POST. As requisições podem ser encontradas no caminho <b>start/route.js</b>. Após a criação do user ele ganhará um token e pode usar aplicação para adicionar produtos ao carrinho. Adicionando produtos no carrinho ele pode optar por fazer o pedido, e com isso, o produto vai para sua lista de pedidos.</p>
<p>No back temos o o famoso MRC (Model Router Controller). O back funciona como uma API (fornecendo dados para qualquer tipo de aplicação, retornando um JSON) e no front temos o ReactJS cuidando das views e toda a interação cliente.</p>
<h2>O que ainda será implementado?</h2>
<p>Muito ainda tem que ser feito no projeto. Segue alguns pontos no qual julgo bem importantes:<p>
  <ul>
    <li>Adicionar login/painel para cada loja criada e alí poder criar/atualizar/deletar produtos</li>
    <li>Sistema de promoção para as lojas</li>
    <li>Sistema de cupom para clientes</li>
    <li>Adicionar testes automatizados.</li>
    <li>Melhorar fluxo de compra.</li>
    <li>Melhorar design frontend</li>
    <li>Melhorar segurança da aplicação</li>
    <li>Documentação de como usar a API</li>
  </ul>
<h2>Requisitos para rodar o projeto</h2>
<h3>Back end (AdonisJS)</h3>
<p>O DB usado foi MySQL. Para testar o projeto deve-se fazer o download o MySQL (pode-se baixar o XAMP e ativa-lo pela ferramenta XAMP Controll). Podemos criar um DB com o nome ilanche e depois executar, no terminal, com raiz na pasta do projeto adonis, os seguintes comandos:</p>
<p><i>adonis migration:run</i></p>
<p><i>adonis seed</i></p>
<p><i>adonis serve --dev</i></p>
<p>Os três comandos acima, respectivamente, roda as migrations (criação das tabelas do banco de dados), planta os seeders (faz o INSERT nas tabelas da aplicação) e logo depois roda o servidor. Você pode ter que mudar a configuração no arquivo .env se o seu MySQL não estiver na porta padrão ou tiver coloca uma senha no usuário root. Colocarei um arquivo dump também com alguns registros.</p>
<h3>Front end (ReactJS)</h3>
<p>Depois que clonar o projeto dê um NPM INSTALL para instalar as dependencias. Últimamente algumas pessoas tem tido um problema scss-node. Se ocorrer esse erro basta instalar essa dependencia, em seguida, digitar:
<p><i>npm start</i></p>
<p>e o projeto deve rodar sem problemas.</p>
<h2>Considerações Finais</h2>
<p>Qualquer dúvida ou dificuldade estou disponível para contato ou mesmo bater um bate-papo sobre a implematação do código de um forma geral.</p>
<h2>Links úteis/interessantes</h2>
<p>AdonisJS: https://adonisjs.com/</p>
<p>ReactJS: https://pt-br.reactjs.org/</p>
