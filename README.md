Google Ads Script: Aquecimento de Perfil Instagram

Este repositório contém um script para Google Ads desenvolvido para automatizar a criação de campanhas de "aquecimento" para perfis do Instagram.

O objetivo é gerar tráfego qualificado de pesquisa para um perfil específico do Instagram de forma rápida e com baixo custo inicial, ideal para validar contas ou aumentar a atividade no perfil.

🚀 Funcionalidades

Criação Automática: Gera uma campanha completa de Rede de Pesquisa com um único clique.

Compatibilidade Universal: Utiliza o método AdsApp.bulkUploads() (Upload em Massa), garantindo funcionamento tanto na versão Legacy quanto na Nova Experiência de Scripts do Google Ads.

Configuração Simplificada: Basta inserir o link do perfil do Instagram no topo do código.

Estrutura Otimizada:

Orçamento: 0.50 (na moeda da conta).

Estratégia: Maximizar Cliques.

Palavras-chave: Lista pré-definida com +30 termos relacionados ao Instagram (correspondência ampla).

Anúncios: Criação automática de Anúncios Responsivos de Pesquisa (RSA).

Compliance: Já configurado com as flags obrigatórias de "Anúncios Políticos da UE" para evitar erros de upload.

🛠️ Como Usar

Acesse sua conta do Google Ads.

Vá em Ferramentas e Configurações > Ações em Massa > Scripts.

Crie um novo script e cole o código do arquivo criar_campanha_insta.js.

Edite a variável LINK_INSTAGRAM no início do código com a URL do perfil desejado:

var LINK_INSTAGRAM = "[http://instagram.com/seu_perfil](http://instagram.com/seu_perfil)";


Clique em Executar (ou visualizar).

Acompanhe o log. O script enviará os dados via Bulk Upload. A campanha aparecerá na sua conta em alguns instantes.

📝 Nota Técnica

Este script foi desenvolvido para contornar o erro comum newCampaignBuilder is not a function, que ocorre em contas que ainda não migraram totalmente para a nova API de manipulação de entidades. Ao utilizar a construção via CSV/Bulk Upload, o script se torna agnóstico à versão da API JavaScript utilizada na conta.

Isenção de responsabilidade: Este script cria campanhas reais que consomem orçamento. Verifique sempre as configurações de faturamento da sua conta.
