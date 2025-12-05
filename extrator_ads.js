var CONFIG = {
  campaignNameContains: "aquecimento"
};

function main() {
  Logger.log("--- INICIANDO EXTRAÇÃO DE DATOS ---");

  var campaignIterator = AdsApp.campaigns()
    .withCondition("Name CONTAINS_IGNORE_CASE '" + CONFIG.campaignNameContains + "'")
    .withCondition("Status = ENABLED")
    .withCondition("AdvertisingChannelType = SEARCH")
    .get();

  if (!campaignIterator.hasNext()) {
    Logger.log("Nenhuma campanha encontrada com: " + CONFIG.campaignNameContains);
    return;
  }

  while (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();

    Logger.log("\n============================================");
    Logger.log("CAMPANHA: " + campaign.getName());
    Logger.log("============================================");

    Logger.log("[CONFIGURAÇÕES]");
    Logger.log("Orçamento: " + campaign.getBudget().getAmount());
    Logger.log("Estratégia de Lances: " + campaign.getBiddingStrategyType());

    if (typeof campaign.isTargetingSearchNetwork === "function") {
      Logger.log("Rede de Pesquisa: " + campaign.isTargetingSearchNetwork());
    }

    if (typeof campaign.isTargetingContentNetwork === "function") {
      Logger.log("Rede de Display: " + campaign.isTargetingContentNetwork());
    }

    if (typeof campaign.isTargetingSearchPartners === "function") {
      Logger.log("Parceiros de Pesquisa: " + campaign.isTargetingSearchPartners());
    }

    // GRUPOS DE ANÚNCIOS
    var adGroupIterator = campaign.adGroups().get();

    while (adGroupIterator.hasNext()) {
      var adGroup = adGroupIterator.next();

      Logger.log("\n   -----------------------------------------");
      Logger.log("   GRUPO: " + adGroup.getName());

      // STATUS UNIVERSAL (FUNCIONA EM 100% DAS CONTAS)
      var status = "DESCONHECIDO";
      if (typeof adGroup.isEnabled === "function" && adGroup.isEnabled()) {
        status = "ENABLED";
      } else if (typeof adGroup.isPaused === "function" && adGroup.isPaused()) {
        status = "PAUSED";
      } else if (typeof adGroup.isRemoved === "function" && adGroup.isRemoved()) {
        status = "REMOVED";
      }
      Logger.log("   Status: " + status);

      // PALAVRAS-CHAVE
      Logger.log("   [PALAVRAS-CHAVE]");
      var keywordIterator = adGroup.keywords().get();

      if (!keywordIterator.hasNext()) {
        Logger.log("      (Nenhuma palavra-chave)");
      }

      while (keywordIterator.hasNext()) {
        var kw = keywordIterator.next();
        Logger.log("      - " + kw.getText() + " (" + kw.getMatchType() + ")");
      }

      // ANÚNCIOS
      Logger.log("   [ANÚNCIOS]");
      var adIterator = adGroup.ads().get();

      while (adIterator.hasNext()) {
        var ad = adIterator.next();

        Logger.log("      Tipo: " + ad.getType());

        if (ad.getType() === "RESPONSIVE_SEARCH_AD") {

          var rsa = ad.asType().responsiveSearchAd();

          // URL final segura
          var urls = [];
          try {
            urls = rsa.getFinalUrls();
          } catch (e) {
            try {
              urls = [rsa.urls().getFinalUrl()];
            } catch (e2) {
              urls = [];
            }
          }

          var finalUrl = (urls && urls.length > 0) ? urls[0] : "Sem URL definida";
          Logger.log("      URL Final: " + finalUrl);

          // Títulos
          var headlines = rsa.getHeadlines();
          Logger.log("      Títulos:");
          for (var i = 0; i < headlines.length; i++) {
            Logger.log("        " + (i + 1) + ": " + headlines[i].text);
          }

          // Descrições
          var descriptions = rsa.getDescriptions();
          Logger.log("      Descrições:");
          for (var j = 0; j < descriptions.length; j++) {
            Logger.log("        " + (j + 1) + ": " + descriptions[j].text);
          }

        } else {
          Logger.log("      (Anúncio não responsivo - detalhes básicos)");
          Logger.log("      ID: " + ad.getId());
        }

        Logger.log("      ---");
      }
    }
  }

  Logger.log("\n--- FIM DA EXTRAÇÃO ---");
}
