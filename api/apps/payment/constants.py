# Payment constants
STATUS_CHOICES = [
    ('Draft', 'Draft'),
    ('Requested', 'Requested'),
    ('Approved', 'Approved'),
    ('Paid', 'Paid'),
    ('Deleted', 'Deleted'),
]

# TODO:: Add more currencies. Too time-consuming, but the idea is there
CURRENCY_CHOICES = [
    ('USD', 'USD'),
    ('EUR', 'EUR'),
]

# TODO:: Add more countries. Too time-consuming, but the idea is there
COUNTRY_CHOICES = [
    ('US', 'United States'),
    ('ES', 'Spain'),
]
