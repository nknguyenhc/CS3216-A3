# CS3216-A3

## Development

### Backend

1. Setup a new virtual environment, and install dependencies. Make sure to use Python 3.10. If you use conda, you can run the following commands:

```bash
conda create --name CS3216-A3
conda activate CS3216-A3
conda install python=3.10
pip install -r backend/requirements.txt
```

2. Add a new `.env` file under `backend` folder. You can take the example values in the provided `example.env` file.

3. Under, `backend` folder, run migration command. If you use the same database URL as the example, this command will create a local `db.sqlite3` database.

```bash
python manage.py migrate
```

4. Run the backend server.

```bash
python manage.py runserver
```

### Frontend

1. Under `frontend` folder, install dependencies.

```bash
npm i
```

2. Run the React development server.

```bash
npm start
```
