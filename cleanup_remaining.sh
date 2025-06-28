#!/bin/bash

# Move document files to images directory
mv "public/documents.png" "public/images/icons/documents.png"
rm "public/documents copy.png"
rm "public/documents copy copy.png"

# Move remaining Street Fighter assets
mkdir -p "public/images/games/street-fighter/misc"
mv "public/games/StreetFighter-main/img/MEN.png" "public/images/games/street-fighter/misc/"
mv "public/games/StreetFighter-main/img/WOMEN.png" "public/images/games/street-fighter/misc/"
mv "public/games/StreetFighter-main/img/SAILOR.png" "public/images/games/street-fighter/misc/"
mv "public/games/StreetFighter-main/img/ProjectPreview"/* "public/images/games/street-fighter/misc/"

# Clean up empty directories
rm -rf "public/games/StreetFighter-main/img/ProjectPreview"
rm -rf "public/games/StreetFighter-main/img/ken"
rm -rf "public/games/StreetFighter-main/img/ryu"
rm -rf "public/games/StreetFighter-main/img" 