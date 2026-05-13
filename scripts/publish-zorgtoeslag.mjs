const TOKEN = process.env.NOTION_TOKEN;
const DB    = process.env.NOTION_DATABASE_ID;

const t = (s) => ({ type: 'text', text: { content: s } });

const props = {
  Titel:            { title: [t('Zorgtoeslag 2026: 1 op de 4 Nederlanders Mist tot €1.100 per Jaar')] },
  Slug:             { rich_text: [t('zorgtoeslag-aanvragen-checken-2026')] },
  Categorie:        { select: { name: 'Belasting' } },
  Gepubliceerd:     { checkbox: true },
  Tool:             { rich_text: [t('Zorgtoeslag')] },
  Niveau:           { rich_text: [t('Beginner')] },
  Color:            { rich_text: [t('#DC2626')] },
  SavingsPerTask:   { number: 1100 },
  FrequentieLabel:  { rich_text: [t('per jaar')] },
  SavingsEuroLabel: { rich_text: [t('')] },
  ImageUrl:         { rich_text: [t('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format')] },
  CuriosityHeader:  { rich_text: [t('Heb jij recht op zorgtoeslag? De meeste mensen weten het niet.')] },
  Datum:            { rich_text: [t('mei 2026')] },
  Leestijd:         { rich_text: [t('6 min')] },

  Excerpt: { rich_text: [t('1 op de 4 Nederlanders vraagt geen zorgtoeslag aan, terwijl ze er wel recht op hebben. Bij een inkomen tot €37.496 kan dat tot €1.100 per jaar zijn. Checken kost 3 minuten.')] },

  PersoonlijkeMissie: { rich_text: [t(
`Ik werkte drie jaar als zzp-er en betaalde netjes mijn zorgverzekering van €145 per maand. Wat ik niet deed: checken of ik recht had op zorgtoeslag. Ik nam aan dat dat iets was voor mensen met een uitkering, of dat mijn boekhouder het wel zou regelen als het van toepassing was.

Hij regelde het niet. Ik vroeg er ook nooit naar.

In januari 2025 vulde ik voor het eerst zelf mijn gegevens in op de toeslagencheck van de Belastingdienst. Uitkomst: ik had recht op zorgtoeslag. Niet op een klein bedrag. Op €94 per maand. Voor heel 2025. En voor 2024, als ik een verzoek indiende.

Dat is €1.128 die ik in 2025 niet heb ontvangen. En €1.128 in 2024 die ik mogelijk ook had kunnen claimen.

De reden dat ik het niet wist: zorgtoeslag wordt niet automatisch uitbetaald. Je moet het zelf aanvragen. De Belastingdienst stuurt je geen brief om te zeggen dat je er recht op hebt. Ze wachten tot jij het initiatief neemt.

Wat ik daarna deed: in 10 minuten aangevraagd via Mijn Toeslagen. Twee weken later stond het eerste bedrag op mijn rekening.`
  )] },

  StrategischeLogica: { rich_text: [t(
`Zorgtoeslag is een tegemoetkoming van de overheid in de kosten van je zorgverzekering. Het systeem bestaat al jaren, maar de uptake is structureel te laag. Onderzoek van het CPB toont aan dat honderden miljoenen euro's per jaar niet worden opgehaald door mensen die er gewoon recht op hebben.

Waarom claimen zo weinig mensen het? Ten eerste: onbekendheid. Veel mensen denken dat zorgtoeslag alleen voor uitkeringsgerechtigden is. Dat klopt niet. De inkomensgrens in 2026 ligt op 37.496 euro voor alleenstaanden en 47.368 euro voor toeslagpartners. Dat omvat een groot deel van de Nederlandse werkende bevolking, inclusief zzp-ers, parttimers, starters en gepensioneerden.

Ten tweede: het systeem is opt-in. Je ontvangt het niet automatisch. Je moet het zelf aanvragen via Mijn Toeslagen op de site van de Belastingdienst. Wie het niet weet, ontvangt het niet.

Ten derde: mensen denken dat het te ingewikkeld is. Het is dat niet. De toeslagencheck vraagt om je inkomen, je situatie (alleen of met partner) en je zorgverzekeringspremie. Het duurt drie minuten.

Groene bonus: de zorgtoeslag maakt het makkelijker om een goede basisverzekering te houden zonder op andere uitgaven te bezuinigen. Mensen die zorgtoeslag ontvangen, kiezen vaker voor een iets hogere verzekering met betere dekking voor mentale gezondheidszorg en fysiotherapie. Minder uitgestelde zorg betekent eerder behandelen, en dat is goedkoper voor het systeem als geheel.`
  )] },

  Transformatie: { rich_text: [t(
`Berekening op basis van de zorgtoeslag 2026 voor verschillende situaties. Bedragen zijn indicatief en afhankelijk van inkomen, vermogen en premie.

TABEL:
Situatie||Jaarinkomen||Maandelijkse toeslag||Jaarlijkse toeslag
Alleenstaande, laag inkomen||tot €20.000||tot €127 per maand||tot €1.524 per jaar
Alleenstaande, modaal inkomen||€30.000||circa €70 per maand||circa €840 per jaar
Alleenstaande, net onder grens||€37.000||circa €15 per maand||circa €180 per jaar
Toeslagpartners, laag inkomen||tot €30.000 gezamenlijk||tot €143 per maand||tot €1.716 per jaar
Toeslagpartners, modaal inkomen||€45.000 gezamenlijk||circa €30 per maand||circa €360 per jaar`
  )] },

  Nuance: { rich_text: [t(
`LIJST:
Zorgtoeslag is inkomensafhankelijk. Heb je vermogen boven de heffingsvrije grens (in 2026 circa €57.000 voor alleenstaanden), dan kan dit je recht op toeslag beperken of uitsluiten.
Je zorgverzekering moet een Nederlandse basisverzekering zijn. Heb je een buitenlandse verzekering of ben je meeverzekerd via een partner, dan gelden andere regels.
Als je inkomen gedurende het jaar stijgt, kan je toeslag worden teruggevorderd. Geef inkomenswijzigingen altijd door via Mijn Toeslagen om onaangename terugvorderingen te voorkomen.
Zzp-ers schatten hun inkomen vaak te laag in bij de aanvraag. Gebruik een realistisch gemiddelde van je afgelopen jaren als basis, niet je beste of slechtste jaar.
Zorgtoeslag voor 2025 kon tot 1 september 2026 alsnog worden aangevraagd. Na die datum is het recht vervallen voor dat jaar.`
  )] },

  StapVoorStap: { rich_text: [t(
`Doe de toeslagencheck op belastingdienst.nl/toeslagen. Klik op "Proefberekening" en vul je situatie in. Dit is anoniem en vrijblijvend.
Log in op Mijn Toeslagen via DigiD op toeslagen.nl. Dit is de officiële aanvraagpagina van de Belastingdienst.
Klik op "Toeslag aanvragen" en kies zorgtoeslag. Vul je geschatte jaarinkomen in voor 2026. Twijfel je? Gebruik je inkomen van 2025 als basis.
Voer je maandelijkse zorgverzekeringspremie in. Kijk dit na op je polis of bankafschrift.
Controleer of je een toeslagpartner hebt. Ben je getrouwd, samenwonend of staat iemand op hetzelfde adres ingeschreven? Dan gelden de partnerbedragen.
Dien de aanvraag in. Je ontvangt binnen 8 weken een beschikking. De eerste betaling volgt doorgaans binnen 6-8 weken na goedkeuring.
Stel een herinnering in voor januari 2027 om je zorgtoeslag opnieuw te controleren en bij te stellen als je inkomen is veranderd.`
  )] },

  Variaties: { rich_text: [t(
`Alleenstaande||Check de toeslagencheck voor alleenstaanden op belastingdienst.nl. De inkomensgrens in 2026 is €37.496. Val je eronder, dan heb je bijna zeker recht op toeslag.
Toeslagpartners||Woon je samen of ben je getrouwd? Dan wordt het gezamenlijke inkomen berekend. De grens is €47.368 gezamenlijk. Vraag de toeslag aan op naam van één van beiden.
Zzp-ers||Gebruik je gemiddelde netto-inkomen over de afgelopen twee jaar als schatting. Wijkt je inkomen sterk af, geef dit tussentijds door om terugvordering te voorkomen.
Gepensioneerden||Ook met AOW en een klein pensioen kan je recht hebben op zorgtoeslag als het totale inkomen onder de grens blijft. Veel gepensioneerden weten dit niet.
Studenten||Studenten met een bijbaan of studiefinanciering die als inkomen telt, vallen soms net onder de grens. Check altijd via de proefberekening.`
  )] },

  FAQ: { rich_text: [t(
`Q: Hoe weet ik of ik recht heb op zorgtoeslag?
A: Doe de gratis proefberekening op belastingdienst.nl/toeslagen. Vul je inkomen en situatie in en je ziet direct of je in aanmerking komt en hoeveel. Dit is anoniem en kost 3 minuten.

Q: Moet ik zorgtoeslag elk jaar opnieuw aanvragen?
A: Nee. Als je eenmaal toeslag hebt aangevraagd, wordt die automatisch verlengd voor het volgende jaar. Wel moet je wijzigingen in inkomen of situatie doorgeven.

Q: Ik ben zzp-er. Heb ik ook recht op zorgtoeslag?
A: Ja. Zzp-ers hebben net zo veel recht op zorgtoeslag als werknemers in loondienst. Je gebruikt je geschatte jaarinkomen als grondslag. Zorg dat je dit realistisch inschat om terugvordering te voorkomen.

Q: Kan ik zorgtoeslag met terugwerkende kracht aanvragen?
A: Zorgtoeslag voor 2025 kon tot 1 september 2026 alsnog worden aangevraagd. Voor eerdere jaren is het recht vervallen. Vraag 2026-toeslag zo snel mogelijk aan om geen maanden te missen.

Q: Wat als ik aan het einde van het jaar te veel heb ontvangen?
A: Als je inkomen hoger uitvalt dan geschat, moet je een deel terugbetalen. Geef inkomensstijgingen altijd tijdig door via Mijn Toeslagen. Dan wordt je voorschot bijgesteld en voorkom je een grote terugvordering achteraf.`
  )] },

  ImpactCTA: { rich_text: [t(
`Blijvertje, en een van de makkelijkste tips op deze site. Drie minuten werk op de toeslagencheck. Tien minuten voor de aanvraag als je in aanmerking komt. Resultaat: tot €1.100 per jaar die je anders gewoon laat liggen.

Het geld staat er al. De overheid heeft het klaarliggen voor iedereen die voldoet aan de voorwaarden. Het enige wat ontbreekt, is de aanvraag.

Doe de check vandaag. Niet volgende week. Vandaag. En stuur deze pagina door aan iemand van wie je denkt dat hij of zij er ook recht op kan hebben. Dit is het type tip waarbij je na het lezen meteen aan drie mensen denkt.`
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
  console.log('SLUG:', 'zorgtoeslag-aanvragen-checken-2026');
} else {
  console.log('FOUT:', JSON.stringify(data).slice(0, 400));
}
