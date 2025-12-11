import React, { useEffect } from 'react'
import './InfoPage.css'
import { useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

const InfoPage = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        const yOffset = -100; // offset by 100px
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className='info-page'>
      <div className='info-page-container' id='despre-noi'>
        <h1>Despre noi</h1>
        <h3>Cand am inceput?</h3>
        <p>Totul a pornit dintr-o dorință simplă: să aducem în Craiova un loc unde mâncarea bună chiar înseamnă mâncare bună. Un loc în care gustul să nu fie tratat ca un compromis, ci ca o experiență. La început, nu aveam decât câteva rețete, mult entuziasm și ideea clară că putem face lucrurile altfel.
          Am pornit cu pași mici, într-o bucătărie în care fiecare burger, fiecare porție și fiecare sos erau pregătite cu atenția cuiva care gătește pentru prieteni, nu pentru clienți. Fără scurtături, fără „merge și așa”, fără ingrediente aruncate la întâmplare.
          Doar mâncare făcută cinstit.
          Pe măsură ce am crescut, am învățat că oamenii nu vin doar să mănânce – vin pentru gustul care le rămâne în minte, pentru porțiile generoase, pentru combinațiile cu personalitate și pentru vibe-ul pe care îl transmitem. Și, cel mai important, pentru că livrăm exact ceea ce promitem: mâncare care are gust de mâncare.</p>
        <h3>Visul nostru</h3>
        <p>Visul nostru a fost, încă de la început, să devenim primul loc la care te gândești atunci când ți-e poftă de ceva bun. Nu cel mai mare, nu cel mai fancy, nu cel mai complicat — ci pur și simplu locul unde știi că nu ai cum să greșești.
        Ne dorim ca fiecare comandă să fie o mică experiență: burgeri suculenți, combinații îndrăznețe, cartofi crocanți și sosuri făcute cu grijă, nu la kilogram. Ne dorim să păstrăm aceeași energie, aceeași pasiune și aceeași atenție la detalii care ne-au adus până aici.</p>
      </div>
      <div className='info-page-container' id='livrare'>
        <h1>Livrare</h1>

        <h3>Aria de livrare</h3>
        <p>
          Livrăm rapid și în siguranță într-o arie de {assets.aria_de_livrare}, acoperind toate
          cartierele importante din apropiere. Ne dorim ca fiecare comandă să ajungă fierbinte,
          gustoasă și exact așa cum ai comandat-o, de aceea am stabilit o zonă de livrare optimizată
          pentru viteză și calitate.  
          Indiferent dacă locuiești aproape de centru sau într-o zonă mai liniștită, dacă te afli
          în perimetrul nostru, venim la tine fără probleme.  
          Tot ce trebuie să faci este să plasezi comanda — iar noi ne ocupăm de restul, rapid și fără stres.
        </p>

        <h3>Timpul estimat de livrare</h3>
        <p>
          Timpul mediu de livrare este de aproximativ {assets.timp_estimat_livrare}, în funcție de
          trafic, condițiile meteo și numărul de comenzi din momentul respectiv.  
          Facem tot posibilul ca mâncarea să ajungă cât mai repede, fără a compromite calitatea sau
          atenția la detalii.
        </p>

        <h3>Reguli de livrare</h3>
        <p>
          Pentru ca totul să decurgă cât mai bine, te rugăm să introduci o adresă corectă și completă
          (inclusiv detalii suplimentare precum bloc, scară, apartament sau puncte de orientare).
          Acest lucru ne ajută să reducem întârzierile și să ajungem exact unde trebuie.
        </p>
        <p>
          Înainte de livrare, livratorul te poate contacta telefonic pentru confirmarea adresei sau
          pentru clarificări. În cazul în care ai instrucțiuni speciale pentru livrare, le poți
          menționa în secțiunea dedicată din aplicație.
        </p>

        <h3>Dacă livratorul nu te găsește</h3>
        <p>
          Dacă livratorul ajunge la adresa menționată și nu poate lua legătura cu tine, va încerca
          să te sune de mai multe ori.  
          Dacă nu răspunzi și nu te prezinți pentru preluarea comenzii, aceasta se consideră refuzată.  
          În acest caz, restaurantul își rezervă dreptul de a nu rambursa costul produselor deja
          pregătite, deoarece acestea sunt perisabile și realizate special pentru tine.
        </p>

        <h3>Politica de anulare a comenzilor</h3>
        <p>
          Comenzile pot fi anulate doar înainte de a intra în stadiul <strong>„În pregătire”</strong>.  
          Odată ce bucătăria începe prepararea produselor, anularea nu mai este posibilă, deoarece
          mâncarea este gătită proaspăt și nu poate fi refolosită.
        </p>
        <p>
          Dacă ai făcut o greșeală în comandă, te rugăm să ne contactezi cât mai repede la 
          {assets.contact}. Dacă nu a început pregătirea produselor, o putem modifica sau anula.
        </p>

        <h3>Politica de retur și rambursare</h3>
        <p>
          Pentru că produsele sunt alimentare și sunt preparate pe loc, nu se poate realiza un retur
          fizic al comenzii.  
          Totuși, ne dorim să ai o experiență cât mai bună, așa că oferim rambursări sau refacerea
          comenzii în următoarele situații:
        </p>
        <p>
          - produs greșit sau incomplet  
          - produse lipsă din comandă  
          - pachet deteriorat sau impropriu consumului  
          - comanda nu corespunde cu ceea ce apare în meniu
        </p>
        <p>
          Pentru orice problemă legată de comandă, te rugăm să ne contactezi telefonic la 
          {assets.contact}. Analizăm fiecare caz individual și găsim soluția cea mai bună pentru tine.
        </p>

        <h3>Plata comenzilor</h3>
        <p>
          Acceptăm plata cash la livrare sau plata online prin Stripe.  
          Datele cardului <strong>nu sunt stocate de noi</strong> și nu sunt accesibile platformei —
          procesarea este gestionată integral de Stripe, un furnizor securizat de servicii de plată.
        </p>

        <h3>Obligațiile clientului</h3>
        <p>
          În plasarea unei comenzi, clientul este de acord să ofere informații corecte privind:
        </p>
        <p>
          - adresa de livrare  
          - numărul de telefon  
          - disponibilitatea de a răspunde livratorului  
          - preluarea comenzii în timp util
        </p>

        <h3>Concluzie</h3>
        <p>
          Ne dorim ca fiecare comandă să fie o experiență plăcută, rapidă și fără bătăi de cap.
          Dacă ai orice întrebare sau ai întâmpinat o problemă, suntem mereu la un telefon distanță:
          {assets.contact}.  
          Îți mulțumim că ai ales restaurantul nostru!
        </p>
      </div>

      <div className='info-page-container' id='cookie'>
        <h1>Politica de cookie-uri</h1>

        <h3>1. Introducere</h3>
        <p>
          Această Politică de Cookie-uri explică modul în care {assets.denumire_completa_firma} 
          ({assets.structura_firmei}), cu sediul social în {assets.adresa_sediului_social}, 
          înregistrată la Registrul Comerțului sub numărul {assets.numar_inregistrare_registrul_comert}, 
          CUI {assets.cod_cui}, utilizează cookie-uri și tehnologii similare în cadrul site-ului nostru.
        </p>

        <h3>2. Ce sunt cookie-urile?</h3>
        <p>
          Cookie-urile sunt fișiere text mici stocate în browserul tău atunci când accesezi un site web. 
          Acestea permit funcționarea corectă a website-ului și oferă o experiență sigură și stabilă, 
          în special pentru procese precum autentificarea.
        </p>

        <h3>3. Cookie-uri utilizate</h3>
        <p>
          Website-ul nostru folosește exclusiv cookie-uri esențiale pentru funcționare. 
          Folosim două cookie-uri principale: <strong>accessToken</strong> și <strong>refreshToken</strong>. 
          Ambele sunt cookie-uri HTTPOnly, folosite pentru autentificare și securitate.
        </p>

        <h3>4. Durata de stocare</h3>
        <p>
          accessToken are o durată de viață scurtă, fiind regenerat automat. 
          refreshToken este stocat o perioadă limitată pentru a menține sesiunea activă. 
          După expirare, acestea sunt invalidate automat.
        </p>

        <h3>5. Cum poți gestiona cookie-urile?</h3>
        <p>
          Deoarece utilizăm doar cookie-uri strict necesare, dezactivarea acestora poate face site-ul 
          nefuncțional. Totuși, poți șterge cookie-urile din setările browserului tău în orice moment.
        </p>

        <h3>6. Actualizări ale politicii</h3>
        <p>
          Ne rezervăm dreptul de a modifica această politică ori de câte ori este necesar. 
          Orice modificare va fi publicată pe această pagină.
        </p>

        <h3>7. Contact</h3>
        <p>
          Pentru întrebări privind această politică, ne poți contacta la numărul: {assets.contact}.
        </p>
      </div>
      <div className='info-page-container' id='termeni'>
        <h1>Termeni și condiții</h1>

        <h3>1. Introducere</h3>
        <p>
          Prezentul document stabilește termenii și condițiile de utilizare ale platformei operate de
          {assets.denumire_completa_firma} ({assets.structura_firmei}), cu sediul în
          {assets.adresa_sediului_social}, înregistrată la Registrul Comerțului sub numărul
          {assets.numar_inregistrare_registrul_comert}, având CUI {assets.cod_cui}.
        </p>
        <p>
          Prin accesarea și utilizarea website-ului, utilizatorul declară că a citit, a înțeles și
          acceptă acești termeni și condiții.
        </p>

        <h3>2. Obiectul serviciului</h3>
        <p>
          Platforma oferă posibilitatea de a comanda mâncare pentru livrare la domiciliu sau pentru
          consum în locație. Comenzile pot fi achitate numerar sau online prin intermediul procesatorului
          de plăți Stripe. Produsele afișate pe site sunt preparate de restaurantul nostru.
        </p>

        <h3>3. Crearea și gestionarea contului</h3>
        <p>
          Pentru plasarea comenzilor este necesară crearea unui cont. Utilizatorul trebuie să furnizeze
          informații reale și actualizate: nume, email, telefon și adresă. Datele pot fi modificate ulterior
          din secțiunea contului.
        </p>
        <p>
          Ștergerea contului se poate realiza la cerere, contactând restaurantul la numărul
          {assets.contact}. Datele aferente contului sunt păstrate până la solicitarea de ștergere.
        </p>

        <h3>4. Plasarea comenzilor</h3>
        <p>
          O comandă este considerată validă în momentul în care utilizatorul o trimite prin intermediul
          platformei. După trimitere, restaurantul începe procesarea acesteia.
        </p>
        <p>
          Comenzile pot fi anulate doar înainte de a intra în stadiul „În pregătire”. După acest moment,
          anularea nu mai este posibilă.
        </p>

        <h3>5. Livrarea comenzilor</h3>
        <p>
          Livrarea se efectuează în aria {assets.aria_de_livrare}. Timpul estimat de livrare este de
          aproximativ {assets.timp_estimat_livrare}, în funcție de trafic și numărul comenzilor.
        </p>
        <p>
          Dacă livratorul ajunge la adresa specificată și clientul nu răspunde la telefon,
          după încercări repetate, comanda se consideră refuzată. Restaurantul își rezervă dreptul
          de a nu rambursa valoarea produselor pregătite.
        </p>

        <h3>6. Politica de retur și rambursări</h3>
        <p>
          Deoarece produsele sunt perisabile și preparate la comandă, nu se acceptă returul alimentar.
        </p>
        <p>
          Rambursarea este posibilă doar în următoarele situații:
          - produs greșit,
          - produs lipsă,
          - produs care nu corespunde descrierii din meniu.
        </p>
        <p>
          Pentru orice sesizare privind comanda, clientul trebuie să contacteze restaurantul la
          {assets.contact}. Situațiile sunt analizate individual, iar restaurantul poate decide
          rambursarea totală, parțială sau re-prepararea comenzii.
        </p>

        <h3>7. Prețuri și plăți</h3>
        <p>
          Toate prețurile sunt afișate în lei și includ TVA. Restaurantul își rezervă dreptul de a
          modifica prețurile fără notificare prealabilă, modificările aplicându-se doar comenzilor viitoare.
        </p>
        <p>
          Plățile online sunt procesate în siguranță prin Stripe. Datele cardului nu sunt stocate de noi
          și nu sunt accesibile platformei.
        </p>

        <h3>8. Limitarea răspunderii</h3>
        <p>
          Restaurantul depune toate eforturile pentru ca informațiile de pe site să fie corecte și
          actuale, însă nu poate garanta absența oricăror erori.
        </p>
        <p>
          Restaurantul nu este responsabil pentru întârzieri cauzate de trafic, condiții meteo,
          blocaje rutiere sau situații neprevăzute.
        </p>

        <h3>9. Prelucrarea datelor personale</h3>
        <p>
          Datele utilizatorilor sunt prelucrate conform Politicii de Confidențialitate (GDPR).
          Colectăm doar informațiile necesare pentru funcționarea contului și livrarea comenzilor.
        </p>
        <p>
          Comenzile sunt păstrate timp de 3 luni pentru optimizarea sistemului și evidențe interne.
          Datele contului sunt păstrate până la solicitarea de ștergere.
        </p>

        <h3>10. Modificarea termenilor și condițiilor</h3>
        <p>
          Ne rezervăm dreptul de a modifica acești termeni oricând. Modificările devin active în momentul
          publicării pe site. Continuarea utilizării platformei reprezintă acceptul utilizatorului.
        </p>

        <h3>11. Contact</h3>
        <p>
          Pentru întrebări, sugestii sau sesizări legate de acești termeni, ne poți contacta la:
          {assets.contact}.
        </p>
      </div>
      <div className='info-page-container' id='gdpr'>
        <h1>Politica de Confidențialitate (GDPR)</h1>

        <h3>1. Introducere</h3>
        <p>
          Această Politică de Confidențialitate descrie modul în care 
          {assets.denumire_completa_firma} ({assets.structura_firmei}), cu sediul în 
          {assets.adresa_sediului_social}, înregistrată la Registrul Comerțului sub numărul 
          {assets.numar_inregistrare_registrul_comert}, CUI {assets.cod_cui}, 
          colectează, procesează și protejează datele personale ale utilizatorilor.
        </p>
        <p>
          Ne angajăm să respectăm Regulamentul (UE) 2016/679 (GDPR) și legislația română în vigoare 
          privind protecția datelor cu caracter personal.
        </p>

        <h3>2. Ce date colectăm</h3>
        <p>
          Colectăm doar datele strict necesare pentru funcționarea platformei și livrarea comenzilor:
        </p>
        <p>
          - Nume și prenume  
          - Adresă de email  
          - Număr de telefon  
          - Adresa de livrare (lat, lng, localitate, stradă, număr, detalii suplimentare)  
          - Istoricul comenzilor (stocat timp de 3 luni)  
          - Identificatorul intern de utilizator în cazul plăților online (Stripe)
        </p>
        <p>
          Nu colectăm și nu stocăm date ale cardului bancar. Toate plățile online sunt procesate în mod 
          securizat de Stripe.
        </p>

        <h3>3. Cum colectăm datele</h3>
        <p>
          Datele sunt colectate în următoarele situații:
        </p>
        <p>
          - la crearea contului  
          - la salvarea adresei în contul utilizatorului  
          - la plasarea unei comenzi  
          - la procesarea plății online (doar ID-ul intern Stripe)  
          - prin cookie-urile necesare autentificării (accessToken și refreshToken)
        </p>

        <h3>4. Scopurile prelucrării datelor</h3>
        <p>Prelucrăm datele personale în următoarele scopuri legitime:</p>
        <p>
          - gestionarea contului și autentificarea utilizatorilor  
          - procesarea și livrarea comenzilor  
          - contactarea utilizatorului privind comanda sa  
          - prevenirea fraudelor și asigurarea securității contului  
          - respectarea obligațiilor legale (ex: evidențe interne)
        </p>

        <h3>5. Temeiul legal al prelucrării</h3>
        <p>Prelucrarea datelor se bazează pe:</p>
        <p>
          - Art. 6(1)(b) GDPR – executarea contractului (livrarea comenzii)  
          - Art. 6(1)(c) GDPR – obligații legale  
          - Art. 6(1)(f) GDPR – interes legitim (securitatea platformei)
        </p>

        <h3>6. Durata de stocare</h3>
        <p>
          - Datele contului (nume, email, telefon, adresă) sunt păstrate până la solicitarea de ștergere 
          a contului.  
          - Comenzile sunt păstrate timp de maximum 3 luni, pentru optimizarea sistemului și evidențe 
          interne.  
          - Cookie-urile de autentificare sunt stocate temporar și expiră automat.
        </p>

        <h3>7. Cu cine partajăm datele</h3>
        <p>
          Datele personale nu sunt vândute și nu sunt partajate către terți în scopuri comerciale.
          Pot fi transmise doar către:
        </p>
        <p>
          - Stripe – procesator de plăți online (nu partajăm datele cardului)  
          - furnizori de servicii IT strict necesare funcționării platformei  
          - autorități publice, doar în cazurile prevăzute de lege
        </p>

        <h3>8. Drepturile utilizatorului (GDPR)</h3>
        <p>
          Conform GDPR, utilizatorul are următoarele drepturi:
        </p>
        <p>
          - Dreptul de acces la date  
          - Dreptul la rectificare  
          - Dreptul la ștergere („dreptul de a fi uitat”)  
          - Dreptul la restricționarea prelucrării  
          - Dreptul la opoziție  
          - Dreptul la portabilitatea datelor  
          - Dreptul de a depune o plângere la ANSPDCP
        </p>

        <h3>9. Cum poți solicita ștergerea sau modificarea datelor</h3>
        <p>
          Pentru orice solicitare legată de datele personale (ștergere, modificare, acces), utilizatorul 
          poate contacta restaurantul la numărul {assets.contact}. Solicitarea va fi procesată în termen 
          de maximum 30 de zile.
        </p>

        <h3>10. Securitatea datelor</h3>
        <p>
          Platforma folosește conexiuni HTTPS și cookie-uri HTTPOnly pentru autentificare, prevenind 
          accesul neautorizat la date. Ne angajăm să implementăm măsuri tehnice și organizatorice 
          rezonabile pentru protejarea datelor utilizatorilor.
        </p>

        <h3>11. Cookie-uri</h3>
        <p>
          Website-ul utilizează doar cookie-uri esențiale pentru autentificare: accessToken și 
          refreshToken. Acestea nu pot fi dezactivate, deoarece sunt necesare funcționării corecte a 
          platformei. Pentru detalii suplimentare, consultă Politica de Cookie-uri.
        </p>

        <h3>12. Modificări ale politicii</h3>
        <p>
          Ne rezervăm dreptul de a actualiza această Politică de Confidențialitate. Orice modificare va 
          fi publicată pe această pagină și va intra în vigoare imediat.
        </p>

        <h3>13. Contact</h3>
        <p>
          Pentru orice întrebare sau solicitare legată de protecția datelor personale, ne poți contacta 
          la numărul {assets.contact}.
        </p>
      </div>

    </div>
  )
}

export default InfoPage
