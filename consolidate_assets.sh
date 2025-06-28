#!/bin/bash

# Create necessary directories
mkdir -p public/images/icons
mkdir -p public/images/games
mkdir -p public/images/brands

# Move and consolidate duplicate icons
mv "public/Controls3000_32x32_4.png" "public/images/icons/controls3000.png"
rm "public/Controls3000_32x32_4 copy.png"

# Move game icons to a central location
mv "public/games/mario_js-master/icon.png" "public/images/games/mario.png"
mv "public/games/MK-Wiki-master/icon.png" "public/images/games/mortal-kombat.png"
mv "public/games/StreetFighter-main/icon.png" "public/images/games/street-fighter.png"
mv "public/games/pizza-undelivery/icon.png" "public/images/games/pizza-undelivery.png"
mv "public/games/racer/icon.png" "public/images/games/racer.png"
mv "public/games/zelda-js-master/icon.png" "public/images/games/zelda.png"

# Move brand images to brands directory
mv public/brands/*.png public/images/brands/

# Move common icons to icons directory
mv public/*_32x32_4.png public/images/icons/

# Clean up empty directories
find public -type d -empty -delete 