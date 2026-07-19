# FUSE Prototype

This is a functional mobile prototype for the FUSE project, a 2027 video social landscape that prioritizes human depth over algorithmic fatigue.

## Project Origin
The project is built based on the Stitch UI specification `FUSE: Экосистема Смыслов` (`projects/14144176844156979863`).

## Screens Retrieved & Analyzed
*   Пульс
*   Трек
*   Миксер рекомендаций
*   World Screen
*   Author Profile

## Implemented Features
*   **Design System:** Centralized tokens for dark theme.
*   **Architecture:** Clean structure matching requirements (`src/components`, `src/features/feed`, `src/features/tracks`, `src/features/mixer`, `src/features/navigation`, `src/design-system`, `src/data`, `src/types`, `src/hooks`, `src/store`).
*   **Reusable Components:** `AppIcon`, `AppButton`, `Avatar`, `Badge`, `VideoFeedItem`, `VideoActions`, `BottomNavigation`, `TrackEpisodeCard`, `ProgressTimeline`, `AlgorithmSlider`, `AlgorithmMixerSheet`.
*   **Bottom Navigation:** Placeholders for Circle, Create, Worlds, Profile, and active Pulse feed.
*   **Pulse Feed:** Full-screen vertical video feed using `expo-video` and `FlashList`. Features single tap pause, double tap like, swipe to next.
*   **Algorithm Mixer:** Bottom sheet with customizable sliders that update the mock feed order.
*   **Track Screen:** Detailed view of a track (series of videos) with progress, tabs, and episodes list.

## Getting Started

1.  Install dependencies:
    `npm install`

2.  Run the app:
    `npm run web` (or `npm run android`, `npm run ios`)

## Missing Data in Stitch & Discrepancies
*   Explicit screen flow details (relied on implicit links like "Продолжить историю").
*   Data models for videos, tracks, comments, user settings (Mocked).
*   Slider behavior specification (Implemented a simple mock with randomizer).
*   Some custom icons requested were not available in default expo vector icons (mapped to nearest equivalents).

## Decisions Made
*   Used `@gorhom/bottom-sheet` instead of building a custom reanimated bottom sheet.
*   Created explicit placeholder screens for non-core features like `Worlds` and `Profile`.

## Checks Passed
*   `npm run lint` (No errors)
*   `npx tsc --noEmit` (No errors)
*   Visual sync with Stitch tokens completed.

## Next Recommended Stage
Implementation of "Этап 2. Core Social" - specifically connecting real backend for Authentication, Feeds and Comments.
