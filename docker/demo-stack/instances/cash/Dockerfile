FROM demo-stack/mw:ng-test
# Install UUID::Tiny needed by order.pl (missing from base ng-test image)
RUN cpan -T UUID::Tiny 2>&1 | tail -3
