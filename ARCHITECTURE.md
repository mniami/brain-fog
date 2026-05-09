# Architektura aplikacji Brain-Fog

## Cel tej iteracji

Ta iteracja uruchamia minimalny pion aplikacji mobilnej zgodny z PRD:

- ekran główny z szybkim dodawaniem zadania,
- mikro-timer dla nowego wątku,
- dashboard aktywnych wątków,
- akcje `done` i `snooze +3 min`.

## Docelowe warstwy

### 1. Presentation (`src/presentation`)

Warstwa odpowiedzialna za interfejs użytkownika:

- formularz szybkiego dodania zadania,
- lista aktywnych i zakończonych wątków,
- czytelne karty o wysokim kontraście.

Aktualnie rolę ekranu głównego pełni komponent `BrainFogApp`.

### 2. Application (`src/application`)

Warstwa zarządza przepływem danych i zachowaniami użytkownika:

- tworzenie nowego wątku,
- odmierzanie czasu,
- przejście do stanu `due`,
- odkładanie przypomnienia (`snooze`),
- zamykanie wątku.

W tej iteracji jest to hook `useBrainFogApp`, który może zostać później zastąpiony storem Zustand bez zmiany warstwy prezentacji.

### 3. Domain (`src/domain`)

Warstwa modeluje kluczowe pojęcia biznesowe:

- `TaskThread`,
- statusy wątku (`active`, `due`, `done`),
- stałe timerów i snooze,
- helpery do tworzenia i formatowania danych.

## Następne kroki zgodne z PRD

1. Przeniesienie stanu do trwałego storage local-first.
2. Dodanie lokalnych powiadomień przez `expo-notifications`.
3. Odtwarzanie timerów po restarcie aplikacji.
4. Dodanie wejścia głosowego i transkrypcji.
5. Rozbudowa testów jednostkowych i UI po włączeniu infrastruktury jakościowej.
