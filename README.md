# Encore — Konzertarchiv

Eine kleine, responsive Konzert-Tagebuch-Web-App. Sie läuft komplett ohne Backend: Konzerte und hochgeladene Fotos werden im lokalen Speicher des Browsers gesichert.

## Auf GitHub veröffentlichen

1. Einen neuen GitHub-Repository erstellen.
2. Alle Dateien aus der ZIP-Datei in das oberste Verzeichnis hochladen. Dazu gehören `index.html`, `style.css`, `discover.css`, `momento.css`, `toast.css`, `app.js`, `discover.js`, `hallenstadion.js`, `momento.js` und `toast.js`.
3. Unter **Settings → Pages** bei **Build and deployment** die Quelle **Deploy from a branch** und den Branch **main** wählen.
4. Nach dem Speichern zeigt GitHub die öffentliche Website-Adresse an.

Zum lokalen Starten genügt ein Doppelklick auf `index.html`.

## Konzertentdeckung

Die Seite **Schweiz entdecken** enthält eine kuratierte Auswahl grosser, noch kommender Schweizer Events (Stand: 15. Juli 2026). Ein Klick auf **Auf meine Liste** legt die Show als persönliches kommendes Konzert ab; der Countdown erscheint auf der Übersicht. Für tagesaktuelle Änderungen ist die Ticketcorner-Quelle direkt in der App verlinkt.

Die Seite **Hallenstadion Archiv** enthält eine kuratierte Auswahl grosser Konzerte von 2016 bis 2025. Mit **Als besucht speichern** wird das Konzert direkt als vergangene Erinnerung angelegt. Künstlerbilder werden beim Öffnen der Website von Wikipedia geladen; ohne Internetverbindung zeigt die App ein gestaltetes Text-Poster als Ersatz an.

## Neue Oberfläche

Die aktuelle Version verwendet eine dunkle, bildorientierte Live-Event-Oberfläche: Karten lassen sich horizontal swipen oder mit der Maus ziehen. Beim Speichern einer Show erscheint eine kurze Bestätigung als „Live Story“.
