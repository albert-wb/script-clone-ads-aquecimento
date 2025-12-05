// ===============================================================
// --- CONFIGURAÇÃO FÁCIL ---
// ===============================================================

var LINK_INSTAGRAM = "http://instagram.com/kimmorc";   // Coloque o link aqui

// ===============================================================

var DATA = {
  // Nome da campanha simplificado (sem nome do perfil)
  "name": "aquecimento INSTA - " + new Date().toISOString().slice(0, 10),
  "budget": 0.50,
  "bidding": "Maximize Clicks", 
  "channelType": "Search", 

  "adGroups": [
    {
      "name": "Grupo de anúncios 1",

      "keywords": [
        { "text": "instagram", "matchType": "Broad" },
        { "text": "instagram account", "matchType": "Broad" },
        { "text": "insta photo", "matchType": "Broad" },
        { "text": "instagram post", "matchType": "Broad" },
        { "text": "insta ig", "matchType": "Broad" },
        { "text": "post instagram", "matchType": "Broad" },
        { "text": "photos for instagram", "matchType": "Broad" },
        { "text": "instagram videos", "matchType": "Broad" },
        { "text": "video para instagram", "matchType": "Broad" },
        { "text": "instagram clip", "matchType": "Broad" },
        { "text": "instagram c9m", "matchType": "Broad" },
        { "text": "instagram photos and videos", "matchType": "Broad" },
        { "text": "story ig", "matchType": "Broad" },
        { "text": "videos from instagram", "matchType": "Broad" },
        { "text": "instagram for videos", "matchType": "Broad" },
        { "text": "instagram coms", "matchType": "Broad" },
        { "text": "story insta", "matchType": "Broad" },
        { "text": "instagram and videos", "matchType": "Broad" },
        { "text": "reels instagram", "matchType": "Broad" },
        { "text": "reels video", "matchType": "Broad" },
        { "text": "instagram ke video", "matchType": "Broad" },
        { "text": "photos and videos instagram", "matchType": "Broad" },
        { "text": "instagram and photos", "matchType": "Broad" },
        { "text": "instagram ka video", "matchType": "Broad" },
        { "text": "videos instagram videos", "matchType": "Broad" },
        { "text": "instagram videos photos", "matchType": "Broad" },
        { "text": "instagram se photo", "matchType": "Broad" },
        { "text": "photos and videos on instagram", "matchType": "Broad" },
        { "text": "photos instagram photos", "matchType": "Broad" },
        { "text": "instagram aur video", "matchType": "Broad" },
        { "text": "instagram de video", "matchType": "Broad" },
        { "text": "instagram ir", "matchType": "Broad" },
        { "text": "instagram mein video", "matchType": "Broad" },
        { "text": "instagram video mein", "matchType": "Broad" },
        { "text": "video mein instagram", "matchType": "Broad" }
      ],

      "ads": [
        {
          "finalUrl": LINK_INSTAGRAM,
          "headlines": [
            "Instagram",
            "Instagram photos and videos"
            // Removido o 3º título que dependia do nome
          ],
          "descriptions": [
            "instrgam",
            "dasindaw"
          ]
        }
      ]
    }
  ]
};

function main() {
  Logger.log("=== INICIANDO CRIAÇÃO ===");
  Logger.log("Link alvo: " + LINK_INSTAGRAM);

  var columns = [
    "Action", 
    "Campaign", 
    "Budget", 
    "Bid Strategy Type", 
    "Campaign type", 
    "Campaign status",
    "EU political ads",
    "Ad Group", 
    "Keyword", 
    "Match Type", 
    "Ad type", 
    "Final URL",
    "Headline 1", "Headline 2", "Headline 3", 
    "Description 1", "Description 2"
  ];

  var upload = AdsApp.bulkUploads().newCsvUpload(columns, {moneyInMicros: false});

  // 1. Linha da CAMPANHA
  upload.append({
    "Action": "Add",
    "Campaign": DATA.name,
    "Budget": DATA.budget,
    "Bid Strategy Type": DATA.bidding,
    "Campaign type": DATA.channelType, 
    "Campaign status": "Enabled",
    "EU political ads": "No" 
  });

  // Iterar sobre Grupos
  DATA.adGroups.forEach(function(group) {
    
    // 2. Linha do GRUPO DE ANÚNCIOS
    upload.append({
      "Action": "Add",
      "Campaign": DATA.name,
      "Ad Group": group.name,
      "Campaign status": "Enabled"
    });

    // 3. Linhas das PALAVRAS-CHAVE
    group.keywords.forEach(function(kw) {
      upload.append({
        "Action": "Add",
        "Campaign": DATA.name,
        "Ad Group": group.name,
        "Keyword": kw.text,
        "Match Type": kw.matchType
      });
    });

    // 4. Linhas dos ANÚNCIOS (RSA)
    group.ads.forEach(function(ad) {
      var adRow = {
        "Action": "Add",
        "Campaign": DATA.name,
        "Ad Group": group.name,
        "Ad type": "Responsive search ad",
        "Final URL": ad.finalUrl
      };

      // Mapear Títulos dinamicamente
      ad.headlines.forEach(function(h, index) {
        adRow["Headline " + (index + 1)] = h;
      });

      // Mapear Descrições dinamicamente
      ad.descriptions.forEach(function(d, index) {
        adRow["Description " + (index + 1)] = d;
      });

      upload.append(adRow);
    });

  });

  Logger.log("Dados preparados. Enviando...");
  
  upload.apply();

  Logger.log("=== PROCESSO CONCLUÍDO ===");
  Logger.log("Campanha criada: " + DATA.name);
}
