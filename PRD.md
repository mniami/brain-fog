# PRD — Brain-Fog: External Working Memory

## 1. Cel produktu

Brain-Fog to aplikacja do natychmiastowego „zrzutu” myśli i krótkich zadań, która pomaga utrzymać uwagę na wielu wątkach jednocześnie. Produkt ma minimalizować utratę kontekstu w perspektywie najbliższych minut.

## 2. Problem do rozwiązania

Użytkownicy zmagający się z brain fog tracą bieżące myśli i zamiary podczas przełączania uwagi między zadaniami. Klasyczne aplikacje TODO są zbyt „długoterminowe” i zbyt ciężkie w obsłudze.

## 3. Grupa docelowa

- Osoby z trudnością utrzymania krótkotrwałego kontekstu (np. „po co wszedłem do tego pokoju?”)
- Użytkownicy potrzebujący bardzo szybkiego zapisu i przypomnienia „tu i teraz”

## 4. Zakres MVP

- Szybkie dodawanie krótkich zadań (tekst)
- Opcjonalne dodawanie zadania głosem
- Mikro-timer (domyślnie 3 minuty)
- Snooze „jeszcze 3 minuty”
- Dashboard aktywnych wątków (zawsze widoczny)
- Lokalne powiadomienia przypominające o zadaniu

## 5. Wymagania funkcjonalne

### FR-01: Szybkie tworzenie zadania
- Użytkownik może dodać zadanie jednym ekranem, bez folderów/tagów/priorytetów.

### FR-02: Wejście głosowe
- Użytkownik może nagrać notatkę głosową i zamienić ją na zadanie.

### FR-03: Mikro-timer
- Podczas tworzenia zadania użytkownik ustawia timer (domyślnie 3 min).
- Po upływie czasu aplikacja wysyła lokalne przypomnienie.

### FR-04: Snooze
- Z poziomu przypomnienia użytkownik może odroczyć zadanie o 3 minuty jednym tapnięciem.

### FR-05: Dashboard aktywnych wątków
- Aktywne zadania są stale widoczne jako czytelne karty na ekranie głównym.
- Ukończenie jednego zadania nie ukrywa pozostałych aktywnych wątków.

### FR-06: Zamykanie zadania
- Użytkownik może oznaczyć zadanie jako wykonane.

### FR-07: Praca lokalna
- Aplikacja działa bez konta i bez wymogu połączenia z internetem dla podstawowych funkcji.

## 6. Wymagania niefunkcjonalne

- **NFR-01 (Szybkość):** dodanie zadania do 2 interakcji i bez zauważalnych opóźnień UI.
- **NFR-02 (Użyteczność):** interfejs maksymalnie prosty, bez złożonej nawigacji.
- **NFR-03 (Czytelność):** wysoki kontrast kart i tekstu.
- **NFR-04 (Niezawodność):** zadania i timery przetrwają restart aplikacji.
- **NFR-05 (Prywatność):** dane przechowywane lokalnie, brak obowiązkowej chmury.
- **NFR-06 (Dostępność):** podstawowe wsparcie systemowych ustawień rozmiaru czcionki i VoiceOver/TalkBack.

## 7. Proponowany stack technologiczny

### Aplikacja kliencka (mobile)
- **React Native + Expo + TypeScript**  
  Uzasadnienie: szybkie iteracje, jeden kod na iOS/Android, dobry ekosystem dla powiadomień i wejścia głosowego.

### Stan i logika
- **Zustand** (lekki state management)
- **React Hook Form** (proste formularze wejściowe)

### Dane lokalne
- **SQLite (expo-sqlite)** lub **MMKV** dla trwałego local-first storage

### Powiadomienia i timer
- **expo-notifications** (lokalne przypomnienia i snooze)

### Wejście głosowe
- **expo-av** (nagranie) + warstwa STT (np. natywna usługa systemowa lub integracja chmurowa jako opcja)

### Jakość i CI
- **ESLint + Prettier**
- **Jest + React Native Testing Library**
- **GitHub Actions** (lint, testy jednostkowe)

## 8. Kryteria akceptacji MVP

- Użytkownik tworzy zadanie tekstowe i ustawia timer ≤ 10 sekund.
- Po upływie czasu pojawia się lokalne przypomnienie.
- Kliknięcie snooze odkłada przypomnienie o kolejne 3 minuty.
- Wszystkie aktywne wątki są stale widoczne na ekranie głównym.
- Po restarcie aplikacji zadania i aktywne timery pozostają odtworzone.

## 9. Poza zakresem MVP (na później)

- Synchronizacja między urządzeniami
- Zaawansowane raporty/statystyki
- Rozbudowane kategoryzowanie i priorytety
- Współdzielenie zadań
