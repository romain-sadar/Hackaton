FROM python:3.11-slim

# Install dependencies and setup GDAL for spatial support
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libpq-dev \
    gdal-bin \
    libgdal-dev \
    && rm -rf /var/lib/apt/lists/*

# Set GDAL environment variables
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# Install Poetry
ENV POETRY_VERSION=1.8.2
RUN curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# Set working directory in the container
WORKDIR /app

# Copy the poetry configuration files and install dependencies
COPY pyproject.toml poetry.lock* /app/
RUN poetry config virtualenvs.create false && poetry install --no-root --only main

# Copy the rest of the application
COPY . /app

# Expose port 8000 for the backend
EXPOSE 8000

# Start the application using the Django development server
CMD ["sh", "-c", "python manage.py migrate && python manage.py import_lyon_data && python manage.py runserver 0.0.0.0:8000"]

