#!/bin/sh

# while true; do
#   inotifywait -r -e modify,create,delete /home/madcatzx/projects/tangerine-nest/
#   rsync -a --progress --exclude 'node_modules' --exclude '.idea' ~/Projects/tangerine-nest/ madcatzx@tangerine.local:/home/madcatzx/projects/tangerine-nest/
# done

# rsync -avz --progress --exclude '.idea' .  tangerine@tangerine.local:/home/tangerine

rsync -avz --progress --exclude 'node_modules' --exclude '.idea' tangerine@192.168.8.41:/home/tangerine/speech/* .

# notifyloop . rsync -avz --progress --exclude 'node_modules' --exclude '.idea' .  tangerine@tangerine.local:/home/tangerine

