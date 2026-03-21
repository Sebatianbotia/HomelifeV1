Register
POST https://www.homelife.com.co/wp-json/homelife/v1/registro

formato:
    {
    "email": "juan.perez@example.com",
    "first_name": "Juan",
    "last_name": "Pérez",
    "username": "juanperez",
    "password": "password_seguro123",
    "billing": {
        "address_1": "Calle Falsa 123",
        "city": "Madrid",
        "country": "ES"
    }
    }

Login:
POST https://www.homelife.com.co/wp-json/homelife/v1/login

formato:
    {
    "username": "juan.perez@example.com",
    "password": "password_seguro123"
    }