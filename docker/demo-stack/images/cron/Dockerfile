# Derived cron image for demo-stack
# Adds missing Perl dependency: Logger::Syslog (package: liblogger-syslog-perl)
# Adds AWS CLI (v2)

ARG BASE_IMAGE=mwd-storer-mwd-storer-cron:latest
FROM ${BASE_IMAGE}

USER root

ARG AWSCLI_VERSION=2.17.57

RUN set -eux; \
    apt-get update -y; \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      liblogger-syslog-perl \
      ca-certificates \
      curl \
      unzip \
    ; \
    curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-${AWSCLI_VERSION}.zip" -o /tmp/awscliv2.zip; \
    unzip -q /tmp/awscliv2.zip -d /tmp; \
    /tmp/aws/install; \
    rm -rf /tmp/aws /tmp/awscliv2.zip; \
    apt-get purge -y --auto-remove curl unzip; \
    rm -rf /var/lib/apt/lists/*
