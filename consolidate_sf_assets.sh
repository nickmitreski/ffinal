#!/bin/bash

# Create Street Fighter asset directories
mkdir -p public/images/games/street-fighter/{ken,ryu}

# Move Ken's assets
mv "public/games/StreetFighter-main/img/ken/kenIdle4.png" "public/images/games/street-fighter/ken/idle.png"
mv "public/games/StreetFighter-main/img/ken/kenJump7.png" "public/images/games/street-fighter/ken/jump.png"
mv "public/games/StreetFighter-main/img/ken/kenPunch3.png" "public/images/games/street-fighter/ken/punch.png"
mv "public/games/StreetFighter-main/img/ken/kenRun5.png" "public/images/games/street-fighter/ken/run.png"
mv "public/games/StreetFighter-main/img/ken/kenDeath5.png" "public/images/games/street-fighter/ken/death.png"

# Move Ryu's assets
mv "public/games/StreetFighter-main/img/ryu/ryuIdle4.png" "public/images/games/street-fighter/ryu/idle.png"
mv "public/games/StreetFighter-main/img/ryu/ryuJump7.png" "public/images/games/street-fighter/ryu/jump.png"
mv "public/games/StreetFighter-main/img/ryu/ryuPunch3.png" "public/images/games/street-fighter/ryu/punch.png"
mv "public/games/StreetFighter-main/img/ryu/ryuRun5.png" "public/images/games/street-fighter/ryu/run.png"

# Move background and other assets
mv "public/games/StreetFighter-main/img/background1.png" "public/images/games/street-fighter/background.png"
mv "public/games/StreetFighter-main/img/flag.png" "public/images/games/street-fighter/flag.png"

# Remove duplicate directories
rm -rf "public/games/StreetFighter-main/img/ken/New folder"
rm -rf "public/games/StreetFighter-main/img/ryu/ryuOld"
rm -rf "public/games/StreetFighter-main/img/fken"
rm -rf "public/games/StreetFighter-main/img/fryu" 