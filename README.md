# FUSE Prototype & Frontend MVP

This is a comprehensive frontend implementation of the FUSE project, a 2027 video social landscape that prioritizes human depth over algorithmic fatigue.

## Project Origin
The project is built based on the complete Master Product Specification (saved in `docs/MASTER_SPEC.md`) and UI specifications from the Stitch project `FUSE: Экосистема Смыслов` (`projects/14144176844156979863`).

## Screens Implemented
*   **Пульс (Pulse):** Full-screen vertical video feed with custom gesture controls. **Desktop-adapted:** Limits max-width and renders actions on the side.
*   **Миксер рекомендаций (Algorithm Mixer):** A complex bottom sheet allowing users to tweak their feed recommendation weights.
*   **Трек (Track):** Detailed view of a track (series of videos) with progress tracking.
*   **Круг (Circle):** The dedicated subscription feed with active filtering.
*   **Профиль (Profile):** User profile view with key stats, a bio, and a tabbed content area.
*   **Миры (Worlds):** A community discovery screen listing available "Worlds" with member counts and descriptions.
*   **Создание (Create):** A mock camera interface for recording new videos or picking from gallery.
*   **Комментарии (Comments):** An interactive bottom sheet attached to the Pulse feed.
*   **Личные сообщения (Inbox & Chat):** Messaging interface allowing text input and local state updates.

## Architecture & Layout
*   **Framework:** Expo with React Native.
*   **Navigation:** Expo Router with a custom, blurred bottom tab bar (Mobile) and a dynamic **Side Navigation Menu** (Desktop).
*   **State Management:** Global state handled via `Zustand` (`src/store/useStore.ts`).
*   **Mock Data:** Extensive typed mock data models reflecting the Master Spec (`src/data/mockData.ts`).
*   **Design System:** Strict adherence to centralized design tokens (`src/design-system/tokens.ts`).

## Getting Started

1.  Install dependencies:
    `npm install`

2.  Run the app:
    `npm run web` (or `npm run android`, `npm run ios`)

    *Note on Web:* The application uses `"output": "single"` (Single Page Application mode) to maintain compatibility with `react-native-reanimated` across web platforms, avoiding known static rendering crashes with `RNRenderer`.

## Scripts
*   `npx tsc --noEmit` - TypeScript strict checking.

## Next Recommended Stage
Implementation of "Этап 2. Core Social" - specifically connecting the existing Zustand state layer to a real backend API (Node.js/PostgreSQL) for Authentication, Feeds, and Comments.
