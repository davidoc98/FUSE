# FUSE Prototype & Frontend MVP

This is a comprehensive frontend implementation of the FUSE project, a 2027 video social landscape that prioritizes human depth over algorithmic fatigue.

## Project Origin
The project is built based on the complete Master Product Specification (saved in `docs/MASTER_SPEC.md`) and UI specifications from the Stitch project `FUSE: Экосистема Смыслов` (`projects/14144176844156979863`).

## Screens Implemented
*   **Пульс (Pulse):** Full-screen vertical video feed with custom gesture controls (single tap to pause, double tap to like, swipe).
*   **Миксер рекомендаций (Algorithm Mixer):** A complex bottom sheet allowing users to tweak their feed recommendation weights (Familiarity, Entertainment, Locality, Depth). Includes a mock randomization engine.
*   **Трек (Track):** Detailed view of a track (series of videos) with progress tracking, episodes list, and tabs.
*   **Круг (Circle):** The dedicated subscription feed with active filtering and inline video placeholders.
*   **Профиль (Profile):** User profile view with key stats, a bio, and a tabbed content area.
*   **Миры (Worlds):** A community discovery screen listing available "Worlds" with member counts and descriptions.
*   **Создание (Create):** A mock camera interface for recording new videos or episodes.
*   **Комментарии (Comments):** An interactive bottom sheet attached to the Pulse feed for viewing and writing comments.

## Architecture
*   **Framework:** Expo with React Native.
*   **Navigation:** Expo Router with a custom, blurred bottom tab bar.
*   **State Management:** Global state handled via `Zustand` (`src/store/useStore.ts`).
*   **Mock Data:** Extensive typed mock data models reflecting the Master Spec (`src/data/mockData.ts`).
*   **Design System:** Strict adherence to centralized design tokens (`src/design-system/tokens.ts`).

## Getting Started

1.  Install dependencies:
    `npm install`

2.  Run the app:
    `npm run web` (or `npm run android`, `npm run ios`)

## Scripts
*   `npm run lint` - Code linting via Expo.
*   `npm run test` - Jest test suite (includes component tests).
*   `npx tsc --noEmit` - TypeScript strict checking.

## Next Recommended Stage
Implementation of "Этап 2. Core Social" - specifically connecting the existing Zustand state layer to a real backend API (Node.js/PostgreSQL) for Authentication, Feeds, and Comments.
