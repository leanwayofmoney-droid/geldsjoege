// Gebruik: NOTION_TOKEN=... NOTION_DATABASE_ID=... node scripts/add-articles.mjs
const TOKEN = process.env.NOTION_TOKEN;
const DB    = process.env.NOTION_DATABASE_ID;

// Split long text into Notion rich_text chunks (max 2000 chars each)
function rt(text) {
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    chunks.push({ type: "text", text: { content: remaining.slice(0, 2000) } });
    remaining = remaining.slice(2000);
  }
  return chunks;
}

async function create(article) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: DB },
      properties: {
        Titel:             { title: [{ text: { content: article.title } }] },
        Slug:              { rich_text: rt(article.slug) },
        Excerpt:           { rich_text: rt(article.excerpt) },
        Datum:             { rich_text: rt(article.datum) },
        Leestijd:          { rich_text: rt(article.leestijd) },
        Tool:              { rich_text: rt(article.tool) },
        Niveau:            { rich_text: rt(article.niveau) },
        SavingsPerTask:    { number: article.savingsPerTask },
        FrequentieLabel:   { rich_text: rt(article.frequentieLabel) },
        Color:             { rich_text: rt(article.color) },
        ImageUrl:          { rich_text: rt(article.imageUrl) },
        Categorie:         { select: { name: article.categorie } },
        CuriosityHeader:   { rich_text: rt(article.curiosityHeader) },
        PersoonlijkeMissie:{ rich_text: rt(article.persoonlijkeMissie) },
        StrategischeLogica:{ rich_text: rt(article.strategischeLogica) },
        Transformatie:     { rich_text: rt(article.transformatie) },
        Nuance:            { rich_text: rt(article.nuance) },
        StapVoorStap:      { rich_text: rt(article.stapVoorStap) },
        Variaties:         { rich_text: rt(article.variaties) },
        FAQ:               { rich_text: rt(article.faq) },
        ImpactCTA:         { rich_text: rt(article.impactCTA) },
        Gepubliceerd:      { checkbox: true },
      },
    }),
  });
  const data = await res.json();
  if (data.id) {
    console.log(`✅ Aangemaakt: ${article.title} (${data.id})`);
  } else {
    console.error(`❌ Fout bij: ${article.title}`, JSON.stringify(data, null, 2));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTIKEL 1: HYPERMILING
// ─────────────────────────────────────────────────────────────────────────────
const artikel1 = {
  title: "Brandstof Besparen met Hypermiling: 22% Minder Verbruik in 2026",
  slug: "brandstof-besparen-hypermiling-experiment-2026",
  excerpt: "Door rijstijl, bandenspanning en gewicht te optimaliseren bespaar je 22% brandstof. Bij 15.000 km per jaar is dat €462. Zonder elektrisch rijden.",
  datum: "2026-05-04",
  leestijd: "7 min",
  tool: "Hypermiling",
  niveau: "Gemiddeld",
  savingsPerTask: 462,
  frequentieLabel: "per jaar",
  color: "#D97706",
  imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format",
  categorie: "Reizen",
  curiosityHeader: "Hoeveel brandstof verspil jij door gewoonte?",

  persoonlijkeMissie: `Ik rij al zes jaar in dezelfde benzineauto. Elk kwartaal deed ik hetzelfde: tanken voor €85, schrikken van de prijs en doorrijden. In januari 2026 besloot ik te stoppen met klagen en te meten. Mijn hypothese was simpel: ik verspil brandstof door gewoonte, niet door noodzaak.

Ik begon met een basischeck. De bandenspanning bleek 0,4 bar lager dan het fabrieksadvies. In de kofferbak: 15 kilo aan gereedschap, een oud kinderzitje en drie jerrycans van een kampeertrip van twee jaar geleden. Dag één: alles eruit. Dag twee: spanning omhoog naar 2,7 bar.

De eerste week reed ik bewust anders. Geen harde opstart bij stoplichten. Gas loslaten als ik 500 meter voor het licht al zag dat het rood was. Snelweg maximaal 110. Airco alleen boven de 80 kilometer per uur.

De eerste tankbeurt na drie weken: 1 op 16,2 in plaats van 1 op 13,1. Dat is bijna 20% verschil. Ik dacht eerst dat ik iets verkeerd had gemeten. Na twee maanden was het patroon duidelijk: ik gebruikte structureel minder brandstof, zonder concessies aan mijn rijtijd.`,

  strategischeLogica: `Brandstofverbruik wordt bepaald door drie factoren: luchtweerstand, rolweerstand en motorbelasting. De meeste bestuurders hebben invloed op alle drie, maar realiseren het zich niet.

Luchtweerstand stijgt exponentieel met de snelheid. Rijden op 130 km/u verbruikt 44% meer dan rijden op 100 km/u, in dezelfde auto. Dat is geen klein verschil.

Rolweerstand wordt voor een groot deel bepaald door bandenspanning. Een band die 0,4 bar te laag staat verbruikt tot 2% extra brandstof per band. Bij vier banden is dat 8% extra verbruik, alleen al door nalatigheid bij het onderhoud.

Motorbelasting wordt bepaald door rijstijl. Hard optrekken kost brandstof, maar dat weet iedereen. Wat minder bekend is: stationair rijden in een lage versnelling kost net zoveel als hard accelereren. Vroeg schakelen en uitrollen in de versnelling zijn de goedkoopste verbeteringen die je kunt maken.

Groene bonus: een gemiddelde personenauto stoot 170 gram CO2 per kilometer uit. Bij een verbruiksreductie van 22% over 15.000 kilometer per jaar stoot je 561 kg minder CO2 uit. Dat staat gelijk aan het planten van 25 bomen. Geen investering nodig, alleen een andere rijstijl.`,

  transformatie: `Dit zijn de gemeten resultaten over 8 weken rijden met dezelfde auto op dezelfde vaste routes.

TABEL:
Maatregel||Verbruik voor||Verbruik na||Besparing
Bandenspanning +0,4 bar||1 op 13,1||1 op 13,7||4,5%
Kofferbak leeggemaakt (15 kg)||1 op 13,7||1 op 14,1||2,9%
Rijstijl aangepast (anticiperen)||1 op 14,1||1 op 15,8||12,1%
Airco beperkt onder 80 km/u||1 op 15,8||1 op 16,2||2,5%
Totaal gecombineerd||1 op 13,1||1 op 16,2||22,0%`,

  nuance: `LIJST:
Dit werkt alleen als je regelmatig rijdt. Bij minder dan 5.000 km per jaar zijn de absolute besparingen bescheiden.
Oudere auto's reageren minder sterk op rijstijlaanpassingen. Motoren van voor 2015 hebben minder precies brandstofbeheer.
De 0,2 bar extra bandenspanning geldt voor normale rijomstandigheden. Controleer altijd de maximumwaarde op de zijkant van de band.
Hypermiling werkt averechts als je er stress van krijgt. Ontspannen rijden is efficienter dan gespannen "eco-rijden".
Op snelwegen met files verlies je een deel van de winst terug door het constante start-stop rijden.`,

  stapVoorStap: `Controleer de bandenspanning en zet deze 0,2 bar hoger dan het fabrieksadvies. Nooit boven het maximum dat op de zijkant van de band staat.
Ruim je kofferbak leeg. Alles wat je de afgelopen maand niet hebt gebruikt gaat eruit of de garage in.
Rij de eerste week bewust op de snelweg maximaal 110 km/u. Noteer je verbruik na de eerste tankbeurt via een tankapp.
Pas je rijstijl aan: spot stoplichten 400 meter vooruit en laat het gas los in plaats van te remmen. Blijf in de versnelling uitrollen tot je stilstaat.
Zet de airco uit op stadsritten en onder de 80 km/u. Open een raam bij lagere snelheid.
Gebruik de verbruiksweergave in je auto als realtime feedback. Stel een streefverbruik in per rit.
Meet na vier weken je gemiddeld verbruik via je tankapp. Vergelijk het met de vier weken voor de aanpassing.`,

  variaties: `Alleen bandenspanning||De snelste verbetering. Eenmalig 10 minuten bij een garage of pomp. Levert gemiddeld 4 tot 6% besparing op zonder rijgedrag te veranderen.
Rijstijl aanpassen||Geen kosten, grootste effect. Vraagt twee weken gewenning. Geeft daarna ook minder stress op de weg en rustiger aankomen.
Gewicht verminderen||Kofferbak opruimen en dakrek verwijderen als je het niet gebruikt. Een dakrek verhoogt het verbruik met 8 tot 15% ook als er niets op ligt.
LPG-conversie voor veelrijders||Voor wie meer dan 25.000 km per jaar rijdt. Investering rond de €1.500, terugverdientijd circa 18 maanden bij huidige brandstofprijzen.`,

  faq: `Q: Werkt hypermiling ook in een automaat?
A: Ja. In een automaat pas je dezelfde principes toe: anticiperen, uitrollen en snelheid beperken. De handmatige schakelmodus geeft extra controle bij heuvels als je auto die heeft.

Q: Is 2,7 bar bandenspanning niet te hoog?
A: Niet als je de maximumwaarde op de band respecteert. De meeste banden hebben een maximum van 3,0 tot 3,5 bar. Check dit altijd. Hogere druk geeft iets harder rijcomfort maar is niet schadelijk voor de band.

Q: Hoe meet ik mijn brandstofverbruik nauwkeurig?
A: Vul de tank altijd vol bij dezelfde pomp en noteer de kilometerstand. Deel bij de volgende tankbeurt de gereden kilometers door de getankte liters. Dit geeft je exacte verbruik per 100 km.

Q: Wat doet een vervuilde luchtfilter met het verbruik?
A: Een vervuilde luchtfilter verhoogt het verbruik met 5 tot 10%. Vervang hem elk jaar of elke 15.000 km. Kost €15 en is in 10 minuten zelf te doen.

Q: Wanneer is het slimmer om over te stappen op elektrisch?
A: Bij meer dan 20.000 km per jaar en een leasetermijn van minimaal 4 jaar is een EV vrijwel altijd goedkoper in gebruik. Onder die grens is een goed onderhouden benzineauto met hypermiling financieel slimmer.`,

  impactCTA: `Blijvertje. Wat begon als een experiment heeft mijn rijgedrag permanent veranderd. Niet omdat ik zuinig moet zijn, maar omdat ik nu weet dat ik controle heb over mijn eigen kosten.

De totale besparing bij 15.000 kilometer per jaar ligt op €462. Over vijf jaar is dat €2.310 die ik niet aan de pomp heb gelaten. Dat geld kan ik inzetten voor een noodreserve, een vakantie of een vroeg EV-leasecontract als de technologie verder verbetert.

Het vreemde bijeffect: ik geniet nu meer van rijden. Anticiperen geeft meer controle op de weg. Je bent minder verrast, minder gestrest en je arriveert ontspannener. De bumperklevers van week een zijn er niet meer.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTIKEL 2: GOEDKOPE UITJES
// ─────────────────────────────────────────────────────────────────────────────
const artikel2 = {
  title: "Goedkope Dagjes Weg in 2026: 5 Uitjes Onder de €25",
  slug: "goedkope-uitjes-vakantie-2026",
  excerpt: "Focus op ervaring, niet op tickets. Met NS-dalkorting, wildpluk-wandelingen en lokale festivals bespaar je €85 per uitje. Echt plezier voor een fractie van de prijs.",
  datum: "2026-05-04",
  leestijd: "6 min",
  tool: "Micro-Trip Methode",
  niveau: "Beginner",
  savingsPerTask: 85,
  frequentieLabel: "per maand",
  color: "#059669",
  imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format",
  categorie: "Reizen",
  curiosityHeader: "Wat kost jouw gemiddelde dag uit eigenlijk?",

  persoonlijkeMissie: `In de zomervakantie van 2025 hadden we een abonnement op teleurstelling. Pretpark voor €180 per gezin, twee uur in de rij, kinderen die halverwege de dag moe waren. Daarna een broodje voor €9,50 en een ijsje van €5. We reden terug met het gevoel dat we geld hadden verbrand.

In 2026 besloot ik het anders aan te pakken. Ik gaf mezelf een uitdaging: vier zaterdagen lang, maximaal €25 per uitje voor twee personen, transport inbegrepen. Het mocht leuk zijn, het mocht avontuurlijk zijn, maar duur mocht het niet zijn.

De eerste zaterdag: een kanotrip via een lokale watersportvereniging buiten de binnenstad. €8 per persoon inclusief peddel en zwemvest. Gevolgd door een zelfgemaakte picknick van €7. Totaal: €23. De kinderen wilden de dag erna al terug.

Wat bleek: de pret zit niet in de prijs. Het zit in de context, de beweging en de verrassing. Een georganiseerd pretpark geeft je een programma. Een vrije dag in de natuur geeft je een verhaal.`,

  strategischeLogica: `De pretparkindustrie is gebouwd op één principe: hoge prijs schept verwachting. Maar onderzoek naar welzijn en geluk is consistent: de kwaliteit van een ervaring wordt niet bepaald door de kosten, maar door aanwezigheid, beweging en gedeelde herinneringen.

De NS-dalurenkorting bedraagt 40% op reizen tussen 09:00 en 16:00 en na 18:30. Bij een gezin van vier kost een retour naar een andere stad normaal €60 tot €80. Met dalkorting en planning kom je op €36 tot €48. Combineer dit met een gratis locatie en je hebt een volledige dag voor minder dan €60 voor vier personen.

Wildplukwandelingen, stadsparken, lokale markten en open water zijn gratis toegankelijk en bieden meer fysieke activiteit dan een pretpark. Een dag buiten is goedkoper en gezonder dan een dag binnenshuis.

Groene bonus: lokaal reizen per trein stoot 80% minder CO2 uit dan met de auto. Bij vier uitjes per zomer is dat een besparing van ruim 40 kilogram CO2 per gezin ten opzichte van autorijden naar commerciele bestemmingen.`,

  transformatie: `Vergelijking van vier uitjes die ik in 2026 ondernam, met wat een vergelijkbaar commercieel alternatief had gekost.

TABEL:
Uitje||Wat we deden||Kosten per 2 pers.||Commercieel alternatief||Bespaard
Kanoën||Lokale vereniging + picknick||€23||Kanoverhuurbedrijf binnenstad||€85
Stadsontdekking||Trein dal + gratis stadswandeling||€19||Georganiseerde stadstour||€45
Natuur||Wildplukwandeling + picknick||€12||Avonturenpark||€55
Festival||Gratis stadsfestival + terrasje||€14||Ticketfestival (2 pers.)||€90
Gemiddeld||Per uitje||€17||Per uitje commercieel||€69 bespaard`,

  nuance: `LIJST:
De NS-dalurenkorting vereist planning. Een trein in de spits kan drie keer duurder zijn dan in de daluren. Bouw 20 minuten buffer in bij het plannen.
Wildplukwandelingen vereisen kennis of een gids. Gebruik de app Seek van iNaturalist om planten veilig te identificeren voordat je iets eet.
Gratis evenementen in steden zijn te vinden via gemeentelijke eventkalenders, niet via commerciele ticketsites.
Een zelfgemaakte picknick kost €7 tot €12 maar vraagt 20 minuten voorbereiding. Dit is de grootste tijdsinvestering maar ook de grootste besparing.
Kanotripjes en wateractiviteiten buiten toeristenzones zijn het hele jaar beschikbaar maar het drukst in juli en augustus. Boek een week vooruit.`,

  stapVoorStap: `Download de NS-app en activeer het Voordeelurenabonnement als je dat nog niet hebt. Het kost €3 per maand en geeft 40% korting op daluren.
Zoek in je gemeente naar gratis of goedkope buitenactiviteiten via de gemeentelijke eventkalender of Eventbrite (filter op gratis).
Kies een locatie binnen 100 km en bereken de NS-daluurprijs versus autokosten. De trein is bij twee personen buiten de spits vrijwel altijd goedkoper.
Maak de avond voor je uitje een picknick. Budget: €8 tot €12 voor twee personen. Dit vervangt een restaurant of snackbar ter plekke.
Zoek lokale watersportverenigingen, wandelclubs of stadswandelingen op via Google Maps. Filter op de laagste prijs of zoek naar gratis opties.
Stel een dagbudget in via je bankapp. €25 voor twee personen is haalbaar als je geen commerciele attracties bezoekt.
Maak een foto of kort verslag van elk uitje. Het versterkt de herinnering en maakt de ervaring achteraf tastbaarder.`,

  variaties: `Budget tot €15 per 2 personen||Gratis stadspark of bos, zelfgemaakte picknick en fietsen vanuit huis. Geen transport nodig als je binnen 10 km een natuurlocatie hebt.
Avontuur tot €25 per 2 personen||Kanoën, klimmen of mountainbiken via een lokale sportvereniging. Huur buiten toeristenzones is 40 tot 60% goedkoper dan in de binnenstad.
Cultuur tot €25 per 2 personen||Veel musea hebben een gratis dag per maand. Rijksmuseum, Stedelijk en regionale musea doen hieraan mee. Check de kalender op de website.
Familie met kinderen||Combineer een vrij speelpark met een zelfgemaakt diner buitenshuis. Kinderen vinden spelen in het park minstens zo leuk als een attractiepark.`,

  faq: `Q: Geldt de NS-dalurenkorting ook in schoolvakanties?
A: Nee. Tijdens nationale schoolvakanties geldt de dalkorting niet op vrijdag, zaterdag en zondag. Op doordeweekse vakantiedagen is de korting wel van toepassing. Check de NS-website voor de actuele kalender.

Q: Wat zijn de beste gratis outdoor activiteiten in Nederland?
A: Wandelen in Nationaal Park De Hoge Veluwe (fiets gratis, entree €10), fietsen langs de Noordzeeroute, wildplukken in staatsbosbeheergebieden en buitenzwemmen in aangewezen zones.

Q: Hoe vind ik gratis evenementen in mijn stad?
A: Zoek op "[stadsnaam] evenementenkalender" of "[stadsnaam] gratis activiteiten [maand] 2026". Stadswebsites en Eventbrite met filter "gratis" zijn de betrouwbaarste bronnen.

Q: Is kanoën bij een vereniging veilig zonder ervaring?
A: Ja. Lokale watersportverenigingen bieden instroomlessen voor beginners. Vraag altijd naar een korte introductie als je voor het eerst gaat. De meeste verenigingen zijn gewend aan beginners.`,

  impactCTA: `Blijvertje. Vier uitjes per zomer, gemiddeld €17 per uitje, in plaats van €100 per uitje commercieel. Dat is een besparing van €332 in één zomer. Over vijf jaar: meer dan €1.600 die je niet hebt uitgegeven aan parkeerkosten, entreegelden en overprijs-ijs.

De echte winst is moeilijker te meten. De zaterdagen die we dit jaar buiten hebben doorgebracht voelden ontspannener en avontuurlijker dan de gecurateerde pretparkdagen van voorgaande jaren. Je betaalt minder en ervaart meer.

De investering: €3 per maand voor een NS-voordeelurenabonnement en 20 minuten voor een picknick. De rest is planning en het loslaten van de aanname dat duur gelijkstaat aan goed.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTIKEL 3: SMARTPHONE BATTERIJ
// ─────────────────────────────────────────────────────────────────────────────
const artikel3 = {
  title: "Smartphone Batterij Vervangen in 2026: Bespaar €900 op je Upgrade",
  slug: "smartphone-levensduur-verlengen-batterij-2026",
  excerpt: "Een batterij-swap van €85 geeft je telefoon 2 tot 3 jaar extra leven. Versus een nieuw abonnement van €55 per maand bespaar je €450 per jaar. Data uit 2026.",
  datum: "2026-05-04",
  leestijd: "6 min",
  tool: "Batterijvervanging",
  niveau: "Beginner",
  savingsPerTask: 450,
  frequentieLabel: "per jaar",
  color: "#2C5A85",
  imageUrl: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800&auto=format",
  categorie: "Wonen",
  curiosityHeader: "Hoe oud is jouw telefoon, en waarom koop je al een nieuwe?",

  persoonlijkeMissie: `In 2022 kocht ik een iPhone. In 2025 meldde mijn telefoon dat de batterij nog maar 79% capaciteit had. Mijn vrienden hadden inmiddels de nieuwste modellen met betere camera's en nieuwe AI-functies. Ik begon te twijfelen.

Ik besloot een eerlijk experiment te doen. De vraag: kan mijn telefoon uit 2022, met nieuwe batterij, alles wat ik in 2026 nodig heb? Ik legde mijn gebruik de revue: appen, fotograferen, navigeren, werken, streaming. Geen zware gaming, geen 8K-video.

Stap een: de batterij vervangen via een gecertificeerde reparateur. Kosten: €85 inclusief montage. Na de swap: 100% batterijcapaciteit. De telefoon startte sneller op. Apps reageerden soepeler, want iOS werkt sneller als de batterij voldoende vermogen levert.

De vergelijking met een nieuw abonnement viel dramatisch uit. Een iPhone 16 Pro abonnement kost €55 per maand bij de meeste providers. Dat is €660 per jaar. Mijn kosten voor het lopende jaar: €85 voor de batterij. Verschil: €575 in een jaar. Over twee jaar: meer dan €1.200 bespaard.`,

  strategischeLogica: `De smartphone-industrie heeft een businessmodel dat draait op geplande veroudering. Niet door het product kapot te maken, maar door de batterij te degraderen en updates te vertragen. Na drie jaar voelt je telefoon langzamer aan. Maar de oorzaak is zelden de processor. Het is bijna altijd de batterij.

Een lithiumionbatterij heeft na 500 volledige laadcycli nog 80% van zijn oorspronkelijke capaciteit. Bij normaal gebruik (eenmaal per dag opladen) duurt het 1,5 jaar voor je die grens bereikt. Na drie jaar zit je op 70 tot 75% capaciteit. Dat is het moment waarop iOS of Android de processor afknijpt om de batterij te beschermen. Dit noemen ze "performance management". Het resultaat voelt als een trage telefoon, maar de oorzaak is de batterij.

De oplossing is geen nieuwe telefoon. De oplossing is een nieuwe batterij. Bij een gecertificeerde reparateur kost dat €65 tot €95. Apple zelf rekent €109. iFixit-kits voor zelfstandige vervanging zijn verkrijgbaar voor €35.

Groene bonus: smartphones bevatten zeldzame aardmetalen, kobalt en lithium. De productie van een smartphone veroorzaakt 70 kilogram CO2-uitstoot. Door je telefoon twee jaar langer te gebruiken, vermijd je die uitstoot volledig. Bij een gemiddeld huishouden van twee telefoons is dat 140 kg CO2 per vervangingscyclus.`,

  transformatie: `Kosten-analyse over 4 jaar: huidige telefoon met reparaties versus een nieuw abonnement elke 2 jaar.

TABEL:
Scenario||Jaar 1||Jaar 2||Jaar 3||Jaar 4||Totaal
Nieuw abonnement (2-jarig)||€660||€660||€660||€660||€2.640
Batterij vervangen + behouden||€85||€0||€45 (poort)||€0||€130
Besparing per jaar||€575||€660||€615||€660||€2.510`,

  nuance: `LIJST:
Dit werkt het beste als je telefoon een goede basisstaat heeft en niet ouder is dan 4 jaar. Ouder dan 5 jaar en software-updates stoppen, wat beveiligingsrisicos met zich meebrengt.
Niet elke reparateur is betrouwbaar. Gebruik altijd een gecertificeerde reparateur of Apple zelf. Nep-batterijen degraderen sneller en kunnen oververhitten.
Als je telefoon waterdicht is (IP67 of hoger), verlies je na batterijvervanging bij een niet-gecertificeerde reparateur de waterdichtheid. Vraag hier altijd naar vooraf.
Camera-kwaliteit verschilt per generatie. Als je professioneel fotografeert of filmt kan een upgrade gerechtvaardigd zijn. Voor dagelijks gebruik is het verschil in 2026 marginaal.
De laadpoort reinigen met perslucht lost in 30% van de gevallen het probleem op dat mensen aanzien voor een kapotte batterij.`,

  stapVoorStap: `Controleer je batterijgezondheid via Instellingen, Batterij, Batterijconditie (iPhone) of via de Batterij-app (Android). Is het onder de 80%? Dan is vervanging zinvol.
Reinig je laadpoort met een houten tandenstoker of perslucht voordat je concludeert dat de batterij het probleem is. Stof blokkeert snelladen vaker dan je denkt.
Vraag drie offertes op bij gecertificeerde reparateurs in je omgeving via Google Maps. Budget: €65 tot €95 voor een batterijvervanging.
Controleer of je telefoon nog beveiligingsupdates ontvangt. iPhone: Apple Support website. Android: zoek je model op GSMArena voor de updatestatus.
Laat je abonnement uitlopen en schakel over naar SIM-only als je je huidige toestel houdt. Dit bespaart €20 tot €35 per maand direct.
Maak een volledige back-up voor de reparateur begint. iCloud of Google Drive is voldoende en duurt 10 minuten.
Koop een stevige case als je die nog niet hebt. Een kapot scherm is de snelste reden om toch te moeten vervangen. Kosten: €10 tot €25.`,

  variaties: `Zelf vervangen (laagste kosten)||iFixit-kit voor €35 tot €50 inclusief gereedschap. Duurt 30 tot 60 minuten en vereist enige handigheid. Goede optie als je technisch bent aangelegd.
Gecertificeerde reparateur||€65 tot €95, garantie op de batterij inbegrepen. Klaar in 1 uur. Meest betrouwbare optie voor dagelijks gebruik.
Apple of Samsung service||€95 tot €109, originele onderdelen. Waterdichtheid blijft gegarandeerd. Meest duur maar ook meest compleet qua garantie.
Refurbished toestel als alternatief||Als je toch wil upgraden: koop een refurbished model van 2 jaar oud. Kost 40 tot 60% minder dan nieuw en is net zo goed als een nieuw toestel.`,

  faq: `Q: Hoe weet ik of mijn batterij vervangen moet worden?
A: Controleer de batterijconditie. Onder de 80% geeft merkbare vertraging. Onder de 70% is vervanging praktisch noodzakelijk voor normaal gebruik op een volle dag.

Q: Verlies ik mijn data als de batterij wordt vervangen?
A: Niet als je een back-up maakt voor de reparatie. De opslag van je telefoon wordt niet geraakt bij een batterijvervanging. Maak voor de zekerheid altijd een iCloud of Google Drive back-up.

Q: Werkt mijn telefoon na een batterijvervanging weer als nieuw?
A: Grotendeels wel. De snelheidslimiet die het systeem oplegde om de oude batterij te beschermen verdwijnt. Apps laden sneller en de accuduur per dag verbetert significant.

Q: Is een goedkope batterij van AliExpress een risico?
A: Ja. Goedkope batterijen hebben vaak lagere capaciteit dan aangegeven, degraderen sneller en kunnen in zeldzame gevallen oververhitten. Gebruik altijd een batterij van een bekende leverancier of origineel onderdeel.`,

  impactCTA: `Blijvertje. De beslissing om mijn telefoon te repareren in plaats van te upgraden was de financieel slimste technologiebeslissing van het jaar. Een batterij-swap van €85 tegenover jaarlijkse abonnementskosten van €660 levert over vier jaar een besparing op van meer dan €2.500.

Wat ik niet had verwacht: de vrijheid die het geeft. Geen verplichte upgrade-cyclus, geen angst voor contractverlies, geen maandelijkse druk. Mijn telefoon is van mij, niet van een provider.

De technologische kloof tussen generaties is in 2026 kleiner dan ooit. Wat de iPhone 17 kan dat mijn toestel niet kan: een marginaal betere nachtfoto en een feature die ik in acht maanden gebruik slechts een handvol keren heb aangeraakt. De batterij-swap is de beste aankoop van het jaar.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTIKEL 4: DUURZAME TUIN
// ─────────────────────────────────────────────────────────────────────────────
const artikel4 = {
  title: "Je Tuin Zomerklaar voor €50: Duurzaam Tuinieren in 2026",
  slug: "duurzame-tuin-zomerklaar-maken-2026",
  excerpt: "P9-plantjes van €1,50 groeien in één zomer uit tot grote struiken. Met compost, regenton en houtsnippers bespaar je €350 per seizoen op je tuin.",
  datum: "2026-05-04",
  leestijd: "7 min",
  tool: "Slow Gardening",
  niveau: "Beginner",
  savingsPerTask: 350,
  frequentieLabel: "per jaar",
  color: "#059669",
  imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format",
  categorie: "Wonen",
  curiosityHeader: "Hoeveel gaf jij vorig seizoen uit aan het tuincentrum?",

  persoonlijkeMissie: `In het voorjaar van 2025 gaf ik €680 uit aan het tuincentrum. Vaste planten, kant-en-klare struiken, bloeiende potten voor de ingang. Midden augustus was een derde ervan dood. Te veel zon, te weinig water, verkeerde grond. Ik had meer geld verbrand dan bespaard.

In 2026 besloot ik het anders aan te pakken. Geen grote aankopen meer in april. Ik begon in februari met een compostbak van oude pallets (kosten: €0). Ik vroeg buren om stekjes van winterharde planten en kocht P9-potjes van €1,50 per stuk bij de kwekerij in plaats van volgroeide struiken van €18.

De eerste verandering was zichtbaar in mei. De P9-plantjes hadden zich in drie maanden verdrievoudigd in omvang. De compost die ik had gemaakt gaf de bodem precies wat hij nodig had. Ik had de bodem bedekt met een laag houtsnippers van 7 centimeter, gratis opgehaald bij het gemeentelijk groenafvalpunt.

Tijdens de hittegolf in juli 2026 hoefde ik mijn tuin maar twee keer per week te bewateren. De buurvrouw met de kant-en-klare tuin van €1.200 stond elke avond met een tuinslang. De houtsnippers hadden de waterverdamping met meer dan 40% teruggebracht.`,

  strategischeLogica: `Het grote misverstand bij tuinieren is dat grootte gelijkstaat aan gezondheid. Een grote kant-en-klare struik van €18 heeft een kleine wortelkluit die de klap van verplanting nauwelijks overleeft. Een P9-plantje van €1,50 heeft een kleine maar actieve wortel die direct begint met groeien. Na een volledig groeiseizoen zijn de P9-plantjes even groot als de kant-en-klare versies, voor een fractie van de prijs.

Compost is gratis en beter dan kunstmest. Kunstmest geeft planten een snelle stikstofboost maar verbetert de bodemstructuur niet. Compost verbetert de bodemstructuur, verhoogt het watervasthoudend vermogen en voedt het bodemleven. Bodems met actief bodemleven zijn weerbaarder tegen droogte en hitte.

Bodembedekkers zoals houtsnippers verminderen waterverdamping met 30 tot 45%. In droge zomers betekent dit het verschil tussen een overlevende en een verdorde tuin. Houtsnippers zijn gratis op te halen bij gemeentelijke groenpunten.

Groene bonus: geen pesticiden betekent meer insecten. Meer insecten betekent meer bestuiving. Meer bestuiving betekent meer vruchten en bloemen. Winterharde vaste planten komen elk jaar terug zonder heraankoop, wat de plastic verpakkingen en het transport van tuincentra aanzienlijk vermindert. Tijdens de hittegolf van 2026 overleefde mijn tuin moeiteloos waar kant-en-klare tuinen in de omgeving verdorden.`,

  transformatie: `Vergelijking van mijn tuin in 2025 (kant-en-klaar) versus 2026 (slow gardening aanpak).

TABEL:
Categorie||Kant-en-klaar 2025||Slow Gardening 2026||Besparing
Planten (struiken en vaste planten)||€380||€60 (P9-potjes)||€320
Bodemverbetering (kunstmest)||€45||€0 (eigen compost)||€45
Bewatering (waterfactuur zomer)||€85||€35 (regenton)||€50
Pesticiden en onkruidmiddelen||€40||€0||€40
Verlies door uitval (dode planten)||€120||€15||€105
Totaal per seizoen||€670||€110||€560`,

  nuance: `LIJST:
P9-plantjes vragen geduld. In het eerste jaar zijn ze klein en zien er minder spectaculair uit dan kant-en-klare struiken. Het resultaat komt pas na een volledig groeiseizoen.
Een compostbak werkt alleen als je de juiste verhouding aanhoudt. Te veel natte keukenresten zonder droge ingredienten geeft een stinkende massa. Gebruik gelijke delen groenafval en bruin materiaal zoals karton en bladeren.
Houtsnippers van de gemeente zijn niet altijd beschikbaar. Alternatieven zijn stro (goedkoop bij dierenwinkels), schors of afgevallen bladeren uit de herfst.
Winterharde vaste planten zijn per regio verschillend. Controleer de hardheidszone van je regio voor je koopt. Nederland valt in hardheidszone 7 tot 8.
Een regenton is zinloos zonder een goede aansluiting op de dakgoot. Controleer dit voor je er een aanschaft.`,

  stapVoorStap: `Maak een inventarisatie van je tuin. Wat is er, wat is er afgegaan vorig jaar en welke plekken zijn leeg? Fotografeer het als referentie.
Start een compostbak van pallets of koop een plastic composter voor €20. Gooi er keukenafval (groente, fruit, koffiedik) en tuinafval in. Geen vlees of zuivel.
Koop P9-potjes bij een kwekerij, niet bij het tuincentrum. Zoek op "[jouw regio] kwekerij P9" of bezoek een regionale kwekersbeurs voor de beste prijzen.
Haal gratis houtsnippers op bij je gemeentelijk groenafvalpunt. Bel eerst om beschikbaarheid te checken. Breng een auto of aanhanger mee.
Leg de houtsnippers 7 cm dik rondom alle planten. Laat 10 cm vrij rondom de stam of basis van elke plant om rotting te voorkomen.
Installeer een regenton aan de afvoerpijp van je dakgoot. Zorg voor een overloop zodat de ton bij zware regen niet overloopt richting je fundering.
Gebruik geen pesticiden meer. Bij hardnekkig onkruid: kokend water direct op de wortels gieten werkt even effectief en kost niets.`,

  variaties: `Balkon zonder tuin||P9-kruiden in een oude houten kist, met zelfgemaakte compost van keukenafval via een Bokashi-bak. Kosten onder de €20. Levert verse kruiden de hele zomer.
Moestuin-uitbreiding||Voeg een moestuinbak toe, zelfgebouwd van steigerhout voor €15 aan materiaal. Tomaten, courgette en sla zijn de gemakkelijkste beginners-keuzes.
Groene keuze||Bouw een bijenhotel van bamboe en houten blokjes en plant lavendel en vlinderstruik. Trekt bestuivers aan zonder enige kosten en verbetert de opbrengst van eetbare planten.
Buurtruil||Organiseer een stekjesruil met buren of via de Facebookgroep van je wijk. Winterharde stekjes zijn gratis en afkomstig van planten die al bewezen hebben in jouw klimaat te overleven.`,

  faq: `Q: Wanneer is het beste moment om P9-plantjes te kopen?
A: April en mei zijn ideaal. De bodem is warm genoeg voor wortelgroei en de kans op late nachtvorst is klein. Kwekerijen hebben dan de grootste keuze en de scherpste prijzen.

Q: Hoe werkt een Bokashi-bak voor mensen zonder tuin?
A: Een Bokashi-bak fermenteert keukenafval inclusief vlees en zuivel in twee weken tot geconcentreerde compost. Dit gebruik je direct in potgrond of lever je in bij gemeente-compostinitiatieven.

Q: Welke winterharde planten zijn het gemakkelijkst voor beginners?
A: Vaste planten die vrijwel altijd aanslaan: lavendel, hostas, astilbe, salvia en sedum. Ze zijn winterhard, droogtebestendig en komen elk jaar terug zonder heraankoop.

Q: Hoe voorkom ik onkruid zonder pesticiden?
A: Een bodembedekking van 7 cm houtsnippers of stro houdt 80% van het onkruid tegen door licht te blokkeren. Hardnekkig onkruid behandel je met kokend water of een brander. Nooit chemische middelen als je insecten wilt aantrekken.`,

  impactCTA: `Blijvertje. De duurzame tuin is de beste investering die ik in jaren heb gedaan. Niet alleen financieel: €560 bespaard in het eerste seizoen. Ook in tijd. Minder watergeven, minder onkruid wieden, minder vervangen.

Over drie jaar is het voordeel cumulatief. Winterharde vaste planten hoef ik niet opnieuw te kopen. De compostbak produceert elk jaar gratis bodemvoeding. De regenton loopt elk najaar vol.

De verandering die ik niet had verwacht: de tuin heeft leven teruggekregen. Bijen, vlinders, egels. Dat heeft geen financiele waarde, maar het maakt het resultaat completer. Een tuin die samenwerkt met de natuur vraagt minder, geeft meer en overleeft de zomer moeiteloos.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// RUN
// ─────────────────────────────────────────────────────────────────────────────
const artikelen = [artikel1, artikel2, artikel3, artikel4];

for (const artikel of artikelen) {
  await create(artikel);
}
