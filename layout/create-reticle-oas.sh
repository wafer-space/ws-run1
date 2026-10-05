#!/bin/sh
set -Ce
cat G801-part-* > G801.oas
echo "3ae7349e205f60d9f997cf7d3a688500  G801.oas" | md5sum -c
