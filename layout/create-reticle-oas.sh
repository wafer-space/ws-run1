#!/bin/sh
set -Ce
cat reticle-part-* > reticle.oas
echo "316f07f37e148457558053f4d4d11540  reticle.oas" | md5sum -c
