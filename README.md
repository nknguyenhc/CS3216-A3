# CS3216-A3

## Our app

- Name: **Stellar**
- Deployed site: [https://stellar-cs3216a3.com/](https://stellar-cs3216a3.com/)

## Members

Nguyen Khoi Nguyen, A0258715W

Muhammad Reyaaz Bin Abdul Basheer, A0218022W

Le Huy Chau, A0276221L

## Contributions

### Nguyen

- Decide team directions
- Gather insights on Oxbridge & Jardine essays
- Set up team's repository
- Devise architecture of the evaluation of essays
- Prompt-engineer some Oxbridge modules & all Jardine modules
- Package & deploy app on GCP

### Reyaaz
- Completed frontend components for entire landing page.
- Integrated frontend and backend authentication completely (including google auth) with serializer and validations.
- Integrated Stripe payment.
- Set up comment page for frontend.
- Backend comments generator, specificity, idea extractor (Oxbridge) models, views, and prompts
- Backend user and payment models
- Routing and navigations between pages in frontend and navbars
- Frontend styling and animations

### Chau

## References

## Setup instruction

The easiests way to set up our project and test locally is to use Docker, with docker compose.

1. In `backend` folder, copy the `example.env` and name it `.env`.
2. Replace the secret key `{some-random-string}` with any random string.
3. Replace OpenAI API key with your API key. You will need to obtain one from [OpenAI API platform](https://platform.openai.com).
4. Replace Stripe API key with your API key. You will need to obtain one from [Stripe API platform](https://dashboard.stripe.com/).
5. Replace Google client ID with your client ID. You will need to obtain one from [Google Cloud platform](https://console.cloud.google.com/apis/).
6. In `frontend` folder, copy the `example.env` and name it `.env`.
7. Run the folllowing command in root folder.

If you are using Windows/MacOS:

```bash
docker-compose up --build -d
```

If you are using Linux:

```bash
sudo docker compose up --build -d
```

8. Visit [http://localhost](http://localhost) to test our app.

If you wish not to use Docker, you may follow our [development instruction](#development) below. However, no successful setup is guaranteed.

## Development

### Backend

1. Setup a new virtual environment, and install dependencies. Make sure to use Python 3.10. If you use conda, you can run the following commands:

```bash
conda create --name CS3216-A3
conda activate CS3216-A3
conda install python=3.10
pip install -r backend/requirements.txt
```

2. Add a new `.env` file under `backend` folder. Replace API keys with your API keys. For `localhost` URLs, replace backend URL with `http://localhost:8000` and frontend URL with `http://localhost:3000`.

3. Under, `backend` folder, run migration command. If you use the same database URL as the example, this command will create a local `db.sqlite3` database.

```bash
python manage.py migrate
```

4. Run the backend server.

```bash
python manage.py runserver
```

5. (Optional) To run a test on any module, modify the code to test the correct module in `modules/modules/test.py`, and run:

```bash
python -m modules.modules.test
```

### Frontend

1. Under `frontend` folder, install dependencies.

```bash
npm i --force
```

2. Run the React development server.

```bash
npm start
```

3. Visit [http://localhost:3000](http://localhost:3000) to test it out.
