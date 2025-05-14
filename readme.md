PostgreSQL Setup Instructions (for README)
Login to PostgreSQL:

psql -U postgres
Create the admin user:


CREATE USER admin WITH PASSWORD 'admin_password';
Grant admin permission to create databases:


ALTER USER admin CREATEDB;
Create the database:


CREATE DATABASE humanitarian_data_platform OWNER admin;
Exit PostgreSQL:


\q
Update .env file with database connection string:


DATABASE_URL=postgresql://admin:admin_password@localhost:5432/humanitarian_data_platform
Start the development server:


npm run dev




####### they way i created #########

C:\Users\5392dur>psql -U postgres
Password for user postgres:

psql (16.8)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# \du
                             List of roles
 Role name |                         Attributes
-----------+------------------------------------------------------------
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS


postgres=# CREATE USER admin WITH PASSWORD 'admin_password';
CREATE ROLE
postgres=# ALTER USER admin CREATEDB;
ALTER ROLE
postgres=# CREATE USER admin WITH PASSWORD 'admin_databank';
ERROR:  role "admin" already exists
postgres=# CREATE DATABASE humanitarian_data_platform OWNER admin;
CREATE DATABASE
postgres=# \q



####### requirements time #########
pip freeze > requirements.txt
pip install -r requirements.txt
