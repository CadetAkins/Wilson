#!/bin/bash

# Install Python Packages
python3 -m ensurepip --upgrade

pip intstall --upgrade pip

cd python_bot
cd packages
git clone https://github.com/Rapptz/discord.py
cd discord.py
pip install -U .[voice]

cd ..
cd ..
pip install PyNaCl

# Build Go Package
cd debate_system
go build main.go

cd ..

# Run Respective Files

cd python_bot && python main.py && cd voice_system && python main.py && cd .. && cd.. && cd debate_system && go run main.go

# Startup Message

echo "~==-               Wilson              -==~"
echo "-------------------------------------------"
echo "A fluffy tyrant."
echo "Debate System: Online"
echo "Voice System: Online"
echo "Server System: Online"
echo "System Statuses: 100%"
echo "-------------------------------------------"
echo "Author[s]: Akins#1692 <akins2229@gmail.com>"
echo "Version: 1.0-alpha"
echo "-------------------------------------------"
echo ""

while true; do
  python display_version.py
  read value
  if [[ $value == "h" || $value == "help" ]]; then
    echo ""
    echo "-----------------------------------"
    echo "help[h]   -   Displays this message"
    echo "stop[s]   -   Stops the program"
    echo "-----------------------------------"
    echo ""
  elif [[ $value == "s" || $value == "stop" ]]; then
    echo "Stopping program..."
    break
  else
    echo "That is not a valid command."
  fi
