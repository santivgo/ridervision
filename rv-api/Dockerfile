FROM python:3.11

# Instalar poetry
RUN pip install poetry

# Configurar poetry para não criar venv (usar o Python do sistema no container)
RUN poetry config virtualenvs.create false

WORKDIR /app

# Copiar arquivos de dependências
COPY pyproject.toml poetry.lock README.md ./

# Instalar dependências
RUN poetry install --no-root

# Copiar código da aplicação
COPY . .

WORKDIR /app/src

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]