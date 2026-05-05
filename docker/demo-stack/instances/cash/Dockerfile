FROM demo-stack/mw:ng-test
# Install UUID::Tiny needed by order.pl (missing from base ng-test image)
RUN cpan -T UUID::Tiny 2>&1 | tail -3
# Add cash-kiosk specific scripts not in ng-test image
COPY biz_cash.pl /opt/app/scripts/biz_cash.pl
RUN chmod +x /opt/app/scripts/biz_cash.pl
