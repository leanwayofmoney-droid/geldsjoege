const TOKEN = process.env.NOTION_TOKEN;
const DB    = process.env.NOTION_DATABASE_ID;

const t = (s) => ({ type: 'text', text: { content: s } });

const props = {
  Titel:            { title: [t('Thuiswerken Belasting 2026: €352 per Jaar Extra Netto')] },
  Slug:             { rich_text: [t('thuiswerken-vergoeding-belasting-2026')] },
  Categorie:        { select: { name: 'Belasting' } },
  Gepubliceerd:     { checkbox: true },
  Tool:             { rich_text: [t('Thuiswerkvergoeding')] },
  Niveau:           { rich_text: [t('Beginner')] },
  Color:            { rich_text: [t('#DC2626')] },
  SavingsPerTask:   { number: 352 },
  FrequentieLabel:  { rich_text: [t('per jaar')] },
  SavingsEuroLabel: { rich_text: [t('')] },
  ImageUrl:         { rich_text: [t('https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format')] },
  CuriosityHeader:  { rich_text: [t('Vraag jij al om je thuiswerkvergoeding?')] },
  Datum:            { rich_text: [t('mei 2026')] },
  Leestijd:         { rich_text: [t('5 min')] },

  Excerpt: { rich_text: [t('Thuiswerkvergoeding 2026 is €2,45 per dag. Bij 3 dagen thuis per week laat je €352 per jaar liggen. Eén gesprek met je werkgever volstaat.')] },

  PersoonlijkeMissie: { rich_text: [t(
`In 2024 werkte ik drie dagen per week thuis en twee dagen op kantoor. Ik wist dat er zoiets bestond als een thuiswerkvergoeding, maar deed er niets mee. Ik dacht dat het ingewikkeld was, dat mijn werkgever het vanzelf zou regelen of dat het niet de moeite waard was.

In januari 2026 vroeg een collega terloops of ik al een thuiswerkvergoeding ontving. Ik wist het niet eens. Ze vertelde me dat ze 2,45 euro per dag belastingvrij ontving voor elke dag dat ze vanuit huis werkte. Bij drie dagen per week en 48 werkweken is dat 352,80 euro per jaar. Netto. Niet bruto.

Ik mailde diezelfde middag mijn HR-afdeling. Het duurde twee weken om het in te stellen. Sindsdien staat het maandelijks op mijn loonstrook als onkostenvergoeding. Ik hoef er niets voor te doen.

Wat ik daarna ontdekte: veel collega's hadden dit nog steeds niet aangevraagd. Sommigen waren bang dat het ingewikkeld was. Anderen dachten dat het alleen voor freelancers gold. Geen van beiden klopt. Dit is een gewone, wettelijke vergoeding die elke werknemer mag aanvragen bij zijn werkgever, voor elke dag dat hij structureel vanuit huis werkt.`
  )] },

  StrategischeLogica: { rich_text: [t(
`De thuiswerkvergoeding bestaat officieel sinds 2022 en is sindsdien elk jaar verhoogd via de tabelcorrectiefactor. In 2026 bedraagt het maximale belastingvrije bedrag 2,45 euro per dag. Dit geld is bedoeld om de extra kosten van thuiswerken te dekken: elektriciteit, verwarming, koffie en internet.

Het bijzondere aan deze vergoeding is dat hij volledig buiten de loonbelasting valt. Je werkgever betaalt het bedrag netto uit. Een bruto salarisstijging van 352 euro zou je na belasting (bij een tarief van 36,97%) slechts 222 euro opleveren. De thuiswerkvergoeding geeft je hetzelfde bedrag, maar zonder die 37% korting.

Er geldt wel een regel: je kunt niet op dezelfde dag een thuiswerkvergoeding en een reiskostenvergoeding ontvangen. Als je op dinsdag thuis werkt, krijg je 2,45 euro. Als je op dinsdag naar kantoor rijdt, krijg je de reiskostenvergoeding (0,25 euro per kilometer in 2026). Nooit beide op dezelfde dag. Zorg ervoor dat je werkgever per dag bijhoudt welke vergoeding van toepassing is.

Groene bonus: bij drie thuiswerkdagen per week rij je per jaar circa 6.900 kilometer minder woon-werkverkeer (bij 24 km enkele reis). Dat is een CO2-besparing van meer dan 1.100 kilogram per jaar, gelijkwaardig aan het werk van 50 bomen. De thuiswerkvergoeding maakt dit gedrag financieel aantrekkelijker voor zowel werknemer als werkgever.`
  )] },

  Transformatie: { rich_text: [t(
`Berekening op basis van 48 werkweken per jaar en een thuiswerkvergoeding van 2,45 euro per dag in 2026.

TABEL:
Scenario||Dagen thuis per week||Vergoeding per dag||Jaarlijkse besparing
1 dag thuis (deeltijd)||1 dag||2,45 euro||117,60 euro
2 dagen thuis (hybride)||2 dagen||2,45 euro||235,20 euro
3 dagen thuis (meest voorkomend)||3 dagen||2,45 euro||352,80 euro
4 dagen thuis||4 dagen||2,45 euro||470,40 euro
Volledig thuiswerker (5 dagen)||5 dagen||2,45 euro||588,00 euro`
  )] },

  Nuance: { rich_text: [t(
`LIJST:
Niet elke werkgever heeft de thuiswerkvergoeding ingesteld. Als dit niet zo is, kun je vragen of het wordt toegevoegd aan je arbeidsvoorwaarden. Je werkgever is niet wettelijk verplicht dit te betalen, maar mag het wel belastingvrij uitkeren.
Op dezelfde dag mag je niet zowel een thuiswerkvergoeding als een reiskostenvergoeding ontvangen. Zorg dat je werkgever dit correct administreert per dag.
Bij een wisselend schema vraag je om een gemiddelde vergoeding per maand op basis van je vaste thuiswerkdagen. Sommige werkgevers werken zo al standaard.
De vergoeding geldt per dag dat je daadwerkelijk thuis werkt. Vakantiedagen, ziektedagen en feestdagen tellen niet mee.
ZZP-ers kunnen deze vergoeding niet van een werkgever ontvangen, maar hebben eigen aftrekposten via de aangifte inkomstenbelasting.`
  )] },

  StapVoorStap: { rich_text: [t(
`Check je huidige loonstrook of arbeidsovereenkomst op de aanwezigheid van een thuiswerkvergoeding of onkostenregeling.
Bereken hoeveel dagen per week je structureel vanuit huis werkt. Noteer dit getal voor jezelf.
Stuur een e-mail naar je HR-afdeling of leidinggevende. Vraag of het bedrijf een belastingvrije thuiswerkvergoeding van 2,45 euro per dag aanbiedt.
Als het antwoord nee is: verwijs naar de fiscale ruimte. Werkgevers kunnen dit belastingvrij uitkeren via de werkkostenregeling, zonder extra administratieve last.
Controleer na de eerste loonbetaling of het bedrag correct is verwerkt. Klopt het bedrag niet, neem dan opnieuw contact op met HR.
Vraag ook naar de reiskostenvergoeding voor je kantoordagen. De maximale onbelaste vergoeding in 2026 is 0,25 euro per kilometer (enkele reis).
Sla de bevestigingsmail van HR op. Dit is je bewijs bij een werkgeverswissel of als het bedrag later niet meer klopt.`
  )] },

  Variaties: { rich_text: [t(
`Werknemer in loondienst||Vraag je werkgever om de thuiswerkvergoeding van 2,45 euro per dag. Belastingvrij, eenvoudig in te stellen via de werkkostenregeling.
ZZP-er of freelancer||Maak gebruik van de zelfstandigenaftrek (2.470 euro in 2026) en declareer zakelijke kosten zoals internet, telefoon en kantoormateriaal.
Werknemer met eigen werkruimte thuis||Werkruimte is alleen aftrekbaar als de kamer een zelfstandige ingang en eigen sanitair heeft. In de praktijk zelden van toepassing.
Hybride werker met pendelafstand||Combineer de thuiswerkvergoeding op thuisdagen met de reiskostenvergoeding op kantoordagen voor maximale belastingvrije uitkering.`
  )] },

  FAQ: { rich_text: [t(
`Q: Moet mijn werkgever de thuiswerkvergoeding betalen?
A: Nee, werkgevers zijn niet wettelijk verplicht. Maar ze mogen het wel belastingvrij uitkeren. Veel werkgevers doen dit als je erom vraagt, omdat het via de werkkostenregeling ook voor hen fiscaal gunstig is.

Q: Kan ik de thuiswerkvergoeding en reiskostenvergoeding op dezelfde dag ontvangen?
A: Nee. Op dagen dat je thuis werkt ontvang je 2,45 euro. Op dagen dat je naar kantoor gaat ontvang je de reiskostenvergoeding van maximaal 0,25 euro per kilometer. Beide op dezelfde dag is niet toegestaan.

Q: Hoe hoog is de thuiswerkvergoeding in 2026?
A: 2,45 euro per dag in 2026. Dit bedrag indexeert elk jaar mee via de tabelcorrectiefactor van de Belastingdienst.

Q: Geldt dit ook voor parttime werknemers?
A: Ja. Het bedrag per dag is gelijk, ongeacht hoeveel uur je die dag werkt. Een parttime medewerker die vier dagen vanuit huis werkt heeft recht op dezelfde 2,45 euro per werkdag.

Q: Wat als mijn werkgever weigert?
A: Dat mag wettelijk. Je kunt onderhandelen en wijzen op de fiscale voordelen voor de werkgever, maar je kunt het niet afdwingen. Bekijk dan of andere arbeidsvoorwaarden zoals een thuiswerkplek in natura (bureaustoel, beeldscherm) mogelijk zijn.`
  )] },

  ImpactCTA: { rich_text: [t(
`Blijvertje. Een e-mail van vijf regels naar HR leverde mij 352,80 euro per jaar op. Netto, zonder dat ik iets anders hoef te doen. Dat geld staat sindsdien elke maand automatisch op mijn loonstrook.

Over vijf jaar is dat meer dan 1.760 euro. Geen investering, geen risico, geen abonnement. Alleen het aanvragen van iets waar je al recht op hebt.

De reden dat mensen dit laten liggen is niet onwil. Het is onwetendheid. Mijn collega vertelde het mij bij de koffieautomaat. Nu vertel ik het jou. Stuur die e-mail vandaag nog.`
  )] },
};

const res = await fetch('https://api.notion.com/v1/pages', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  },
  body: JSON.stringify({ parent: { database_id: DB }, properties: props }),
});

const data = await res.json();
if (data.id) {
  console.log('GEPUBLICEERD:', data.id);
  console.log('URL:', data.url);
} else {
  console.log('FOUT:', JSON.stringify(data).slice(0, 500));
}
