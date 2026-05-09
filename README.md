# Brain-Fog: External Working Memory

Living with brain fog feels like trying to hold water in your hands; the information is there one second and gone the next. Brain-Fog is a specialized tool designed to act as an external prosthetic for your short-term memory. It is built for those who lose their train of thought mid-sentence or forget why they walked into a room.

The primary goal of this application is to capture fleeting thoughts and loop them back to your attention before they disappear entirely.

## The Philosophy of Immediate Recall

Most productivity apps are designed for long-term planning. Brain-Fog is designed for the next five minutes. It addresses the multi-thread collapse where focusing on one task causes you to instantly drop the others. By offloading these thoughts to an external screen, you reduce the cognitive load on your brain.

## Core Features

### The 3-Minute Loop

The app features a fast-capture interface. You can type or voice-record a task and instantly set a micro-timer.

- Need to pay for parking? Save it and set a 3-minute alert.
- Still distracted when the alert goes off? Snooze it for another 3 minutes with a single tap.

### Thread Persistence Dashboard

Unlike standard lists that hide tasks in menus, Brain-Fog keeps your active threads front and center.

- **Always visible:** Active tasks stay on the main screen as high-contrast cards.
- **Context preservation:** If you are picking up your son but need to remember to buy milk afterward, both tasks remain visible. When you finish one, the other remains as a visual anchor to ground you.

### Low-Friction Input

When you are struggling with brain fog, complex menus are the enemy.

- **Single-tap entry:** No folders, no tags, no priority levels.
- **Voice-to-task:** Record a thought instantly before the fog sets in.

## Use Case Scenarios

### The "Walking Into a Room" Problem

You realize you need to grab a specific document from the office. You record "Get document" and set a 2-minute timer. By the time you reach the office and wonder why you are there, the app pings you with the answer.

### The "Parking and Grocery" Scenario

You are paying for parking while remembering to call someone back. Brain-Fog keeps the "Call back" notification active and visible while you handle the parking payment, ensuring the second thread is not lost once the first one is completed.

## Installation and Technical Setup

The repository now contains the first mobile application slice based on the PRD:

- Expo + React Native + TypeScript bootstrap
- quick text capture for a task
- micro-timer presets (10 seconds, 1 minute, 3 minutes)
- always-visible active thread dashboard
- done and snooze actions on task cards

### Getting started

```bash
npm install
npm run start
```

Useful development commands:

```bash
npm run web
npm run typecheck
```

### Architecture

The current code is split into three layers:

- `src/presentation` — screen and UI components
- `src/application` — state flow and user actions
- `src/domain` — task model and timer rules

See `/ARCHITECTURE.md` for the implementation outline and planned next steps.

_Designed for the distracted, by the distracted._
