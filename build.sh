#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
STUDIO_DIR=$(which studio)

cd "${SCRIPT_DIR}"

echo export CAPACITOR_ANDROID_STUDIO_PATH="${STUDIO_DIR}" >> ~/.bashrc

ionic capacitor sync android

CAPACITOR_ANDROID_STUDIO_PATH="${STUDIO_DIR}" ionic capacitor build android
