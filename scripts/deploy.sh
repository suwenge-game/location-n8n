#!/usr/bin/env bash

set -euo pipefail

: "${OSS_BUCKET:?OSS_BUCKET environment variable is required}"
: "${OSS_ENDPOINT:?OSS_ENDPOINT environment variable is required}"
: "${OSS_ACCESS_KEY_ID:?OSS_ACCESS_KEY_ID environment variable is required}"
: "${OSS_ACCESS_KEY_SECRET:?OSS_ACCESS_KEY_SECRET environment variable is required}"

BUILD_DIR="${BUILD_DIR:-out}"
OSS_UPLOAD_PREFIX="${OSS_UPLOAD_PREFIX:-}"
OSSUTIL_BIN="${OSSUTIL_BIN:-./ossutil64}"
OSSUTIL_DOWNLOAD_URL="${OSSUTIL_DOWNLOAD_URL:-https://gosspublic.alicdn.com/ossutil/1.7.16/ossutil64}"

if [[ ! -d "${BUILD_DIR}" ]]; then
  echo "❌ Build directory \"${BUILD_DIR}\" not found. Run the site build before deploying." >&2
  exit 1
fi

if [[ ! -x "${OSSUTIL_BIN}" ]]; then
  echo "ℹ️  ossutil not found at ${OSSUTIL_BIN}, downloading from ${OSSUTIL_DOWNLOAD_URL}..."
  curl -sSL "${OSSUTIL_DOWNLOAD_URL}" -o "${OSSUTIL_BIN}"
  chmod +x "${OSSUTIL_BIN}"
fi

# Configure ossutil credentials (non-interactive).
"${OSSUTIL_BIN}" config \
  -e "${OSS_ENDPOINT}" \
  -i "${OSS_ACCESS_KEY_ID}" \
  -k "${OSS_ACCESS_KEY_SECRET}" \
  -L CH \
  --output-dir "$(mktemp -d)"

UPLOAD_PATH="oss://${OSS_BUCKET}"
if [[ -n "${OSS_UPLOAD_PREFIX}" ]]; then
  if [[ "${OSS_UPLOAD_PREFIX}" != */ ]]; then
    OSS_UPLOAD_PREFIX="${OSS_UPLOAD_PREFIX}/"
  fi
  UPLOAD_PATH="${UPLOAD_PATH}/${OSS_UPLOAD_PREFIX}"
fi

echo "🚀 Uploading ${BUILD_DIR}/ to ${UPLOAD_PATH}"
"${OSSUTIL_BIN}" cp "${BUILD_DIR}/" "${UPLOAD_PATH}" \
  --recursive \
  --force \
  --jobs "${OSS_UPLOAD_JOBS:-4}" \
  --meta "Cache-Control:no-cache"

echo "✅ Upload complete."

if [[ -n "${CDN_REFRESH_ENDPOINT:-}" ]]; then
  echo "🔃 Triggering CDN refresh via ${CDN_REFRESH_ENDPOINT}"
  CURL_ARGS=(-sSL -X "${CDN_REFRESH_METHOD:-POST}")

  if [[ -n "${CDN_REFRESH_HEADERS:-}" ]]; then
    while IFS= read -r header; do
      [[ -z "${header}" ]] && continue
      CURL_ARGS+=(-H "${header}")
    done <<<"${CDN_REFRESH_HEADERS}"
  fi

  if [[ -n "${CDN_REFRESH_PAYLOAD:-}" ]]; then
    CURL_ARGS+=(-d "${CDN_REFRESH_PAYLOAD}")
  fi

  CURL_ARGS+=("${CDN_REFRESH_ENDPOINT}")

  if ! curl "${CURL_ARGS[@]}"; then
    echo "⚠️  CDN refresh request failed." >&2
  else
    echo "✅ CDN refresh triggered."
  fi
fi
