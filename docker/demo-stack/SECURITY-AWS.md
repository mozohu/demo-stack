# demo-stack: AWS credentials hygiene

## Goal
- No image should contain `/root/.aws`.
- AWS credentials must be provided at *runtime* only (bind mount overlay).

## Current compose change
`compose.yml` mounts:

- `${AWS_CRED_DIR:-${INSTANCE_DIR}/aws}` -> `/root/.aws` (read-only)

for services: `mw`, `rest`, `cron`.

## Why `RUN rm -rf /root/.aws` is not enough
If `/root/.aws` existed in a lower layer (base image), deleting it in a later layer only hides it in the merged filesystem; the secret may still be retrievable from the image layers.

## Safe remediation approach used here
Flatten the image after removing `/root/.aws`:
- `docker export` container filesystem
- delete `root/.aws`
- `docker import` to a new tag

Scripts:
- `scripts/sanitize_image_remove_root_aws.sh`
- `scripts/build_secure_images.sh` (builds mw/rest/cron with AWS CLI v2 + syslog, then sanitizes)

## After remediation
- Rotate/revoke any exposed AWS credentials.
- Rebuild/push ONLY the sanitized tags.
- Delete/retire old tags from Docker Hub (note: registries may keep blobs for some time).
