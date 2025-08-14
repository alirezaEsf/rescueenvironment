#!/bin/bash
mkdir -p dist/rescueenvironment/WEB-INF
cp -f deploy-configs/web.xml dist/rescueenvironment/WEB-INF/
cp -f deploy-configs/rewrite.config dist/rescueenvironment/WEB-INF/
