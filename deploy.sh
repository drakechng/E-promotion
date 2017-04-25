#!/bin/bash

git checkout doc-source
git add --all
git commit -m 'source files update'
git push origin doc-source

gitbook build
cp package.json ./_book

git checkout gh-pages
cp -r _book/* .
git add --all
git commit -m 'new build'
git push origin gh-pages

git checkout doc-source
