#!/bin/bash

npm run build; 
mv build/ nba;
zip -r nba.zip nba/ ;
rm -r nba ;