# Derived MW image for demo-stack
# Adds missing Perl dependency: Logger::Syslog (package: liblogger-syslog-perl)
# Adds AWS CLI (v2)

ARG BASE_IMAGE=mwd-storer-mwd-storer-mw:latest
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


# Fix Tbl_Product.p_id: INTEGER → TEXT (SVM.ng requires TEXT p_id)
RUN sqlite3 /opt/svm/rest/db/sqlite.db " \
    CREATE TABLE IF NOT EXISTS Tbl_Product_new ( \
      p_id TEXT, c_id INTEGER, p_name TEXT, barcode TEXT, \
      imagepath TEXT, dmpath TEXT, price INTEGER, description TEXT, \
      spec TEXT, p_property TEXT, remove BOOLEAN, updatetime INTEGER, \
      PRIMARY KEY (p_id), \
      FOREIGN KEY (c_id) REFERENCES Tbl_Category (c_id) ON DELETE CASCADE ON UPDATE CASCADE \
    ); \
    INSERT INTO Tbl_Product_new SELECT * FROM Tbl_Product; \
    DROP TABLE Tbl_Product; \
    ALTER TABLE Tbl_Product_new RENAME TO Tbl_Product; \
    " && \
    sqlite3 /opt/app/scripts/test/svm_sqlite/sqlite.db " \
    CREATE TABLE IF NOT EXISTS Tbl_Product_new ( \
      p_id TEXT, c_id INTEGER, p_name TEXT, barcode TEXT, \
      imagepath TEXT, dmpath TEXT, price INTEGER, description TEXT, \
      spec TEXT, p_property TEXT, remove BOOLEAN, updatetime INTEGER, \
      PRIMARY KEY (p_id), \
      FOREIGN KEY (c_id) REFERENCES Tbl_Category (c_id) ON DELETE CASCADE ON UPDATE CASCADE \
    ); \
    INSERT INTO Tbl_Product_new SELECT * FROM Tbl_Product; \
    DROP TABLE Tbl_Product; \
    ALTER TABLE Tbl_Product_new RENAME TO Tbl_Product; \
    "
