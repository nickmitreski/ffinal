# Asset Structure

This directory contains all the consolidated assets for the project. The assets are organized as follows:

## Directory Structure

```
public/images/
├── icons/         # Common icons used across the application (32x32)
├── brands/        # Brand-related images and logos
└── games/         # Game-specific assets
    ├── mario/
    ├── mortal-kombat/
    ├── street-fighter/
    │   ├── ken/
    │   └── ryu/
    ├── pizza-undelivery/
    ├── racer/
    └── zelda/
```

## Naming Conventions

1. All filenames should be lowercase and use hyphens for spaces
2. Icons should be descriptive of their function (e.g., `controls.png`, `settings.png`)
3. Game assets should be organized by character/type where applicable
4. Common patterns:
   - Character animations: `idle.png`, `jump.png`, `run.png`, etc.
   - UI elements: `background.png`, `icon.png`, etc.

## Asset Types

- Icons: 32x32 PNG files for UI elements
- Game Sprites: Various sizes, organized by game
- Brand Images: Logos and related marketing materials
- Backgrounds: Large format images for game/app backgrounds

## Usage

When referencing assets in code:
1. Use relative paths from the root: `/images/...`
2. For game assets: `/images/games/[game-name]/...`
3. For icons: `/images/icons/...`
4. For brand assets: `/images/brands/...` 